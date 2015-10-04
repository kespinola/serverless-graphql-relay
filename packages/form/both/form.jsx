AutoForm.Form = React.createClass({
  propTypes:{
    schema: React.PropTypes.object,
  },

  getDefaultProps(){
    return {
      errorLabelProp: "errorText",
      schema: new SimpleSchema({}),
    }
  },

  getInitialState(){
    const schemaContext = this.props.schema.namedContext("formContext");
    return {
      schemaContext,
      form: {}
    }
  },

  render(){
    return (
      <form onSubmit={this._handleSubmit}>
        {React.Children.map(this.props.children, child => {

          const {
            props,
            } = child;

          const {
            form,
          } = this.state;

          const name = props.name;
          const onChange = this._handleFieldChange.bind(null, name);
          const value = form[name];
          return React.cloneElement(child, {... props, value, onChange});
        })}
      </form>
    )
  },

  _handleFieldChange(name, e){
    const {
      schemaContext,
      form: oldForm,
      } = this.state;

    const update = {[name]:e.target.value};
    const isValid = schemaContext.validateOne(update, name);
    const form = {... oldForm, ... update};
    this.setState({form})
  },

  _handleSubmit(e){
    const {
      schema,
      } = props;
    e.preventDefault();
  },

});