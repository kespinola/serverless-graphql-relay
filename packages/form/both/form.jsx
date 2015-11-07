const {
  reduce,
  valuesIn,
  is,
} = R;

const {
  fromJS,  
} = Immutable;

function isString(value){
  return is(String, value)
}

function getValue(name, map, defaultValue = null){
  const keys = name.split('.');
  return map[keys.length ? 'getIn' : 'get'](keys, defaultValue);
}

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
      value: fromJS(value),
    }
  },
  
  componentWillReceiveProps(props){
    const {
      value,
    } = props;
    
    value && this.setState({value: this.state.value.merge(fromJS(value))});
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
            value = getValue(name, form);
            error = {[errorLabelProp]: this.state[`error_${name}`]}; 
          }
          
          return React.cloneElement(child, {... props, ... error, value, onChange, onBlur});
        })}
      </form>
    )
  },
  
  _handleChange(name, response){
    const {
      onChange,  
    } = this.props;
    
    const {
      value: form,
    } = this.state;
    
    const keys = name.split('.');
    const change = response.target ? response.target.value : response;
    const value = form[keys.length ? 'setIn' : 'set'](keys, change);
    
    if(onChange){
      onChange(value.toJS()); 
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
    
    const errKey = `error_${name}`;
    const ek = schema.namedContext(errKey);
    
    ek.validateOne(value.toJS(), name);
    
    this.setState({[errKey]: ek.keyErrorMessage(name)});
  },

  _handleSubmit(e){

    e.preventDefault();

    const {
      schema,
      onSubmit,
    } = this.props;

    
    let value = this.state.value.toJS();

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

