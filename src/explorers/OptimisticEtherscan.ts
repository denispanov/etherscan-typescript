import Explorer from '../Explorer';

export default class OptimisticEtherscan extends Explorer {
  constructor(apiKey: string) {
    super(apiKey, 'https://api-optimistic.etherscan.io/api', false, false);
  }
}
