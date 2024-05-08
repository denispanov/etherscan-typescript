import Explorer from '../Explorer';

export default class Etherscan extends Explorer {
  constructor(apiKey: string) {
    super(apiKey, 'https://api.etherscan.io/api');
  }
}
