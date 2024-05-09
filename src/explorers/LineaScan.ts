import Explorer from '../Explorer';

export default class LineaScan extends Explorer {
  constructor(apiKey: string) {
    super(apiKey, 'https://api.lineascan.build/api', false, false);
  }
}
