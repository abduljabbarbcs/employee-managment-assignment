import Color from 'color';

/**
 * Convert a hex color to an rgba with alpha
 */
export const rgba = (hexColor: string, alpha: number) =>
  Color(hexColor)
    .alpha(alpha)
    .rgb()
    .string();

/**
 * Shortcut for shades of white
 */
export const shade = (alpha: number) => rgba(colors.white, alpha);

/**
 * Don't use these directly, add them to the theme object with a semantic meaning (e.g. button.danger is brightred).
 */
const colors = {
  white: '#ffffff',
  highlight: '#535d6b',
  lightest: '#4C5767',
  lighter: '#3b4859',
  light: '#39475a',
  medium: '#344050',
  gray: '#d0d2d6',
  dark: '#2c394a',
  darkest: '#1f2d3e',
  black: '#172233',
  bluegray: '#8194a2',
  green: '#00a887',
  red: '#cb4f7f',
  brightred: '#ea5b5b',
  yellow: '#febe10',
};

export const theme = {
  brand: colors.green,

  page: {
    background: colors.darkest,
    text: colors.white,
    emphasizedText: colors.yellow,
    subtleText: '#aeb3b9',
    mutedText: '#bebebe',
    titlebar: colors.dark,
  },

  panel: {
    background: colors.dark,
  },

  scroll: {
    onLight: {
      track: '#8e959e',
      thumb: colors.dark,
    },
    onDark: {
      track: shade(0.25),
      thumb: shade(0.5),
    },
  },

  subtitleBar: '#233242',

  modal: {
    background: colors.dark,
    header: colors.light,

    button: {
      background: colors.lighter,
      hover: colors.highlight,
    },
  },

  button: {
    default: colors.bluegray,
    primary: colors.green,
    danger: colors.brightred,
  },

  checkbox: {
    default: shade(0.8),
    hovered: colors.white,
    checked: colors.green,
  },

  input: {
    light: {
      background: '#fdfdfd',
      border: '#d9d9d9',
      text: colors.black,
      placeholder: '#898f97',
    },
    dark: {
      background: '#394555',
      border: 'rgba(0, 0, 0, 0.15)',
      text: colors.white,
      placeholder: colors.white,
    },
  },

  label: {
    dark: '#95989a',
    light: '#d2d5d8',
  },

  popover: {
    hover: colors.gray,
    light: {
      color: colors.black,
    },
    dark: {
      background: colors.light,
    },
  },

  actionsDropdown: {
    title: colors.black,
    description: '#6e757f',
  },


  table: {
    header: {
      background: colors.light,
      text: '#e6e6e6',
      muted: '#a3a3a3',
    },
    background: colors.dark,
    bevelLight: colors.lightest,
    bevelShadow: colors.darkest,
    odd: '#303d4e',
    even: colors.dark,
    selected: '#536072',
    hover: colors.light,
    sort: colors.green,
  },

  tooltip: {
    light: '#fdfdfd',
    dark: '#121a26',
  },

  architectureDiagram: {
    arrow: colors.white,
    background: colors.dark,
    light: '#6f7883',
    dark: '#505c68',
    target: colors.green,
    header: colors.yellow,
  },
    badge: colors.green
};
