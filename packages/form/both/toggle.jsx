const {
  Toggle,
} = MUI;

AutoForm.Toggle = React.createClass({

  render(){
    const {
      value,
    } = this.props;
    return <Toggle {... this.props} defaultToggled={Boolean(value)} onToggle={this._handleToggle}/>
  },

  _handleToggle(e, toggled) {
    const {
      onChange,
    } = this.props;
    onChange && onChange(toggled);
  }

});
