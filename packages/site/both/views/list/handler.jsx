const {
  Tabs,
  Tab,
} = MUI;

const {
  Form,
  Field,
} = AutoForm;

Site.Handlers.List = React.createClass({

	propTypes: {},
	
	getDefaultProps(){
		return {}
	},
	
	render(){
		return (
      <Tabs>
        <Tab label="Settings" >
          (Tab content...)
        </Tab>
        <Tab label="Theme" >
          (Theme content...)
        </Tab>
      </Tabs>
    )
	},
  
});
