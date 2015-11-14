/* global React, MUI, AutoForm, Block, ReactMeteorData */

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
            value={{}}
            onChange={null}
            schema={Block.Schema.Grid}
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
