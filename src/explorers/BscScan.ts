import Explorer from '../Explorer';

export default class BscScan extends Explorer {
  constructor(apiKey: string) {
    super(apiKey, 'https://api.bscscan.com/api', true, false);
  }
}
