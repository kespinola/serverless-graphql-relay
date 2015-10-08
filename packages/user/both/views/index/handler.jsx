User.Handlers.Index = React.createClass({
  
  mixins:[ReactMeteorData],

  getMeteorData() {
    return {
      user: Meteor.user(),
      users: Meteor.users.find().fetch(),
    };
  },
  
  render(){
    const {
      user,
      users,
    } = this.data;
    {React.Children.map(this.props.children, child => {
      const {
        props,
        } = child;
      return React.cloneElement(child, {... props, user, users})
    })}
  }
});
