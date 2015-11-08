User.Handlers.Index = React.createClass({

  mixins:[ReactMeteorData],

  getMeteorData() {
    const usersHandler = Meteor.subscribe('users');
    const userHandler = Meteor.subscribe('user');
    
    return {
      user: User.Collection.findOne({parentId: Meteor.userId()}),
      users: User.Collection.find().fetch(),
    };
  },

  render() {
    const {
      user,
      users,
    } = this.data;
    return React.cloneElement(this.props.children, {user, users})
  },
});
