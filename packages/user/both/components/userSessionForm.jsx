const sessionUserSchema = new SimpleSchema({

  email : {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },

  password: {
    type: String,
  }

});

class UserSessionForm extends React.Component {

	static propTypes = {
    schema: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
  };

	static defaultProps = {
    onSubmit: null,
    schema: sessionUserSchema,
  };
	
	constructor(props) {
	
		super();
		
	}
	
	render(){
	 return (
     <Form schema={schema} onSubmit={this._handleSubmit}>
       <Field name='email' component={TextField} floatingLabelText='Email' fullWidth />
       <Field name='password' component={TextField} floatingLabelText='Password' type='password' fullWidth/>
       <TextField fullWidth type='submit' />
     </Form>
   );
	},
  
  _handleSubmit(form){
    const {
      onSubmit
    } = this.props;
    
    onSubmit && onSubmit(form);
  }
	
	
	
}
