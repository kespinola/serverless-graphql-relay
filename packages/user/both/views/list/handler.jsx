const {
  Card,
  CardHeader,
  CardText,
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
          {users.map( ({_id, profile, roles = []}) => {
            const {
              first_name = '',
              last_name = '',
            } = profile;
            return (
              <Card style={cardStyles}>
                <CardHeader
                  title={`${first_name} ${last_name}`}
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
              </Card>
            ) 
          })}      
        </Col>
      </Row>
    )
  },
  
  _handleToggle(_id, name, e, toggled){
    const method = toggled ? 'addUsersToRoles' : 'removeUsersFromRoles';
    Roles[method](_id, name);
  }
});
