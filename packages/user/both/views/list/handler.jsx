const {
  Card, CardHeader, CardText, CardActions, FlatButton, Dialog, Avatar,
  Toggle
} = MUI;

const { Container, Row, Col } = Flexgrid;
const { find, is } = R;

const cardStyles = { marginTop: 20 };

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
      <Container>
        <Row>
          <Col xs={12}>
            {users.map( ({fullName = '', firstName, lastName, parentId}) => {

              const deleteActions = [
                { text: 'Cancel', onTapTouch: this.setState.bind(null, {show: false}) },
                { text: 'Confirm', onTouchTap: this._handleDelete.bind(null, parentId), ref: 'submit' }
              ];
              const dialog = `dialog_${parentId}`;

              return (
                <Card key={parentId} style={cardStyles}>
                  <CardHeader
                    title={`${fullName}`}
                    avatar={<Avatar>{firstName.charAt(0).toUpperCase()}</Avatar>}
                    actAsExpander={true}
                    showExpandableButton={true}/>
                    <CardText expandable={true}>
                      {appRoles.map( ({name}) => {
                        return (
                          <Toggle
                            key={name}
                            defaultToggled={Roles.userIsInRole(parentId, name)}
                            onToggle={this._onToggle.bind(null, parentId, name)}
                            label={name}
                            />
                        )
                      })}
                    </CardText>
                  <CardActions>
                    <FlatButton onClick={() => this.refs[dialog].show()} label="Delete"/>
                  </CardActions>
                  <Dialog
                    title={`Confirm ${fullName} Delete`}
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
      </Container>
    )
  },

  _handleDelete(parentId) {
    Meteor.call('deleteUser', parentId);
  },

  _onToggle(parentId, name, e, toggled) {
    const method = toggled ? 'addUsersToRoles' : 'removeUsersFromRoles';
    Roles[method](parentId, name);
  }
});
