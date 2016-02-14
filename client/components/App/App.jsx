import React from 'react';
import { AppCanvas, AppBar } from 'material-ui';

class App extends React.Component {
  render() {
    return (
      <AppCanvas>
        <AppBar
          title="Prism"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        {this.props.children}
      </AppCanvas>
    );
  }
}

export default App;
