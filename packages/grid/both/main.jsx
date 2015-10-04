Flexgrid.Container = React.createClass({

  getDefaultProps(){
    return {
      componentClass: 'div',
    }
  },

  render(){
    const {
      className: propClassName = '',
      } = this.props;

    const ComponentClass = this.props.componentClass;
    const className = classNames(propClassName, 'container');

    return (
      <ComponentClass className={className}>
        {this.props.children}
      </ComponentClass>
    )
  }
});

Flexgrid.Row = React.createClass({

  getDefaultProps(){
    return {
      componentClass: 'div',
    }
  },

  render(){
    const {
      className: propsClassName = '',
      } = this.props;

    const ComponentClass = this.props.componentClass;
    const className = classNames('row', propsClassName);

    return (
      <ComponentClass className={className}>
        {this.props.children}
      </ComponentClass>
    )
  }
});

Flexgrid.Col = React.createClass({

  getDefaultProps(){
    return {
      componentClass: 'div',
    }
  },

  render(){
    const {
      xs = 12,
      sm = 12,
      md = 12,
      lg = 12,
      className: propClassName = '',
      } = this.props;

    const ComponentClass = this.props.componentClass;
    const className = classNames(propClassName, {[`col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg}`]: true});

    return (
      <ComponentClass className={className}>
        {this.props.children}
      </ComponentClass>
    )
  }
});