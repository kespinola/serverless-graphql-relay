/* global React, MUI, AutoForm, Column, ReactMeteorData, Meteor */

const { Tabs, Tab, Slider } = MUI;
const { Form, Field } = AutoForm;

Column.Handlers.Edit = React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
  },

  _onSubmitGrid(_id, grid) {
    Meteor.call('updateColumn', _id, { grid });
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
            schema={Column.Schema.Grid}
            onSubmit={this._onSubmitGrid.bind(null, _id)}
            >
            <Field
              name="xs"
              component={Slider}
              step={1}
              min={0}
              max={12}
              description="Extra Small Grid"
              mapValue={(e, value) => value} fullWidth
            />
            <Field
              name="sm"
              component={Slider}
              step={1}
              min={0}
              max={12}
              description="Small Grid"
              mapValue={(e, value) => value} fullWidth
            />
            <Field
              name="md"
              component={Slider}
              step={1}
              min={0}
              max={12}
              description="Medium Grid"
              mapValue={(e, value) => value} fullWidth
            />
            <Field
              name="lg"
              component={Slider}
              step={1}
              min={0}
              max={12}
              description="Large Value"
              mapValue={(e, value) => value} fullWidth
            />
          </Form>
        </Tab>
        <Tab label="Content"></Tab>
        <Tab label="Styles"></Tab>
      </Tabs>
    );
  },
});
