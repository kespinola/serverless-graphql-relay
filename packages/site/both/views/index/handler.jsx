const {
  Collection,
} = Site;

Site.Handlers.Index = React.createClass({

  mixins:[ReactMeteorData],

  getMeteorData() {
    const handler = Meteor.subscribe('sites');

    return {
      sites: Collection.find({}).fetch(),
      site: Collection.findOne({domain: Meteor.settings.public.domain}) || {},
    };
  },

  render(){
    const {
      site,
      sites,
      } = this.data;
    return React.cloneElement(this.props.children, {site, sites})
  }
});
