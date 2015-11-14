/* global Meteor, React, ReactRouter, Meteor, App, Site, Role, Page, Block, Post, User */
const { IndexRoute, Route, Router } = ReactRouter;

function onEnterSignUp(state, newState) {
  if (Meteor.userId()) newState(null, '/account');
}
function onEnterAccount(state, newState) {
  if (!Meteor.userId()) newState(null, '/login');
}

Meteor.startup(() => {
  if (Meteor.isServer) return null;

  React.render((
    <Router history={ReactRouter.history.createHistory()}>
      <Route path="/" component={App.Handlers.Index}>
        <Route path="blog" component={Post.Handlers.Index}>
          <IndexRoute component={Post.Handlers.List}/>
          <Route path="/post/:id" component={Post.Handlers.Show}/>
        </Route>
        <Route component={User.Handlers.Index}>
          <Route path="account" onEnter={onEnterAccount} component={User.Handlers.Edit}/>
          <Route path="sign-up" onEnter={onEnterSignUp} component={User.Handlers.New}/>
          <Route path="login" component={User.Handlers.Session}/>
          <Route path="users" component={User.Handlers.List}/>
        </Route>
        <Route path="roles" component={Role.Handlers.List}/>
        <Route component={Site.Handlers.Index}>
          <Route path="configure" component={Site.Handlers.Settings}/>
          <Route path="sites" component={Site.Handlers.List}/>
        </Route>
        <Route path="block" component={Block.Handlers.Index}>
          <Route path=":blockId/edit" component={Block.Handlers.Edit}/>
        </Route>
        <Route path="*" component={Page.Handlers.Index}/>
        <IndexRoute component={Page.Handlers.Index}/>
      </Route>
    </Router>
  ), document.body);
});
