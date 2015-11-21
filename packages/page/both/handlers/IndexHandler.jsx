/* global Meteor, Page, Row, React, R, MUI, ReactMeteorData, Session, Flexgrid */

const {
  TextField,
  Toolbar,
  ToolbarGroup,
  Toggle,
  RaisedButton,
  IconButton,
  IconMenu,
  MenuItem,
  DropDownMenu,
} = MUI;
const { PropTypes } = React;
const { Container } = Flexgrid;
const { Component: { Row: PageRow } } = Page;

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
    const { location: { pathname } } = this.props;
    const pageHandler = Meteor.subscribe('pageByPath', pathname);
    const page = Page.Collection.findOne({ pathname }) || {};
    const pageId = page._id;

    return {
      page,
      pageReady: pageHandler.ready(),
      hasPage: Object.keys(page).length,
      isEditing: Session.get('isEditingPage'),
      rows: Row.Collection.find({ parentId: pageId }).fetch(),
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
    case 'add_row':
      Meteor.call('addRow', { pageId: _id });
      break;
    default:
    }
  },

  _onToggleNav(_id, event, showInNav) {
    Meteor.call('updatePage', _id, { showInNav });
  },

  _onChangeSectionDropdown(event, selectedIndex, { payload }) {
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
          text: 'Delete',
          onTouchTap() {
            Meteor.call('removeRow', payload);
          },
        },
        {
          text: '+ Add Row',
          onTouchTap() {
            Meteor.call('addRow', { parentId: payload });
          },
        },
      ],
    }, `/block/${payload}/edit`);
  },

  render() {
    const { page, hasPage, isEditing, blocksForPage = [], rows } = this.data;
    const { _id, title, showInNav } = page;
    const { location: { pathname } } = this.props;
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
                <MenuItem primary value="add_row">New</MenuItem>
                <MenuItem value="remove">Delete</MenuItem>
              </IconMenu>
            </ToolbarGroup>
          )}
          <ToolbarGroup key={1} float="right">
            {hasPage ? (
              <DropDownMenu
                displayMember="_id"
                valueMember="_id"
                menuItems={blocksForPage}
                onChange={this._onChangeSectionDropdown}/>
            ) : (
              <RaisedButton
                primary
                label="Create Page"
                onClick={Meteor.call.bind(null, 'insertPage', { pathname })}
              />
            )}
          </ToolbarGroup>
        </Toolbar>
        {rows && (
          <Container fluid>
            {rows && rows.map(({_id: rowId, ... props}) => {
              return (
                <PageRow
                  {... props}
                  key={rowId}
                  _id={rowId}
                />
              );
            })}
          </Container>
        )}
      </div>
    );
  },
});
