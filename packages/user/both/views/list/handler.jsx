const {
  Card,
  CardHeader,
  CardText,
  CardActions,
  FlatButton,
  Dialog,
  Avatar,
  Toggle,
} = MUI;

const {
  Row,
  Col,
} = Flexgrid;

const {
  find,
  is,
} = R;


const cardStyles = {
  marginTop: 20
};

User.Handlers.List = React.createClass({
  
  mixins:[ReactMeteorData],
  
  getInitialState(){
    return {
      show: false,
    }
  },
  
  getMeteorData(){
    const handler = Meteor.subscribe('roles');
    
    return {
      roles: Meteor.roles.find({}).fetch(),
    }
  },
  
  render(){
    const {
      users,
    } = this.props;
    
    const {
      roles: appRoles,  
    } = this.data;
    return (
      <Row>
        <Col xs={12}>
          {users.map( ({_id, profile = {}, roles = []}) => {
            const {
              full_name = '',
              first_name = ''
            } = profile;
            
            const deleteActions = [
              { text: 'Cancel', onTapTouch: this.setState.bind(null, {show: false}) },
              { text: 'Confirm', onTouchTap: this._handleDelete.bind(null, _id), ref: 'submit' }
            ];
            const dialog = `dialog_${_id}`;
            
            return (
              <Card style={cardStyles}>
                <CardHeader
                  title={`${full_name}`}
                  avatar={<Avatar>{first_name.charAt(0).toUpperCase()}</Avatar>}
                  actAsExpander={true}
                  showExpandableButton={true}/>
                  <CardText expandable={true}>
                    {appRoles.map( ({name}) => {
                      return (
                        <Toggle
                          key={name}
                          defaultToggled={is(String, find(role => role === name, roles))}
                          onToggle={this._handleToggle.bind(null, _id, name)}
                          label={name}
                          />
                      )
                    })}
                  </CardText>
                <CardActions>
                  <FlatButton onClick={() => this.refs[dialog].show()} label="Delete"/>
                </CardActions>
                <Dialog
                  title={`Confirm ${full_name} Delete`}
                  actions={deleteActions}
                  ref={dialog}
                  actionFocus="submit"
                  >
                  Are you sure you want to delete user? There is no going back.
                </Dialog>
              </Card>
            ) 
          })}      
        </Col>
      </Row>
    )
  },
  
  _handleDelete(_id){
    Meteor.users.remove({_id});
  },
  
  _handleToggle(_id, name, e, toggled){
    const method = toggled ? 'addUsersToRoles' : 'removeUsersFromRoles';
    Roles[method](_id, name);
  }
});
