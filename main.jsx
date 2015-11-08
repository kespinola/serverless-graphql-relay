const { IndexRoute, Route, Router } = ReactRouter;

function onEnterSignUp(state, newState) {
  if(Meteor.userId()) newState(null, '/account');
}
function onEnterAccount({bypass}, newState) {
  if(!Meteor.userId() && !bypass) newState(null, '/login');
}

Meteor.startup(() => {

  if(Meteor.isServer) return null;

  const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();

  React.render((
    <Router history={ReactRouter.history.createHistory()}>
      <Route path="/" component={App.Handlers.Root}>
        <Route path='blog' component={Post.Handlers.Index}>
          <IndexRoute component={Post.Handlers.List}/>
          <Route path='/post/:id' component={Post.Handlers.Show}/>
        </Route>
        <Route component={User.Handlers.Index}>
          <Route path='account' onEnter={onEnterAccount} component={User.Handlers.Edit}/>
          <Route path='sign-up' onEnter={onEnterSignUp} component={User.Handlers.New}/>
          <Route path='login' component={User.Handlers.Session}/>
          <Route path='users' component={User.Handlers.List}/>
        </Route>
        <Route path='roles' component={Role.Handlers.List}/>
        <Route component={Site.Handlers.Index}>
          <Route path='configure' component={Site.Handlers.Settings} />
          <Route path='sites' component={Site.Handlers.List}/>
        </Route>
        <IndexRoute component={Page.Handlers.Index}/>
      </Route>
    </Router>
  ), document.body);
});
