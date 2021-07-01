import convert from 'https://cdn.skypack.dev/color-convert';

const HUE_RANGE = [100, 300]; // The full range 0-360
const ANGLE_RANGE = [-300, 300];
const GRADIENTS = 15;

export const random = (from, to) => Math.floor(Math.random() * (to - from) + from);

const generateRandomGradients = () => {
    const backgrounds = [];
    for (let i = 0; i < GRADIENTS; i++) {
        const a = random(10, 50);
        const b = random(a, a + 10);
        const color = `rgba(${convert.hsv.rgb(random(HUE_RANGE[0], HUE_RANGE[1]),70,80)}, ${random(2, 6) / 10})`;
        backgrounds.push(
            `linear-gradient(`+
                `calc(var(--rotate) * ${random(ANGLE_RANGE[0], ANGLE_RANGE[1])}), `+
                `transparent ${a-10}%, `+
                `${color} ${a}%, `+
                `${b}%, `+
                `rgba(0,0,0,0.5) ${b+0.1}%, `+
                `transparent ${b+10}%`+
            `)`
        );
    }
    return backgrounds.join(',');
};

document.body.style.background = generateRandomGradients();

document.getElementById('button').addEventListener('click', () => {
  document.body.style.background = generateRandomGradients();
});


snowplow('newTracker', 'sp', '{{https://com-snowplowanalytics-dev1.mini.snplow.net}}', {
    appId: 'my-app-id',
    platform: 'web',
    cookieDomain: null,
    discoverRootDomain: true,
    cookieName: '_sp_',
    cookieSameSite: 'None',
    cookieSecure: true,
    encodeBase64: true,
    respectDoNotTrack: false,
    pageUnloadTimer: 500,
    forceSecureTracker: false,
    eventMethod: 'post',
    bufferSize: 1,
    maxPostBytes: 40000,
    postPath: '/custom/path',
    crossDomainLinker: function (linkElement) {
      return (linkElement.href === 'http://acme.de' || linkElement.id === 'crossDomainLink');
    },
    cookieLifetime: 63072000,
    stateStorageStrategy: 'cookieAndLocalStorage',
    maxLocalStorageQueueSize: 1000,
    resetActivityTrackingOnPageView: true,
    connectionTimeout: 5000, // Available from 2.15.0
    skippedBrowserFeatures: [], // Available from 2.15.0
    anonymousTracking: false, // Available from 2.15.0
    // anonymousTracking: { withSessionTracking: true } // Available from 2.15.0
    // anonymousTracking: { withSessionTracking: true, withServerAnonymisation: true } // Available from 2.17.0
    contexts: {
      webPage: true,
      performanceTiming: true,
      gaCookies: true,
      geolocation: false,
      clientHints: true, // Available from 2.15.0
      // clientHints: { includeHighEntropy: true } // Optional
    }
  });