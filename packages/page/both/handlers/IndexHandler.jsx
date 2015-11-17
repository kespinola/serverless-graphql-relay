/* global Meteor, Page, React, R, MUI, ReactMeteorData, Session, Flexgrid */

const {
  TextField,
  Toolbar,
  ToolbarGroup,
  Toggle,
  RaisedButton,
  FlatButton,
  IconButton,
  IconMenu,
  MenuItem,
  DropDownMenu,
  ToolbarSeparator,
} = MUI;
const { Container, Row, Col } = Flexgrid;

const { Components: { Block } } = Page;

const { PropTypes } = React;

function gatherSectionOptions(sections = []) {
  let menu = [];
  sections.forEach(({_id, sections: children = []}) => {
    menu.push({payload: _id, text: _id});
    if (children.length) menu = menu.concat(... gatherSectionOptions(children));
  });
  return menu;
}

Page.Handlers.Index = React.createClass({

  propTypes: {
    location: PropTypes.object,
    history: PropTypes.object,
  },

  mixins: [ReactMeteorData],

  componentDidMount() {
    Session.set('isEditingPage', false);
    Session.set('editingSection', null);
  },

  getMeteorData() {
    const {
      location: { pathname },
    } = this.props;
    const pageHandler = Meteor.subscribe('pageByPath', pathname);
    const page = Page.Collection.findOne({ pathname }) || {};
    const blockHandler = Meteor.subscribe('blockByParentId', page._id);
    return {
      page,
      pageReady: pageHandler.ready(),
      blocksReady: blockHandler.ready(),
      hasPage: Object.keys(page).length,
      isEditing: Session.get('isEditingPage'),
      blockDropdown: gatherSectionOptions(page.section),
    };
  },

  _onChangeTitle(_id, { target: { value: title } }) {
    Meteor.call('updatePage', _id, { title });
  },

  _onChangePageMenu(_id, event, value) {
    switch (value) {
    case 'remove':
      Meteor.call('removePage', _id);
      break;
    case 'add_section':
      Meteor.call('addPageSection', _id);
      break;
    default:
    }
  },

  _onToggleNav(_id, event, showInNav) {
    Meteor.call('updatePage', _id, { showInNav });
  },

  _onChangeSectionDropdown(event, selectedIndex, {payload}) {
    const { history } = this.props;
    history.pushState({
      modal: true,
      modalActions: [
        {
          text: 'Cancel',
          onTouchTap() {
            history.goBack();
          },
        },
        {
          text: 'Add Section',
          onTouchTap() {
            Meteor.call('addSection', {parentId: payload});
          },
        },
      ],
    }, `/block/${payload}/edit`);
  },

  render() {
    const { page, hasPage, isEditing, blockDropdown } = this.data;
    const { _id, title, showInNav, sections = [] } = page;
    const { location: { pathname }, history } = this.props;
    return (
      <div>
        <Toolbar>
          {hasPage && (
            <ToolbarGroup key={0} float="left">
              <TextField
                value={title}
                onChange={this._onChangeTitle.bind(null, _id)}
                hintText="Page Title"
              />
              <IconMenu
                onChange={this._onChangePageMenu.bind(null, _id)}
                iconButtonElement={(
                  <IconButton iconClassName="material-icons">
                    more_vert
                  </IconButton>
                )}
                >
                  <IconButton
                    tooltip="Enter edit mode"
                    tooltipPosition="top-right"
                  >
                    <Toggle
                      name="editMode"
                      value="editing"
                      defaultToggled={isEditing}
                      onToggle={() => Session.set({isEditingPage: !isEditing})}
                    />
                  </IconButton>
                  <IconButton
                    tooltip="Show In Navigation"
                    tooltipPosition="top-right"
                  >
                  <Toggle
                    name="showInNav"
                    value="showInNav"
                    defaultToggled={showInNav}
                    onToggle={this._onToggleNav.bind(null, _id)}
                  />
                </IconButton>
                <MenuItem primary value="add_section">Add Section</MenuItem>
                <MenuItem value="remove">Delete</MenuItem>
              </IconMenu>
            </ToolbarGroup>
          )}
          <ToolbarGroup key={1} float="right">
            {hasPage ? (
              <DropDownMenu menuItems={blockDropdown} onChange={this._onChangeSectionDropdown}/>
            ) : (
              <RaisedButton
                primary
                label="Create Page"
                onClick={Meteor.call.bind(null, 'insertPage', { pathname })}
              />
            )}
          </ToolbarGroup>
        </Toolbar>
        {sections && (
          <Container fluid>
            {sections.map(({_id: blockId, ... blockProps}) => {
              return (
                <Block
                  key={blockId}
                  {... blockProps}
                  _id={blockId}
                />
              );
            })}
          </Container>
        )}
      </div>
    );
  },
});
