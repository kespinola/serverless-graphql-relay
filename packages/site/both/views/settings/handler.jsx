const {
  Tabs,
  Tab,
} = MUI;

const {
  Form,
  Field,
} = AutoForm;


Site.Handlers.Settings = React.createClass({
  
  mixins:[ReactMeteorData],
  
	propTypes: {},
	
	getDefaultProps(){
		return {}
	},
  
  getMeteorData(){
    const id = Meteor.userId();
    return {
      site: Site.Collection.findOne({owner: id})
    }
  },
  
  getInitialState(){
    return {
      settings: {},
      theme: {},
    }
  },
	
	render(){
    const {
      settings,
      theme,
    } = this.state;
		return (
      <Tabs>
        <Tab label="Settings" >
          <Form 
            value={settings}>
          </Form> 
        </Tab>
        <Tab label="Theme" >
          (Theme content...)
        </Tab>
      </Tabs>
    )
	},
  
});
