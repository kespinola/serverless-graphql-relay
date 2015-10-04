AutoForm.Form = React.createClass({
  propTypes:{
    schema: React.PropTypes.object,
  },

  getDefaultProps(){
    return {
      errorLabelProp: "errorText",
      schema: null,
    }
  },

  render(){
    return (
      <form onSubmit={this._handleSubmit}>
        {React.Children.map(this.props.children, child => {

          const {
            props,
            } = child;
          const onChange = props.onChange ? this._handleFieldChange.bind(null, props.name) : null;
          return React.cloneElement(child, {... props, onChange});
        })}
      </form>
    )
  },

  _handleFieldChange(name, e){
  },

  _handleSubmit(e){
    const {
      schema,
      } = props;
    e.preventDefault();
  },

});