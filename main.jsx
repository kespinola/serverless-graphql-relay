const { IndexRoute, Route } = ReactRouter;

function _onEnterSignUp(state, newState){
  if(!Meteor.user()) return true;
  newState(null, '/account');
}

AppRoutes = (
  <Route path="/" component={App.Handler}>
    <IndexRoute component={Home.Handler}/>
    <Route path='blog' component={Post.Handlers.Index}>
      <IndexRoute component={Post.Handlers.List}/>
      <Route path='/post/:id' component={Post.Handlers.Show}/>
    </Route>
    <Route component={User.Handlers.Index}>
      <Route path='account' component={User.Handlers.Show}/>
      <Route path='login' component={User.Handlers.Session}/>
      <Route path='sign-up' onEnter={_onEnterSignUp} component={User.Handlers.New}/>
    </Route>
  </Route>
);

ReactRouterSSR.Run(AppRoutes);
