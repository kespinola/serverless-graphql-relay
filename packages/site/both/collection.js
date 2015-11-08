const { compose } = R;
const { Styles } = MUI;
const { Colors, Spacing } = Styles;

Site.Collection = new Mongo.Collection('sites');

const SpacingSchema = new SimpleSchema({
  iconSize: {
    type: Number,
    defaultValue: Spacing.iconSize,
    label: 'Icon Size',
  },
  desktopGutter: {
    type: Number,
    defaultValue: Spacing.desktopGutter,
    label: 'Desktop Gutter',
  },
  desktopGutterMore: {
    type: Number,
    defaultValue: Spacing.desktopGutterMore,
    label: 'Desktop GUtter More',
  },
  desktopGutterLess: {
    type: Number,
    defaultValue: Spacing.desktopGutterLess,
    label: 'Desktop Gutter Less',
  },
  desktopGutterMini: {
    type: Number,
    defaultValue: Spacing.desktopGutterMini,
    label: 'Desktop Gutter Mini',
  },
  desktopKeylineIncrement: {
    type: Number,
    defaultValue: Spacing.desktopKeylineIncrement,
    label: 'Desktop Keyline Increment',
  },
  desktopDropDownMenuItemHeight: {
    type: Number,
    defaultValue: Spacing.desktopDropDownMenuItemHeight,
    label: 'Desktop DropDown Menu Item Height',
  },
  desktopDropDownMenuFontSize: {
    type: Number,
    defaultValue: Spacing.desktopDropDownMenuFontSize,
    label: 'Desktop DropDown Menu Font Size',
  },
  desktopLeftNavMenuItemHeight: {
    type: Number,
    defaultValue: Spacing.desktopLeftNavMenuItemHeight,
    label: 'Desktop Left Nav Menu Item Height',
  },
  desktopSubheaderHeight: {
    type: Number,
    defaultValue: Spacing.desktopSubheaderHeight,
    label: 'Desktop Subheader Height',
  },
  desktopToolbarHeight: {
    type: Number,
    defaultValue: Spacing.desktopToolbarHeight,
    label: 'Desktop Toolbar Height',
  },
});

Site.PaletteSchema = new SimpleSchema({
  primary1Color: {
    type: String,
    defaultValue: Colors.cyan700,
    label: 'Primary Color',
  },
  primary2Color: {
    type: String,
    defaultValue: Colors.cyan500,
    label: 'Secondary Color',
  },
  primary3Color: {
    type: String,
    defaultValue: Colors.lightBlack,
    label: 'Tertiary Color',
  },
  accent1Color: {
    type: String,
    defaultValue: Colors.pinkA200,
    label: 'Primary Accent Color',
  },
  accent2Color: {
    type: String,
    defaultValue: Colors.grey100,
    label: 'Secondary Accent Color'
  },
  accent3Color: {
    type: String,
    defaultValue: Colors.grey500,
    label: 'Tertiary Accent Color',
  },
  textColor: {
    type: String,
    defaultValue: Colors.darkBlack,
    label: 'Text Color',
  },
  alternateTextColor: {
    type: String,
    defaultValue: Colors.white,
    label: 'Alternate Text Color',
  },
  canvasColor: {
    type: String,
    defaultValue: Colors.white,
    label: 'Canvas Color',
  },
  borderColor: {
    type: String,
    defaultValue: Colors.grey300,
    label: 'Border Color',
  }
});

const ThemeSchema = new SimpleSchema({

  fontFamily: {
    type: String,
    defaultValue: 'Roboto, sans-serif',
    label: 'Font Family',
  },

  spacing: {
    type: SpacingSchema,
    label: 'Spacing Settings',
  },

  palette: {
    type: Site.PaletteSchema,
    label: 'Site Color Palette',
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

  _id: {
    type: String,
    unique: true,
  },

  domain: {
    type: String,
    index: 1,
    unique: true,
  },

  title: {
    type: String,
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
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});
