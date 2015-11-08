const { TextField, Toolbar, ToolbarGroup, RaisedButton, FlatButton } = MUI;
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

  _onClickButton(pathname) {
    Meteor.call('insertPage', { pathname });
  },

  _onChangeTitle({ target: { value: title } }) {
    Meteor.call('updatePage', this.data.page._id, { title });
  },

  render() {
    const { page, hasPage } = this.data;
    const { title } = page;
    const {
      location: { pathname },
    } = this.props;
    return (
      <div>
        <Toolbar>
        <ToolbarGroup key={0} float="left">
        <TextField hintText="Page Title" value={title} onChange={this._onChangeTitle} />
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          {!hasPage && <RaisedButton primary label="Create Page" onClick={this._onClickButton.bind(null, pathname)} />}
        </ToolbarGroup>
        </Toolbar>
      </div>
    );
  },
});
