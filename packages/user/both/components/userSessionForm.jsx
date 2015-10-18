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

const {
  reduce,  
} = R;

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

  mixins: [ReactMeteorData],
  
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
  
  getMeteorData(){
    return {
      site: Site.Collection.findOne({domain: Meteor.settings.public.domain}) || {}
    }
  },
  
  render() {
    
    const{
      site,  
    } = this.data;
    
    const {
      schema,
      title,
      subtitle,
      avatar,
    } = this.props;
    
    const accounts = reduce((memo, account) => {
      if(!site[account.toLowerCase()].active) return memo;
      memo = memo.concat(account);
      return memo;
    }, [], this.props.accounts);
    
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
          {accounts.length ? <span>or</span> : null}
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
