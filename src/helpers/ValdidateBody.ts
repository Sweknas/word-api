import CustomError from './CustomError';

interface ISchema {
  [key: string]: {
    required: boolean;
    type: string[];
  };
}

export default function validateBody(body: any, schema: ISchema) {
  for (const [key, value] of Object.entries(schema)) {
    if (value.required && !body[key]) {
      throw new CustomError(`Missing ${key} in body of request`, 400);
    }

    if (!value.required && !body[key]) {
      continue;
    }

    if (value.type && !value.type.includes(typeof body[key])) {
      throw new CustomError(`Body parameter ${key} should be a ${value.type.join(' or ')}`, 400);
    }
  }

  return body;
}
