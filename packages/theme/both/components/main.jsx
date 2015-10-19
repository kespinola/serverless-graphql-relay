const {
  PropTypes,  
} = React;

const {
  valuesIn,  
} = R;

const {
  Avatar,
  IconMenu,
  MenuItem,
} = MUI;

const {
  Col,
  Row,
  } = Flexgrid;

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
    
    return {
      colorKeys: Object.keys(colors),
      optionKeys: Object.keys(options),
    }
  },
  
  componentWillReceiveProps({colors, options}){
    let update = {};
    if(colors) update = {... update, colorKeys: Object.keys(colors)};
    if(options) update = {... update, optionKeys: Object.keys(options)};
    
    this.setState(update);
  },
  
  render(){
    const {
      colors,
      schema,
      options,
    } = this.props;
    const {
      colorKeys,
      optionKeys,
    } = this.state;
    return (
      <Row>
        {colorKeys.map((key, i) => {
          return (
            <Col xs={4} style={blockStyles}>
              <IconMenu 
                iconButtonElement={
                <span>
                  <Avatar size={25} backgroundColor={colors[key]} />{schema.label(key)}
                </span>
                }>
                {optionKeys.map( option => {
                  return <MenuItem key={option} primaryText={option} />
                })}
              </IconMenu>
            </Col>
          )
        })}
      </Row>
    )
  },
  
  _handleColorClick(key){
    debugger;
  }
});
