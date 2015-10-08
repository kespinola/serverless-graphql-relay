AutoForm.Form = React.createClass({
  propTypes:{
    schema: React.PropTypes.object,
  },

  getDefaultProps(){
    return {
      errorLabelProp: "errorText",
      schema: new SimpleSchema({}),
      onSubmit: null,
    }
  },

  getInitialState(){
    return {
      form: {}
    }
  },

  render(){
    return (
      <form onSubmit={this._handleSubmit}>
        {React.Children.map(this.props.children, child => {

          const {
            errorLabelProp,
            } = this.props;

          const {
            props,
            } = child;

          const {
            form,
          } = this.state;

          const name = props.name;
          const onChange = this._handleChange.bind(null, name);
          const onBlur = this._handleBlur.bind(null, name);
          const value = form[name];
          const error = {[errorLabelProp]: this.state[`error_${name}`]};
          return React.cloneElement(child, {... props, ... error, value, onChange, onBlur});
        })}
      </form>
    )
  },

  _handleChange(name, e){
    
    const {
      form,
    } = this.state;

    const update = {[name]: e.target.value};
    this.setState({form: {... form, ... update}})
  },

  _handleBlur(name, e){
    const {
      schema,
    } = this.props;
    const {
      form,
    } = this.state;
    const value = form[name];

    const errKey = `error_${name}`;

    const ek = schema.namedContext(errKey);
    ek.validateOne({[name]: value}, name);
    
    this.setState({[errKey]: ek.keyErrorMessage(name)});
  },

  _handleSubmit(e){

    e.preventDefault();

    const {
      schema,
      onSubmit,
    } = this.props;

    const {
      form,
    } = this.state;

    const ck = schema.namedContext('complete_check');

    const isValid = ck.validate(form);
    
    if(isValid){

      onSubmit && onSubmit(form);

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
