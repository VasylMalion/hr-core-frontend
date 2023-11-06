const pxToRem = (px, base = 16) => `${px / base}rem`

const colors = {
  'red': '#FF5630',
  'green': '#38CB89',
  'yellow': '#FFA600',
  'blueLight': '#56CCF2',
  'blue': '#377DFF',
  'purple': '#3C005A',
  'white': '#FFF',
  'purpleLight': '#F5F6FA',
  'strock': '#F0F0F0',
  'grayLight': '#C4C4C4',
  'transparent': 'transparent',
  "black": "#000000",
  "dark": {
    "100": "#2E2F45",
    "200": "#222338",
    "300": "#201C34",
  },
  'gray': {
    '100': '#FAFBFC',
    '200': '#EFEFEF',
    '300': '#091e4214',
    '400': '#787878',
    '500': '#6F767E',
    '600': '#333333',
  },
}

module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  darkMode: ['class'],

  theme: {
    colors: colors,
    extend: {
      keyframes: {
        load: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          },
        },
          pageLoader: {
            '0%': {
              top: '1.5rem',
              height: '12rem',
            },
            '50%': {
              top: '4.5rem',
              height: '6rem',
            },
            '100%': {
              top: '4.5rem',
              height: '6rem',
            },
          },
          pageLoaderMobile: {
            '0%': {
              top: '1rem',
              height: '8rem',
            },
            '50%': {
              top: '3rem',
              height: '4rem',
            },
            '100%': {
              top: '3rem',
              height: '4rem',
            },
          }
      },
      animation: {
        'loading': 'load 1s linear infinite',
        'loader': 'pageLoader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite',
        'loaderMobile': 'pageLoaderMobile 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite',
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
      fonts: {
        ceraProLight: [
          'CeraProLight',
          'sans-serif',
        ],
        ceraProMedium: [
          'CeraProMedium',
          'sans-serif',
        ],
        ceraProBold: [
          'CeraProBold',
          'sans-serif',
        ],
        sans: [
          'Roboto',
          'sans-serif',
        ],
      },
      textSizes: {
        'xs': pxToRem(12),
        'sm': pxToRem(14),
        base: pxToRem(16),
        'lg': pxToRem(18),
        'xl': pxToRem(20),
        '2xl': pxToRem(24),
        '3xl': pxToRem(30),
        '4xl': pxToRem(36),
        '5xl': pxToRem(48),
      },
      backgroundColors: colors,
      borderWidths: {
        '3': '0.1875rem',
      },
      borderColors: global.Object.assign({
        default: 'currentColor',
      }, colors),
      width: {
        'contentMax': 'calc(100vw - 4rem)',
        'content': 'calc(100vw - 16rem)',
        'navbar': '16.25rem',
      },
      height: {
        'content': 'calc(100vh - 5rem)',
      },
      minHeight: {
        'content': 'calc(100vh - 5rem)',
        'medium': '30rem',
      },
      maxWidth: {
        'large': '50rem',
        'medium': '30rem',
      },
      gridTemplateColumns: {
        'row': 'repeat(auto-fit, minmax(18.75rem, 1fr))',
      },
      svgFill: {
        current: 'currentColor',
      },
      svgStroke: {
        current: 'currentColor',
      },
    },
  },

  modules: {
    appearance: ['responsive'],
    backgroundAttachment: false,
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    borderCollapse: [],
    borderColors: [],
    borderRadius: false,
    borderStyle: false,
    cursor: [],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: false,
    fonts: [],
    fontWeights: [],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    objectFit: false,
    objectPosition: false,
    opacity: [],
    outline: ['focus'],
    overflow: [],
    padding: ['responsive'],
    pointerEvents: [],
    position: ['responsive'],
    resize: false,
    shadows: false,
    svgFill: [],
    svgStroke: [],
    tableLayout: false,
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover'],
    textSizes: ['responsive'],
    textStyle: [],
    tracking: false,
    userSelect: false,
    verticalAlign: false,
    visibility: false,
    whitespace: [],
    width: ['responsive'],
    zIndex: [],
  },

  plugins: [
    require("tailwindcss-animation-delay")
  ],

  options: {
    prefix: '',
    important: false,
    separator: ':',
  },
}