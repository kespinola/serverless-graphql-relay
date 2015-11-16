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

function gatherBlockOptions(blocks = []){
  let menu = [];
  blocks.forEach(({_id, blocks: children = []}) => {
    menu.push({payload: _id, text: _id});
    debugger;
    if (children.length) menu = menu.concat(... gatherBlockOptions(children));
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
    Session.set('editingBlock', null);
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
      blockDropdown: gatherBlockOptions(page.blocks)
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
    default:
    }
  },

  _onToggleNav(_id, event, showInNav) {
    Meteor.call('updatePage', _id, { showInNav });
  },

  render() {
    const { page, hasPage, isEditing, blockDropdown } = this.data;
    const { _id, title, showInNav, blocks = [] } = page;
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
                <MenuItem value="remove">Delete</MenuItem>
              </IconMenu>
            </ToolbarGroup>
          )}
          <ToolbarGroup key={1} float="right">
            {hasPage ? (
              <FlatButton
                primary
                label="Add Block"
                onClick={Meteor.call.bind(null, 'addBlock', {parentId: _id})}
              />
            ) : (
              <RaisedButton
                primary
                label="Create Page"
                onClick={Meteor.call.bind(null, 'insertPage', { pathname })}
              />
            )}
            <ToolbarSeparator />
            <DropDownMenu menuItems={blockDropdown} />
          </ToolbarGroup>
        </Toolbar>
        {blocks && (
          <Container fluid>
            {blocks.map(({_id: blockId, blocks = [], ... blockProps}) => {
              return (
                <Block
                  key={blockId}
                  {... blockProps}
                  _id={blockId}
                  blocks={blocks}
                  hasChildren={blocks.length > 0}
                  history={history}
                  isEditing={isEditing}
                />
              );
            })}
          </Container>
        )}
      </div>
    );
  },
});
