/* global React, MUI, AutoForm, Block, ReactMeteorData, Meteor */

const { Tabs, Tab, Slider } = MUI;
const { Form, Field } = AutoForm;

Block.Handlers.Edit = React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
  },

  _onSubmitGrid(_id, grid) {
    Meteor.call('updateBlock', _id, { grid });
  },

  render() {
    const {
      doc: { grid, _id } = {},
    } = this.props;
    return (
      <Tabs>
        <Tab label="Grid">
          <Form
            autoSave
            value={grid}
            schema={Block.Schema.Grid}
            onSubmit={this._onSubmitGrid.bind(null, _id)}
            >
            <label>Small Grid Width
              <Field name="xs" component={Slider} step={1} min={0} max={12} mapValue={(e, value) => value} fullWidth/>
            </label>
          </Form>
        </Tab>
        <Tab label="Content"></Tab>
      </Tabs>
    );
  },
});
