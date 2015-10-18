const {
  Tabs,
  Tab,
} = MUI;

const {
  Form,
  Field,
  Toggle,
} = AutoForm;

SettingSchema = new SimpleSchema({
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
    
		return (
      <Tabs>
        <Tab label="Settings" >
          <Form 
            value={site}
            onChange={site => this.setState({site})}
            schema={SettingSchema}
            onSubmit={this._handleSubmit}
            >
            <Field name='facebook.active' label='Facebook Login' component={Toggle} />
            <Field name='google.active' label='Google Login' component={Toggle} />
          </Form> 
        </Tab>
        <Tab label="Theme" >
          (Theme content...)
        </Tab>
      </Tabs>
    )
	},
  
  _handleSubmit(site){
    Site.Collection.update(site._id, {$set:{... site}})
  },
  
});
