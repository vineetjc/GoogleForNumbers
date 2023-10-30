import {GENERIC_ERROR_OBJECT} from '../util/constants';

/**
 * Numbers API: http://numbersapi.com
 *
 * @param query - integer or 'random' or mm/dd format date (type has to be date)
 * @param type - optional; 'trivia' or 'math' or 'date' or 'year' (default: 'trivia')
 *
 * @returns JSON object with the following:
 * text: A string of the fact text itself.
 * found: Boolean of whether there was a fact for the requested number.
 * number: The floating-point number that the fact pertains to. This may be useful for, eg. a /random request or notfound=floor. For a date fact, this is the 1-indexed day of a leap year (eg. 61 would be March 1st).
 * type: String of the category of the returned fact.
 * date (sometimes): A day of year associated with some year facts, as a string.
 * year (sometimes): A year associated with some date facts, as a string.
 */

export const getNumberInfoAPI = async (query, type) => {
  try {
    let url = `http://numbersapi.com/${query}/${type}?json`;
    if (query === 'random') {
      url = url + '&notfound=floor';
    }
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return GENERIC_ERROR_OBJECT;
  }
};
