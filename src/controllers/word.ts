import validateBody from '../helpers/ValdidateBody';
import WordService from '../services/word';

const countFrequency = (body: any) => {
  // validate and type check body
  const { text, count, caseSensitive } = validateBody(body, {
    text: { required: true, type: ['string'] },
    count: { required: false, type: ['number'] },
    caseSensitive: { required: false, type: ['boolean'] },
  }) as { text: string; count?: number; caseSensitive?: boolean };

  const result = new WordService(text, count, caseSensitive).countFrequency();
  return result;
};

export default { countFrequency };
