const {
  Toggle,  
} = MUI;

AutoForm.Toggle = React.createClass({
  
  render(){
    const {
      value,  
    } = this.props;
    return <Toggle {... this.props} defaultToggled={value} onToggle={this._handleToggle}/> 
  },
  
  _handleToggle(e, toggled){
    const {
      onChange,
    } = this.props;
    e.target.value = Boolean(toggled);
    onChange && onChange(e);
  }
  
});
