import { DEBOUNCE_DELAY_DEFAULT } from './data';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueIdsGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    if (previousValues.length >= max - min + 1) {
      return null;
    }
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

function numDecline(num, nominative, genitiveSingular, genitivePlural) {
  if (num % 10 === 0 || (num % 100 > 4 && num % 100 > 21)) {
    return genitivePlural;
  }
  return num % 10 === 1 ? nominative : genitiveSingular;
}

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY_DEFAULT) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  numDecline,
  getRandomInteger,
  createUniqueIdsGenerator,
  getRandomArrayElement,
  isEscapeKey,
  debounce,
  DEBOUNCE_DELAY_DEFAULT,
};
