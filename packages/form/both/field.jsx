AutoForm.Field = React.createClass({
  getDefaultProps(){
    return {
      component: 'input',
      type: 'text',
    }
  },
  render(){
    const {
      value,
      onChange,
      } = this.props;

    const Component = this.props.component;
    return <Component {... this.props} value={value} onChange={onChange} />
  }
});
