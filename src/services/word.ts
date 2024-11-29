import CustomError from '../helpers/CustomError';

export default class WordService {
  text: string;
  count: number;
  caseSensitive: boolean;

  constructor(text: string, count?: number, caseSensitive?: boolean) {
    this.text = text;
    this.count = count || 10;
    this.caseSensitive = caseSensitive || false;
  }

  removeNonAlphaNumeric(str: string) {
    return str.replace(/[^\p{L}\d]/gu, '');
  }

  countFrequency() {
    // make all words lowercase if caseSensitive is false
    const words = this.caseSensitive ? this.text.split(' ') : this.text.toLowerCase().split(' ');

    // count instance of each word
    const wordCount = words.reduce((acc: any, word: string) => {
      const cleanWord = this.removeNonAlphaNumeric(word);
      if (cleanWord.length > 0) {
        if (acc[cleanWord]) {
          acc[cleanWord] += 1;
        } else {
          acc[cleanWord] = 1;
        }
      }
      return acc;
    }, {});

    const topWordsArray = Object.entries(wordCount)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, this.count);

    const topWordsObject = topWordsArray.reduce((acc: any, word: any) => {
      acc[word[0]] = word[1];
      return acc;
    }, {});

    return {
      topWords: topWordsObject,
      totalWords: Object.keys(wordCount).length,
    };
  }
}
