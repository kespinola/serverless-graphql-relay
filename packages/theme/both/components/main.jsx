const {
  PropTypes,  
} = React;

const {
  valuesIn,  
} = R;

const {
  Avatar,
  IconMenu,
  FontIcon,
  Libs,
} = MUI;

const {
  MenuItem,
} = Libs;

const {
  Col,
  Row,
  } = Flexgrid;

const blockStyles = {
  padding:'10px 15px',
  cursor: 'pointer',
};

Theme.Components.PaletteManager = React.createClass({
  
  propTypes: {
    colors: PropTypes.object,
    onChange: PropTypes.func,
    schema: PropTypes.object,
  },
  
  getDefaultProps(){
    return {
      colors: {},
      options: {},
      schema: new SimpleSchema({})
    }
  },
  getInitialState(){
    const {
      colors,  
      options,
    } = this.props;
    
    const optionKeys = Object.keys(options);
    
    return {
      optionKeys,
      colorKeys: Object.keys(colors),
      menuItems: optionKeys.map( option => {
        return <MenuItem key={option} primaryText={option} leftIcon={<FontIcon className='material-icons' color={options[option]}>lens</FontIcon>}/>
      }),
    }
  },
  
  componentWillReceiveProps({colors, options}){
    let update = {};
    
    if(colors) update = {... update, colorKeys: Object.keys(colors)};
    
    if(options !== this.props.options){
      const optionKeys = Object.keys(options);
      const menuItems = optionKeys.map( option => {
        return <MenuItem key={option} primaryText={option} leftIcon={<FontIcon className='material-icons' color={options[option]}>lens</FontIcon>}/>
      });
      update = {... update, optionKeys, menuItems};
    } 
    
    this.setState(update);
  },
  
  render(){
    const {
      colors,
      schema,
    } = this.props;
    const {
      colorKeys,
      menuItems,
    } = this.state;
    
    
    return (
      <Row>
        {colorKeys.map((key, i) => {
          return (
            <Col key={key} xs={4} style={blockStyles}>
              <IconMenu
                maxHeight={140}
                onItemTouchTap={this._handleColorChange.bind(null, key)}
                iconButtonElement={
                <span>
                  <Avatar size={25} backgroundColor={colors[key]} />{schema.label(key)}
                </span>
                }>
                {menuItems}
              </IconMenu>
            </Col>
          )
        })}
      </Row>
    )
  },
  
  _handleColorChange(lookup, e, {key}){
    
    const {
      onChange,  
    } = this.props;
    
    const {
      colors,
      options,
    } = this.props;
    
    onChange && onChange({... colors, [lookup]: options[key]})
    
  }
});
