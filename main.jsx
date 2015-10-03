const { IndexRoute, Route } = ReactRouter;

AppRoutes = (
  <Route path="/" component={App.Handler}>
    <IndexRoute component={Home.Handler}/>
    <Route path='blog' component={Post.Handlers.Index}>
      <IndexRoute component={Post.Handlers.List}/>
      <Route path='/post/:id' component={Post.Handlers.Show}/>
    </Route>
    <Route component={User.Handlers.Index}>
      <IndexRoute component={User.Handlers.Show}/>
      <Route path='/sign-up' component={User.Handlers.New}/>
    </Route>
  </Route>
);

ReactRouterSSR.Run(AppRoutes);
