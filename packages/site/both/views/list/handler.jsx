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

const CreateSiteSchema = new SimpleSchema({
  
  domain: {
    type: String,
  },
  
  owners: {
    type: [String],
  },
  
});

Role.Handlers.List = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState(){
    return {
      site: {},
    }
  },

  getMeteorData(){

    const handler = Meteor.subscribe('sites');

    return {
      sites: Site.Collection.find({}).fetch(),
    }

  },

  render(){

    const {
      sites,
      } = this.data;

    const {
      site,
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
                <TableHeaderColumn tooltip='Site Domain'>Domain</TableHeaderColumn>
                <TableHeaderColumn tooltip='Create a new site'>
                  <RaisedButton
                    label='Create'
                    onTouchTap={this._handleButtonTap}
                    />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map(({domain, _id}) => {
                return (
                  <TableRow key={_id}>
                    <TableRowColumn>{_id}</TableRowColumn>
                    <TableRowColumn>{domain}</TableRowColumn>
                    <TableRowColumn>
                      <IconButton
                        tooltip="Delete site"
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
          <Dialog ref='dialog' title='Create a new site'>
            <Form value={site} onChange={site => this.setState({site})} schema={CreateSiteSchema} onSubmit={this._handleSubmit}>
              <Field name='domain' component={TextField} floatingLabelText='Name' fullWidth />
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
    this.setState({site:{}}, this.refs.dialog.show);
  },

  _handleSubmit(site){
    this.setState({site:{}}, () => {
      Site.Collection.insert(site);
      this.refs.dialog.dismiss();
    });
  },

});
