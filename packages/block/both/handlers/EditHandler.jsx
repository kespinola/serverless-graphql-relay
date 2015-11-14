/* global React, MUI, AutoForm, Block */

const { Tabs, Tab, Slider } = MUI;
const { Form, Field } = AutoForm;

Block.Handlers.Edit = React.createClass({
  _onSubmitGrid(grid) {

  },

  render() {
    return (
      <Tabs>
        <Tab label="Grid">
          <Form
            autoSave
            value={null}
            onChange={null}
            schema={null}
            onSubmit={null}
            >
            <Field name="title" component={Slider} fullWidth/>
          </Form>
        </Tab>
        <Tab label="Content"></Tab>
      </Tabs>
    );
  },
});
