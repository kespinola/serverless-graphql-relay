const {
  Card,
  RaisedButton,
  } = MUI;

User.Handlers.New = React.createClass({
  getDefaultProps(){
    return {
      accounts:[
        'Facebook',
      ]
    }
  },
  render(){
    const {
      accounts,
      } = this.props;
    return (
      <span>
        {accounts.map(account => {
          return (
            <RaisedButton
              key={account}
              label={account}
              onClick={() => Meteor[`loginWith${account}`]({}, (err) => { throw new Meteor.Error('Login failed', err)})}
              />
          )
        })}
      </span>
    )
  },

});