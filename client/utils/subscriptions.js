import { Meteor } from 'meteor/meteor';
import { reduceRight } from 'ramda';

export const getCollection = (subscription, Collection) => () => {
  Meteor.subscribe(subscription);
  return { [subscription]: Collection.find({ }).fetch() };
};
