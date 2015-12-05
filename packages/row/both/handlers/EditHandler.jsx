/* global React, MUI, AutoForm, Row, ReactMeteorData, Meteor */

const { Tabs, Tab, Slider } = MUI;
const { Form, Field, Toggle } = AutoForm;

Row.Handlers.Edit = React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
  },

  _onSubmitGrid(_id, grid) {
    Meteor.call('updateRow', _id, { grid });
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
            schema={Row.Schema.Grid}
            onSubmit={this._onSubmitGrid.bind(null, _id)}
            >
            <Field
              fullWidth
              name="centerXs"
              component={Toggle}
              label="Center Exta Small"
            />
            <Field
              fullWidth
              name="centerSm"
              component={Toggle}
              label="Center Small"
            />
            <Field
              fullWidth
              name="centerMd"
              component={Toggle}
              label="Center Medium"
            />
            <Field
              fullWidth
              name="centerLg"
              component={Toggle}
              label="Center Large"
            />
          </Form>
        </Tab>
        <Tab label="Content"></Tab>
        <Tab label="Styles"></Tab>
      </Tabs>
    );
  },
});
