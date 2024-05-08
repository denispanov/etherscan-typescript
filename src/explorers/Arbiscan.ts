import Explorer from '../Explorer';

export default class Arbiscan extends Explorer {
  constructor(apiKey: string) {
    super(apiKey, 'https://api.arbiscan.io/api');
  }
}
