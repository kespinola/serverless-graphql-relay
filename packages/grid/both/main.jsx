Flexgrid.Container = React.createClass({

  getDefaultProps(){
    return {
      className: '',
      fluid: false,
      componentClass: 'div',
    }
  },

  render(){
    const {
      className: propClassName,
      fluid,
      } = this.props;

    const ComponentClass = this.props.componentClass;
    const className = classNames(propClassName, `container${fluid ? '-fluid' : ''}`);

    return (
      <ComponentClass className={className}>
        {this.props.children}
      </ComponentClass>
    )
  },

});

Flexgrid.Row = React.createClass({

  getDefaultProps(){
    return {
      className: '',
      componentClass: 'div',
    }
  },

  render(){
    const {
      className: propsClassName,
      } = this.props;

    const ComponentClass = this.props.componentClass;
    const className = classNames('row', propsClassName);

    return (
      <ComponentClass className={className}>
        {this.props.children}
      </ComponentClass>
    )
  },

});

Flexgrid.Col = React.createClass({

  getDefaultProps(){
    return {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xsOffset: null,
      smOffset: null,
      mdOffset: null,
      lgOffset: null,
      className: '',
      componentClass: 'div',
    }
  },

  render(){
    const {
      xs,
      sm,
      md,
      lg,
      xsOffset,
      smOffset,
      mdOffset,
      lgOffset,
      className: propClassName,
      } = this.props;

    const ComponentClass = this.props.componentClass;
    const className = classNames(
      propClassName,
      {
        [`col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg}`]: true,
        [`col-xs-offset-${xsOffset}`]: xsOffset,
        [`col-sm-offset-${smOffset}`]: smOffset,
        [`col-md-offset-${mdOffset}`]: mdOffset,
        [`col-lg-offset-${lgOffset}`]: lgOffset,
      }
    );

    return (
      <ComponentClass className={className}>
        {this.props.children}
      </ComponentClass>
    )
  },

});
