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

const ProfileSchema = new SimpleSchema({
  'first_name': {
    type: String,
    optional: true,
    label: 'First Name',
    defaultValue: ''
  },
  'last_name': {
    type: String,
    optional: true,
    label: 'Last Name',
    defaultValue: ''
  },
});

User.Handlers.Show = React.createClass({
  
  getInitialState(){
    const {
      user = {},  
    } = this.props;
    
    const {
      profile = {},
    } = user;
    
    return {
      profile,
    }  
  },
  
  componentWillReceiveProps(props){
    
    const {
      user = {},  
    } = props;
    
    const {
      profile,  
    } = user;
    
    profile && this.setState({profile});
  },
  
  render(){
    const {
      profile = {},  
    } = this.state;
    
    const {
      first_name = '',
      last_name,
    } = profile;
    
    return (
      <Card>
        <CardHeader
          title={`${first_name}${last_name ? ` ${last_name}` : ''}`}
          avatar={<Avatar>{first_name.charAt(0).toUpperCase()}</Avatar>}
          />
        <Form 
          value={profile} 
          onChange={profile => this.setState({ profile })} 
          schema={ProfileSchema} 
          onSubmit={this._handleSubmit}>
          <Field name='first_name' component={TextField} floatingLabelText='First Name' fullWidth />
          <Field name='last_name' component={TextField} floatingLabelText='Last Name' fullWidth />
          <TextField fullWidth type='submit' />
        </Form>
      </Card>
    )
  },
  
  _handleSubmit(profile){
    Meteor.users.update(Meteor.userId(), { $set: { profile } })
  }
  
});
