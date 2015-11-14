/* global MUI, AutoForm, R, User, React, Meteor, SimpleSchema */
const { Card, CardHeader, TextField, Avatar } = MUI;
const { Form, Field } = AutoForm;
const { reduce, values } = R;

const UserSchema = new SimpleSchema({
  'firstName': {
    type: String,
    optional: true,
    label: 'First Name',
    defaultValue: '',
  },
  'lastName': {
    type: String,
    optional: true,
    label: 'Last Name',
    defaultValue: '',
  },
});

User.Handlers.Edit = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
  },

  _onSubmit(user) {
    const keys = Object.keys(user);
    const userValues = values(user);
    let index = 0;

    const update = reduce((memo, value) => {
      memo[`${keys[index]}`] = value;
      index++;
      return memo;
    }, {}, userValues);

    Meteor.call('updateUser', update);
  },

  render() {
    const {
      user: {
        fullName = ''
      } = {},
    } = this.props;

    return (
      <Card>
        <CardHeader
          title={fullName}
          avatar={<Avatar>{fullName.charAt(0).toUpperCase()}</Avatar>}
          />
        <Form
          autoSave
          value={this.props.user}
          schema={User.Schema}
          onSubmit={this._onSubmit}>
          <Field name="firstName" component={TextField} floatingLabelText="First Name" fullWidth />
          <Field name="lastName" component={TextField} floatingLabelText="Last Name" fullWidth />
        </Form>
      </Card>
    );
  },

});
