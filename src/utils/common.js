
/* Function to shuffle an array using the Shuffle algorithm */
export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

/* Function to build a URL with query parameters */
export const buildUrl = (url, params) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? '?' : '&';
    urlWithParams += `${sign}${key}=${value}`;
  });

  return urlWithParams;
};

/* Function to calculate the sum of an array of numbers */
export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);
