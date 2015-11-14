/* global Meteor, Site, ReactMeteorData, React */

const {
  Collection,
} = Site;

Site.Handlers.Index = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    const domain = Meteor.settings.public.domain;
    const handler = Meteor.subscribe('siteByDomain', domain);
    return {
      siteReady: handler.ready(),
      site: Collection.findOne({domain}) || {},
    };
  },

  render() {
    const { site, sites } = this.data;
    return React.cloneElement(this.props.children, { site, sites })
  },
});
