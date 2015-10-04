AutoForm.Field = React.createClass({
  render(){
    const {
      value,
      onChange,
      } = this.props;

    const Component = this.props.component;
    return <Component {... this.props} value={value} onChange={onChange} />
  }
});