const {
  Card,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableFooter,
  Dialog,
  TextField,
  IconButton,
  FlatButton,
  RaisedButton,
  TableRowColumn,
  TableHeaderColumn,
  FontIcon,
} = MUI;

const {
  Form,
  Field,
} = AutoForm;

const {
  Row,
  Col,
} = Flexgrid;

const {
  find,
  clone,
} = R;

Role.Handlers.List = React.createClass({

  mixins: [ReactMeteorData],
  
  getInitialState(){
    return {
      role: {},
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
      roles,
    } = this.data;
    
    const {
      role,
    } = this.state;
    
    return (
      <Row>
        <Col xs={12}>
          <Table
            selectable={false}
            multiSelectable={false}
            >
            <TableHeader enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
                <TableHeaderColumn tooltip='Role Name'>Role</TableHeaderColumn>
                <TableHeaderColumn tooltip='Create a new role'>
                  <RaisedButton 
                    label='Create' 
                    onTouchTap={this._handleButtonTap}
                    />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(({name, _id}) => {
                return (
                  <TableRow key={_id}>
                    <TableRowColumn>{_id}</TableRowColumn>
                    <TableRowColumn>{name}</TableRowColumn>
                    <TableRowColumn>
                      <IconButton
                        tooltip="Delete role"
                        tooltipPosition='bottom-right'
                        touch={false}
                        onTouchTap={this._handleEditTap.bind(null, name)}>
                        <FontIcon className="material-icons">clear</FontIcon>
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Dialog ref='dialog' title='Create a new role'>
            <Form value={role} onChange={role => this.setState({role})} schema={Role.Schema} onSubmit={this._handleSubmit}>
              <Field name='name' component={TextField} floatingLabelText='Name' fullWidth />
              <TextField type='submit' fullWidth/>
            </Form>
          </Dialog>
        </Col>
      </Row>
    )
  },
  
  _handleEditTap(name){
    Roles.deleteRole(name);
  },
  
  _handleButtonTap(){
    this.setState({role:{}}, this.refs.dialog.show);
  },
  
  _handleSubmit({name, _id}){
    this.setState({role:{}}, () => {
      Roles.createRole(name);
      this.refs.dialog.dismiss();
    });
  },
  
});
