/* global AutoForm, React, R */
const { compose } = R;
const eventValue = e => e.target.value;

const AutoFormField = React.createClass({

  contextTypes: {
    autoFormContext: React.PropTypes.shape({
      schema: React.PropTypes.object,
      onChange: React.PropTypes.func,
      onBlur: React.PropTypes.func,
      getErrorMsg: React.PropTypes.func,
      getValue: React.PropTypes.func,
    }),
  },

  propTypes: {
    name: React.PropTypes.string,
    component: React.PropTypes.node,
    type: React.PropTypes.string,
    errorLabelProp: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      mapValue: eventValue,
      errorLabelProp: 'errorText',
    }
  },

  _onChangeField(... args) {
    const { mapValue, name, } = this.props;
    const { autoFormContext: { onChange } } = this.context;
    return compose(
      onChange.bind(null, name),
      mapValue,
    )(... args);
  },

  render() {
    const {
      name,
      errorLabelProp,
      component: Component,
    } = this.props;
    const {
      autoFormContext: { onBlur, getValue, getErrorMsg },
    } = this.context;
    const error = { [errorLabelProp]: getErrorMsg(name) };
    return (
      <Component
        {... this.props}
        {... error}
        value={getValue(name)}
        onChange={this._onChangeField}
        onBlur={onBlur.bind(null, name)}
      />
    );
  },

});

AutoForm.Field = AutoFormField;
