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
      <ComponentClass {... this.props} className={className}>
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
      centerXs: null,
      centerSm: null,
      centerMd: null,
      centerLg: null,
    }
  },

  render(){
    const {
      className: propsClassName,
      centerXs,
      centerSm,
      centerMd,
      centerLg,
      } = this.props;

    const ComponentClass = this.props.componentClass;
    const className = classNames(
      'row',
      propsClassName,
      {
        'center-xs': centerXs,
        'center-sm': centerSm,
        'center-md': centerMd,
        'center-lg': centerLg,
      }
    );

    return (
      <ComponentClass {... this.props} className={className}>
        {this.props.children}
      </ComponentClass>
    )
  },

});

Flexgrid.Col = React.createClass({

  getDefaultProps(){
    return {
      xs: null,
      sm: null,
      md: null,
      lg: null,
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
        [`col-xs-${xs}`]: xs,
        [`col-sm-${sm}`]: sm,
        [`col-md-${md}`]: md,
        [`col-lg-${lg}`]: lg,
        [`col-xs-offset-${xsOffset}`]: xsOffset,
        [`col-sm-offset-${smOffset}`]: smOffset,
        [`col-md-offset-${mdOffset}`]: mdOffset,
        [`col-lg-offset-${lgOffset}`]: lgOffset,
      }
    );

    return (
      <ComponentClass {... this.props} className={className}>
        {this.props.children}
      </ComponentClass>
    )
  },

});
