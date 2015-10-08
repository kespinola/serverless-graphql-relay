const {
  Card,
  RaisedButton,
  TextField,
  } = MUI;

const {
  Row,
  Col,
  } = Flexgrid;

const {
  Form,
  Field,
  } = AutoForm;

const {
  History,
  } = ReactRouter;

User.Handlers.Session = React.createClass({

  mixins: [History],
  
  render(){
    return (
      <Row centerXs>
        <Col xs={10} sm={6}>
          <UserSessionForm title='Login' onSubmit={this._handleSubmit}/>
        </Col>
      </Row>
    )
  },
  
  _handleSubmit({email, password}){
    Meteor.loginWithPassword(email, password, (err) => {
      if(err) throw Meteor.Error(err);
      this.history.pushState(null, '/account')
    })
  }

});
