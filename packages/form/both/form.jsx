const { reduce, valuesIn, is } = R;

const { fromJS, is: immutableIs } = Immutable;

function getValue(name, map, defaultValue = null) {
  const keys = name.split('.');
  return map[keys.length ? 'getIn' : 'get'](keys, defaultValue);
}

AutoForm.Form = React.createClass({

  propTypes:{
    schema: React.PropTypes.object,
    errorLabelProp: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    value: React.PropTypes.object,
    autoSave: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      errorLabelProp: 'errorText',
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
    const ck = schema.namedContext('init_state');
    schema.clean(value);
    return { value: fromJS(schema.clean(value)) };
  },

  componentWillReceiveProps(props) {
    const { value, autoSave } = props;

    if (!value) return false;
    const Value = fromJS(value);

    if (immutableIs(Value, this.state.value)) return false;

    this.setState({value: this.state.value.merge(Value)});
  },

  _onChange(name, response) {
    const { onChange, autoSave } = this.props;

    const { value: form } = this.state;

    const keys = name.split('.');
    const change = response.target ? response.target.value : response;
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
        const entry = {[`error_${name}`]: ck.keyErrorMessage(name)};
        errors = {... errors, ... entry};
      });

      this.setState(errors);
    }
  },

  render() {
    const { value: form } = this.state;

    return (
      <form novalidate onSubmit={this._onSubmit} autoComplete={'off'}>
        {React.Children.map(this.props.children, child => {
          const { errorLabelProp } = this.props;
          const {
            props: { name },
          } = child;

          let onChange;
          let onBlur;
          let value;
          let error = {};

          if (name) {
            onChange = this._onChange.bind(null, name);
            onBlur = this._onBlur.bind(null, name);
            value = getValue(name, form);
            error = {[errorLabelProp]: this.state[`error_${name}`]};
          }
          return React.cloneElement(child, {... child.props, ... error, value, onChange, onBlur});
        })}
      </form>
    );
  },
});
