const {
  Card,
  CardHeader,
  TextField,
  Avatar,
} = MUI;

const {
  Form,
  Field,
} = AutoForm;

const {
  reduce,
  values,
} = R;

const UserSchema = new SimpleSchema({
  'firstName': {
    type: String,
    optional: true,
    label: 'First Name',
    defaultValue: ''
  },
  'lastName': {
    type: String,
    optional: true,
    label: 'Last Name',
    defaultValue: ''
  },
});

User.Handlers.Edit = React.createClass({

  getInitialState() {
    const {
      user = {},
    } = this.props;
    return {
      user,
    };
  },

  componentWillReceiveProps({user = {}}) {
    if (user) this.setState({ user });
  },

  _onSubmit(user) {
    const keys = Object.keys(user);
    const userValues = values(user);
    let index = 0;

    let update = reduce((memo, value) => {
      memo[`${keys[index]}`] = value;
      index++;
      return memo;
    }, {}, userValues);

    Meteor.call('updateUser', update);
  },

  render() {
    const {
      user: { fullName = '' },
    } = this.state;

    return (
      <Card>
        <CardHeader
          title={fullName}
          avatar={<Avatar>{fullName.charAt(0).toUpperCase()}</Avatar>}
          />
        <Form
          value={this.state.user}
          onChange={user => this.setState({ user })}
          schema={UserSchema}
          onSubmit={this._onSubmit}>
          <Field name='firstName' component={TextField} floatingLabelText='First Name' fullWidth />
          <Field name='lastName' component={TextField} floatingLabelText='Last Name' fullWidth />
          <TextField fullWidth type='submit' />
        </Form>
      </Card>
    );
  },

});
