const {
  Form,
  Field,
} = AutoForm;

const {
  RaisedButton,
  TextField,
  Card,
  CardHeader,
  CardText,
  CardTitle,
  } = MUI;

const SessionUserSchema = new SimpleSchema({

  email : {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },

  password: {
    type: String,
  }

});

UserSessionForm = React.createClass({
  
  getDefaultProps(){
    return {
      onSubmit: null,
      schema: SessionUserSchema,
      title: null,
      subtitle: null,
      avatar: null,
      accounts: [
        'Facebook',
        'Google'
      ]
    }
  },
  
  render() {
    
    const {
      accounts,
      schema,
      title,
      subtitle,
      avatar,
    } = this.props;
    
    return (
      <Card>
        {avatar ? <CardHeader avatar={avatar}/> : null}
        <CardTitle title={title} subtitle={subtitle}/>
        <CardText>
          {accounts.map(account => {
            return (
              <RaisedButton
                key={account}
                label={account}
                fullWidth
                onClick={this._handleAccountClick.bind(null, account)}
                />
            )
          })}
          <span>or</span>
          <Form schema={schema} onSubmit={this._handleSubmit}>
            <Field name='email' component={TextField} floatingLabelText='Email' fullWidth />
            <Field name='password' component={TextField} floatingLabelText='Password' type='password' fullWidth/>
            <TextField fullWidth type='submit' />
          </Form>
        </CardText>
      </Card>
    );
  },

  _handleAccountClick(account){
    Meteor[`loginWith${account}`]({}, (err) => {
      throw Meteor.Error('Login failed', err)
    })
  },

  _handleSubmit(form){
    const {
      onSubmit
      } = this.props;

    onSubmit && onSubmit(form);
  }
  
});
