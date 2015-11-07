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
  IconButton,
  Styles,
} = MUI;

const {
  Colors,
} = Styles;

const {
  MenuItem,
} = Libs;

const {
  Col,
  Row,
} = Flexgrid;

const blockStyles = {
  padding: '10px 15px',
  cursor: 'pointer',
};

const innerStyles = {
  maxHeight: 275,
  overflowY: 'auto',
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
      schema: new SimpleSchema({}),
    }
  },
  
  getInitialState(){
    const {
      colors = {},  
      options = {},
    } = this.props;
    
    const optionKeys = Object.keys(options);
    const colorKeys = Object.keys(colors);
    
    return {
      optionKeys,
      colorKeys,
      active: null,
    }
  },
  
  componentWillReceiveProps({colors}){
    let update = {};
    
    if(colors) update = {... update, colorKeys: Object.keys(colors)};
    
    this.setState(update);
  },
  
  render(){
    const {
      colors,
      schema,
      options,
    } = this.props;
    const {
      active,
      colorKeys,
      optionKeys,
    } = this.state;
    
    if(active){
      return (
        <Row style={innerStyles}>
          <Col xs={12}>
            <IconButton
              onClick={() => this.setState({active: null})}
              className='material-icons'
              tooltip='Clear'
              color={Colors.black}
            >clear</IconButton>
          </Col>
          {optionKeys.map((key, i) => {
            return (
              <Col key={key} xs={4} onClick={this._handleColorChange.bind(null, key)} style={blockStyles}>
                <span>
                  <Avatar size={25} backgroundColor={options[key]} />{key}
                </span>
              </Col>
            )
          })}
        </Row>
      )      
    }else{
      return (
        <Row style={innerStyles}>
          {colorKeys.map((key, i) => {
            return (
              <Col key={key} xs={4} onClick={() => this.setState({active: key})} style={blockStyles}>
              <span>
                <Avatar size={25} backgroundColor={colors[key]} />{schema.label(key)}
              </span>
              </Col>
            )
          })}
        </Row>
      ) 
    }
  },
  
  _handleColorChange(key) {
    
    const {
      colors,
      options,
      onChange,  
    } = this.props;
    
    const {
      active
    } = this.state;
    
    this.setState({active: null}, () => {
      onChange && onChange({... colors, [active]: options[key]})
    });
    
  }
});
