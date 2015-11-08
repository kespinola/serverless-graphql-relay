const { Toolbar, Toolbargrop, RaisedButton, FlatButton } = MUI;

Page.Handlers.Index = React.createClass({
    render() {
      return (
        <div>
          <Toolbar>
            <RaisedButton primary label="Create Page" />
          </Toolbar>
        </div>
      );
    }
});
