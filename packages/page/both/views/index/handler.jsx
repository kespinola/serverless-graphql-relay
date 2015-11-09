const {
  Checkbox,
  TextField,
  Toolbar,
  ToolbarGroup,
  Toggle,
  ToolbarSeparator,
  RaisedButton,
  FlatButton,
  IconButton,
  IconMenu,
  MenuItem,
} = MUI;
const { isEmpty } = R;

Page.Handlers.Index = React.createClass({

  propTypes: {
    location: React.PropTypes.object,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const {
      location: { pathname },
    } = this.props;
    const pageHandler = Meteor.subscribe('pageByPathname', pathname);
    const page = Page.Collection.findOne({ pathname }) || {};
    return {
      page,
      hasPage: Object.keys(page).length,
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
    const { page, hasPage } = this.data;
    const { _id, title, showInNav } = page;
    const {
      location: { pathname },
    } = this.props;
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
                <MenuItem value="remove">Delete</MenuItem>
                <IconButton
                  tooltip="Show In Navigation"
                  tooltipPosition="bottom-right"
                >
                  <Toggle
                    name="showInNav"
                    value="showInNav"
                    defaultToggled={showInNav}
                    onToggle={this._onToggleNav.bind(null, _id)}
                  />
                </IconButton>
              </IconMenu>
            </ToolbarGroup>
          )}
          <ToolbarGroup key={1} float="right">
            {hasPage ? (
              <FlatButton
                primary
                label="Add Block"
                onClick={Meteor.call.bind(null, 'addBlock', _id)}
              />
            ) : (
              <RaisedButton
                primary
                label="Create Page"
                onClick={Meteor.call.bind(null, 'insertPage', { pathname })}
              />
            )}
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  },
});
