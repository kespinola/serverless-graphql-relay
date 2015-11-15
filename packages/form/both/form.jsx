/* global R, Immutable, React, AutoForm SimpleSchema, */
const { reduce, valuesIn, is, curry } = R;

const { fromJS, is: immutableIs } = Immutable;

const getValueFromMap = curry((defaultValue = null, map, name) => {
  const keys = name.split('.');
  return map[keys.length ? 'getIn' : 'get'](keys, defaultValue);
})

AutoForm.Form = React.createClass({

  propTypes: {
    schema: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    value: React.PropTypes.object,
    autoSave: React.PropTypes.bool,
  },

  childContextTypes: {
    autoFormContext: React.PropTypes.shape({
      schema: React.PropTypes.object,
      onChange: React.PropTypes.func,
      onBlur: React.PropTypes.func,
      getErrorMsg: React.PropTypes.func,
      getValue: React.PropTypes.func,
    }),
  },

  getChildContext() {
    const { value } = this.state;
    const { schema } = this.props;
    return {
      autoFormContext: {
        schema,
        onChange: this._onChange,
        onBlur: this._onBlur,
        getErrorMsg: this._getErrorMsg,
        getValue: getValueFromMap(null, value),
      }
    }
  },

  getDefaultProps() {
    return {
      schema: new SimpleSchema({}),
      onSubmit: null,
      value: {},
      onChange: null,
      autoSave: false,
    };
  },

  getInitialState() {
    const { schema } = this.props;
    let value = this.props.value;
    schema.namedContext('init_state');
    schema.clean(value);
    return { value: fromJS(value) };
  },

  componentWillReceiveProps(props) {
    const { value } = props;

    if (!value) return false;
    const Value = fromJS(value);

    if (immutableIs(Value, this.state.value)) return false;

    this.setState({value: this.state.value.merge(Value)});
  },

  _getErrorMsg(name) {
    return this.state[`error_${name}`];
  },

  _onChange(name, change) {
    const { onChange, autoSave } = this.props;
    const { value: form } = this.state;
    const keys = name.split('.');
    const value = form[keys.length ? 'setIn' : 'set'](keys, change);

    if (onChange) {
      onChange(value.toJS());
    } else {
      this.setState({value}, () => {
        if (autoSave) this._onSubmit();
      });
    }
  },

  _onBlur(name) {
    const errKey = `error_${name}`;
    const ek = this.props.schema.namedContext(errKey);

    ek.validateOne(this.state.value.toJS(), name);

    this.setState({[errKey]: ek.keyErrorMessage(name)});
  },

  _onSubmit(event) {
    if (event) event.preventDefault();

    const {
      schema,
      onSubmit,
    } = this.props;

    const value = this.state.value.toJS();

    const ck = schema.namedContext('complete_check');

    schema.clean(value);

    const isValid = ck.validate(value);

    if (isValid && onSubmit) {
      onSubmit(value);
    } else {
      let errors = {};

      ck.invalidKeys().forEach(({name}) => {
        const entry = { [`error_${name}`]: ck.keyErrorMessage(name) };
        errors = {... errors, ... entry};
      });

      this.setState(errors);
    }
  },

  render() {
    const { value: form } = this.state;

    return (
      <form novalidate onSubmit={this._onSubmit} autoComplete={'off'}>
        {this.props.children}
      </form>
    );
  },
});
