export const browserStackCaps = [
  // Windows Chrome // working
  {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'bstack:options': {
      os: 'Windows',
      osVersion: '11',
      buildName: 'DrasticCoder RUN',
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
      buildName: 'DrasticCoder RUN',
      sessionName: 'Mac Safari',
    },
  },

  // Windows Firefox //timeout
  {
    browserName: 'Firefox',
    browserVersion: 'latest',
    'bstack:options': {
      os: 'Windows',
      osVersion: '11',
      buildName: 'DrasticCoder RUN',
      sessionName: 'Windows Firefox',
    },
  },

      // iPhone 14 //stuck at cookie accept screen
      {
        browserName: 'Safari',
        'bstack:options': {
          osVersion: '26',
          deviceOrientation: 'portrait',
      deviceName: 'iPhone 15',
      buildName: 'DrasticCoder RUN',
      sessionName: 'iPhone 15',
    },
  },

  // Samsung Galaxy S23 //stuck
  {
    browserName: 'Chrome',
    'bstack:options': {
      osVersion: '13.0',
      deviceOrientation: 'portrait',
      deviceName: 'Samsung Galaxy S23',
      buildName: 'DrasticCoder RUN',
      sessionName: 'Galaxy S23',
    },
  },
];
