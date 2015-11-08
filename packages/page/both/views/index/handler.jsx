const { Toolbar, ToolbarGroup, RaisedButton, FlatButton } = MUI;

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
    return {
      page: Page.Collection.findOne({ pathname }),
    }
  },

  _onClickButton(pathname) {
    Meteor.call('insertPage', { pathname });
  },

  render() {
    const { page } = this.data;
    const {
      location: { pathname },
    } = this.props;
    return (
      <div>
        <Toolbar>
        <ToolbarGroup key={1} float="right">
          {!page && <RaisedButton primary label="Create Page" onClick={this._onClickButton.bind(null, pathname)} />}
        </ToolbarGroup>
        </Toolbar>
      </div>
    );
  },
});
