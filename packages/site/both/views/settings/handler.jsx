const {
  Tabs,
  Tab,
  TextField,
} = MUI;

const {
  Form,
  Field,
  Toggle,
} = AutoForm;

const {
  Collection,
  Schema,
} = Site;

const {
  Components: ThemeComponents,
  Colors,
} = Theme;

const {
  PaletteManager,
} = ThemeComponents;

const SettingSchema = new SimpleSchema({
  
  title:{
    type: String,
  },
  
  'facebook.active': {
    type: Boolean
  },
  
  'google.active': {
    type: Boolean,
  }
  
});

Site.Handlers.Settings = React.createClass({
  
	propTypes: {},
  
  getInitialState(){
    const {
      site,  
    } = this.props;
    
    return {
      site,
    }
  },
  
  componentWillReceiveProps({site}){
    site && this.setState({site});
  },
	
	render(){
    
    const {
      site,
    } = this.state;
    
    if(!site) return null;
    
		return (
      <Tabs>
        <Tab label="Settings" >
          <Form 
            value={site}
            onChange={site => this.setState({site})}
            schema={Site.Schema}
            onSubmit={this._handleSubmit}
            >
            <Field name='title' floatingLabelText='Site Title' component={TextField} fullWidth/>
            <Field name='facebook.active' label='Facebook Login' component={Toggle}/>
            <Field name='google.active' label='Google Login' component={Toggle}/>
            <TextField type='submit' fullWidth/>
          </Form> 
        </Tab>
        <Tab label="Colors" >
          <PaletteManager schema={Site.PaletteSchema} colors={site.theme.palette} onChange={this._handlePaletteChange} />
        </Tab>
      </Tabs>
    )
	},
  
  _handlePaletteChange(palette){
    const {
      site,
    } = this.props;
    Collection.update(site._id, {$set:{'theme.palette': palette}})
  },
  
  _handleSubmit(site){
    const {
      _id
    }= site;
    delete site._id;
    Collection.update(_id, {$set:{... site}})
  },
  
});
