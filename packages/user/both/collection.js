const {
  compose,
} = R;

function generateFullName(doc){
  if(!doc) return doc;

  let {
    profile,
  } = doc;

  if(!profile) return doc;

  const {
    first_name,
    last_name,
  } = profile;

  doc.full_name = `${first_name}${last_name ? ` ${last_name}` : ''}`;

  return doc;
}

Meteor.users.after.insert((userId, doc) => {
  compose(
    generateFullName
  )(doc);
});

Meteor.users.after.update((userId, doc) => {
  compose(
    generateFullName
  )(doc);
  console.log(doc, 'after update');
});

