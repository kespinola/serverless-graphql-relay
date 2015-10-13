AutoForm.Form = React.createClass({
  propTypes:{
    schema: React.PropTypes.object,
  },

  getDefaultProps(){
    return {
      errorLabelProp: "errorText",
      schema: new SimpleSchema({}),
      onSubmit: null,
      value: {},
      onChange: null,
    }
  },

  getInitialState(){
    const {
      value,
    } = this.props;
    return {
      value,
    }
  },
  
  componentWillReceiveProps(props){
    const {
      value,
    } = props;
    value && this.setState({value});
  },

  render(){
    const {
      value: form,
    } = this.state;
    
    return (
      <form novalidate onSubmit={this._handleSubmit} autoComplete={'off'}>
        {React.Children.map(this.props.children, child => {

          const {
            errorLabelProp,
          } = this.props;

          const {
            props,
          } = child;
          
          const name = props.name;
          
          let onChange, onBlur, value;
          let error = {};
          
          if(name){
            onChange = this._handleChange.bind(null, name);
            onBlur = this._handleBlur.bind(null, name);
            value = form[name];
            error = {[errorLabelProp]: this.state[`error_${name}`]}; 
          }
          
          return React.cloneElement(child, {... props, ... error, value, onChange, onBlur});
        })}
      </form>
    )
  },
  
  _handleChange(name, e){
    const {
      onChange,  
    } = this.props;
    
    const {
      value: form,
    } = this.state;

    const update = {[name]: e.target.value};
    const value = {... form, ... update};
    
    if(onChange){
      onChange(value); 
    }else {
      this.setState({value});
    }
  },

  _handleBlur(name, e){
    
    const {
      schema,
    } = this.props;
    
    const {
      value,
    } = this.state;
    
    const field = value[name];
    const errKey = `error_${name}`;
    const ek = schema.namedContext(errKey);
    
    ek.validateOne({[name]: field}, name);
    
    this.setState({[errKey]: ek.keyErrorMessage(name)});
  },

  _handleSubmit(e){

    e.preventDefault();

    const {
      schema,
      onSubmit,
    } = this.props;

    
    let value = _.cloneDeep(this.state.value);

    const ck = schema.namedContext('complete_check');
    
    schema.clean(value);
    
    const isValid = ck.validate(value);
    
    if(isValid){

      onSubmit && onSubmit(value);

    }else{

      let errors = {};

      ck.invalidKeys().forEach(({name}) => {
        const entry = {[`error_${name}`]: ck.keyErrorMessage(name)};
        errors = {... errors, ... entry}
      });

      this.setState(errors);
    }

  },

});

