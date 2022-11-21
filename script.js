// ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// configurations
// ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// notification target definition
const TARGET_REGEXP = /(?<![0-9A-Za-z@])[0-9A-Za-z]{6}(?![0-9A-Za-z])/;

// timer settings
const RELOAD_INTERVAL_MS = 10 * 1000;
const NOTIFICATION_TIMEOUT_MS = 20 * 1000;

// scroll (for reloading) settings
const SCROLL_SIZE = 1000;
const SCROLL_BACK_SIZE = -10000;
const SCROLL_BACK_WAIT_MS = 100;

// css selector for twitter
const TWEETS_CONTAINER_SELECTOR = 'section[role=region] > div > div';
const TWEETS_SELECTOR = 'div[data-testid=tweetText]';

// visual notification text definition
const VISUAL_TEXT_CONVERTER = (input) => input.toUpperCase();

// speech notification text definition
const SPEECH_TEXT_CONVERTER = (input) => [...input.toUpperCase()].reduce((r, a) => r + ' ' + a);

// visual notification style
const CARDS_CONTAINER_STYLE = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  width: '500px'
};
const CARD_STYLE = {
  position: 'relative',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100px',
  margin: '10px',
  padding: '5px',
  'text-align': 'center',
  font: 'bold 70px "sans-serif"',
  background: '#FFFF00'
};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

const notify = (() => {
  const container = document.createElement('div');
  Object.assign(container.style, CARDS_CONTAINER_STYLE);
  document.querySelector('body').append(container);
  return (text) => {
    const ssu = new SpeechSynthesisUtterance();
    ssu.text = SPEECH_TEXT_CONVERTER(text);
    speechSynthesis.speak(ssu);
    const card = document.createElement('div');
    card.innerText = VISUAL_TEXT_CONVERTER(text);
    Object.assign(card.style, CARD_STYLE);
    container.append(card);
    setTimeout(() => card.remove(), NOTIFICATION_TIMEOUT_MS);
  };
})();

const tweetsContainer = document.querySelector(TWEETS_CONTAINER_SELECTOR);
const extract = () => {
  const result = [];
  const tweets = tweetsContainer.querySelectorAll(TWEETS_SELECTOR);
  for (const tweet of tweets) {
    if (!tweet.innerText)
      continue;
    const text = tweet.innerText.normalize('NFKC');
    const m = text.match(TARGET_REGEXP);
    if (!!m)
      result.push(m[0]);
  }
  return result;
}

const read = {};
extract().forEach(code => read[code] = true);

const observer = new MutationObserver((_) => {
  extract().filter(code => !read[code]).forEach(code => {
    notify(code);
    read[code] = true;
  });
});
observer.observe(tweetsContainer, { childList: true });

setInterval(() => {
  scrollBy(0, SCROLL_SIZE);
  setTimeout(() => {
    scrollBy(0, SCROLL_BACK_SIZE);
  }, SCROLL_BACK_WAIT_MS);
}, RELOAD_INTERVAL_MS);
