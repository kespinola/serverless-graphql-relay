/* global React, MUI, AutoForm, Site SimpleSchema, Theme */
const { PropTypes } = React;

const { Tabs, Tab, TextField } = MUI;

const { Form, Field, Toggle } = AutoForm;

const { Collection } = Site;

const { Components: ThemeComponents } = Theme;

const { Styles } = MUI;

const { Colors } = Styles;

const { PaletteManager } = ThemeComponents;

Site.Handlers.Settings = React.createClass({

  propTypes: {
    site: PropTypes.object,
  },

  _onPaletteChange(palette) {
    const {
      site,
    } = this.props;

    Collection.update(site._id, {$set: {'theme.palette': palette}});
  },

  _onSubmit(site) {
    const { _id } = site;
    delete site._id;
    Collection.update(_id, {$set: {... site}});
  },

  render() {
    const { site } = this.props;

    if (!site) return null;

    const { theme } = site;

    if (!theme) return null;

    const { palette } = theme;

    return (
      <Tabs>
        <Tab label="Settings" >
          <Form
            autoSave
            value={site}
            schema={Site.Schema}
            onSubmit={this._onSubmit}
            >
            <Field name="title" floatingLabelText="Site Title" component={TextField} fullWidth/>
            <Field name="facebook.active" label="Facebook Login" component={Toggle}/>
            <Field name="google.active" label="Google Login" component={Toggle}/>
          </Form>
        </Tab>
        <Tab label="Colors">
          <PaletteManager schema={Site.PaletteSchema} colors={palette} options={Colors} onChange={this._onPaletteChange} />
        </Tab>
      </Tabs>
    );
  },

});
