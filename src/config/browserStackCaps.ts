export const browserStackCaps = [
  // Windows Chrome // working
  {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'bstack:options': {
      os: 'Windows',
      osVersion: '11',
      buildName: 'DrasticCoder <> ElPais',
      sessionName: 'Windows Chrome',
    },
  },

  // macOS Safari //working
  {
    browserName: 'Safari',
    browserVersion: 'latest',
    'bstack:options': {
      os: 'OS X',
      osVersion: 'Ventura',
      buildName: 'DrasticCoder <> ElPais',
      sessionName: 'Mac Safari',
    },
  },

  // // Windows Firefox //timeout
  // {
  //   browserName: 'Firefox',
  //   browserVersion: 'latest',
  //   'bstack:options': {
  //     os: 'Windows',
  //     osVersion: '11',
  //     buildName: 'ElPais',
  //     sessionName: 'Windows Firefox',
  //   },
  // },

  // // iPhone 14 //stuck at cookie accept screen
  // {
  //   browserName: 'Safari',
  //   'bstack:options': {
  //     osVersion: '16',
  //     deviceName: 'iPhone 14',
  //     realMobile: true,
  //     buildName: 'ElPais',
  //     sessionName: 'iPhone 14',
  //   },
  // },

  // // Samsung Galaxy S23 //stuck
  // {
  //   browserName: 'Chrome',
  //   'bstack:options': {
  //     osVersion: '13.0',
  //     deviceName: 'Samsung Galaxy S23',
  //     realMobile: true,
  //     buildName: 'ElPais',
  //     sessionName: 'Galaxy S23',
  //   },
  // },
];
