import {
  expect, test, describe, beforeAll,
} from 'bun:test';
import Contract from '../../src/contract/Contract';

describe('Contract', () => {
  let contract: Contract;

  beforeAll(() => {
    contract = new Contract(process.env.ETHERSCAN_API_KEY!, 'https://api.etherscan.io/api');
  });

  describe('getContractAbi', () => {
    test('should return the ABI of a contract', async () => {
      const abi = await contract.getContractAbi('0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
      expect(abi).toBeTypeOf('string');
    });
  });

  describe('getContractSourceCode', () => {
    test('should return the source code of a contract', async () => {
      const result = await contract.getContractSourceCode('0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413');
      expect(result).toHaveLength(1);
      const object = result[0];
      expect(object).toHaveProperty('SourceCode');
      expect(object).toHaveProperty('EVMVersion');
      expect(object).toHaveProperty('LicenseType');
      expect(object).toHaveProperty('Proxy');
      expect(object).toHaveProperty('Implementation');
      expect(object).toHaveProperty('SwarmSource');
    });
  });

  describe('getContractCreatorAndCreationTxHash', () => {
    test('should return the creator and creation transaction hash for multiple contracts', async () => {
      const addresses = [
        '0xB83c27805aAcA5C7082eB45C868d955Cf04C337F',
        '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
        '0xe4462eb568E2DFbb5b0cA2D3DbB1A35C9Aa98aad',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xf5b969064b91869fBF676ecAbcCd1c5563F591d0',
      ];
      const result = await contract.getContractCreatorAndCreationTxHash(addresses);
      expect(result).toHaveLength(5);
      result.forEach((info) => {
        expect(info).toHaveProperty('contractAddress');
        expect(info).toHaveProperty('contractCreator');
        expect(info).toHaveProperty('txHash');
      });
    });
  });

  describe('verifySourceCode', () => {

  });
});
