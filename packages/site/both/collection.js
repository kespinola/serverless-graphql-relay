const {
  compose,
  } = R;

const {
  Colors,  
} = Theme;

Site.Collection = new Mongo.Collection('sites');

const PaletteSchema = new SimpleSchema({
  primary1Color: {
    type: String,
    defaultValue: Colors.cyan700
  },
  primary2Color: {
    type: String,
    defaultValue: Colors.cyan500, 
  },
  primary3Color: {
    type: String,
    defaultValue: Colors.lightBlack 
  },
  accent1Color: {
    type: String,
    defaultValue: Colors.pinkA200,
  },
  accent2Color: {
    type: String,
    defaultValue: Colors.grey100,
  },
  accent3Color: {
    type: String,
    defaultValue: Colors.grey500,
  },
  textColor: {
    type: String,
    defaultValue: Colors.darkBlack,
  },
  alternateTextColor: {
    type: String,
    defaultValue: Colors.white
  },
  canvasColor: {
    type: String,
    defaultValue: Colors.white,
  },
  borderColor: {
    type: String,
    defaultValue: Colors.grey300,
  }
});

const ThemeSchema = new SimpleSchema({
  fontFamily: {
    type: String,
    defaultValue: 'Roboto, sans-serif', 
  },
  palette: {
    type: PaletteSchema,
  },
});

const LoginServiceSchema = new SimpleSchema({
  
  active: {
    type: Boolean,
    defaultValue: false,
  },
  
  primaryKey: {
    type: String,
    optional: true,
  },
  
  secretKey: {
    type: String,
    optional: true,
  }
  
});

Site.Schema = new SimpleSchema({
  
  domain: {
    type: String,
    index: 1,
    unique: true,
  },
  
  owner: {
    type: String,
    defaultValue: null,
  },
  
  theme: {
    type: ThemeSchema,
  },
  
  facebook: {
    type: LoginServiceSchema,
    optional: true,
  },
  
  google: {
    type: LoginServiceSchema,
    optional: true,
  },
  
});

Site.Collection.attachSchema(Site.Schema);

Site.Collection.allow({
  insert(){
    return true;
  },
  update(){
    return true;
  },
  remove(){
    return true;
  }
});
