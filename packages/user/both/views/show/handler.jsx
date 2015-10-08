const {
  Card,
  CardHeader,
  TextField,
  Avatar,
  RaisedButton,
} = MUI;

const {
  Form,
  Field,
} = AutoForm;

const profileSchema = new SimpleSchema({
  'first_name': {
    type: String,
    optional: true,
    label: 'First Name'
  },
  'last_name': {
    type: String,
    optional: true,
    label: 'Last Name'
  },
});

User.Handlers.Show = React.createClass({
  render(){
    return (
      <Card>
        <CardHeader
          />
        <Form schema={profileSchema} onSubmit={this._handleSubmit}>
          <Field name='first_name' component={TextField} floatingLabelText='First Name' fullWidth />
          <Field name='last_name' component={TextField} floatingLabelText='Last Name' fullWidth />
          <TextField fullWidth type='submit' />
        </Form>
      </Card>
    )
  },
  
  _handleSubmit(profile){
    Meteor.users.update(Meteor.userId(), {$set: {profile}})
  }
});
