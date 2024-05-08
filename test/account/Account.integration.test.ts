import {
  expect, test, describe, beforeAll,
} from 'bun:test';
import Account from '../../src/account/Account';

describe('Account', () => {
  let account: Account;

  beforeAll(() => {
    account = new Account(process.env.ETHERSCAN_API_KEY!, 'https://api.etherscan.io/api');
  });

  describe('getBalance', () => {
    test("should return the account's balance as a string", async () => {
      const address = '0x000000000000000000000000000000000000dEaD';
      const balance = await account.getBalance(address);
      expect(balance).toBeTypeOf('string');
      expect(parseFloat(balance)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getBalances', () => {
    test('should return an array of balance objects', async () => {
      const addresses = ['0x000000000000000000000000000000000000dEaD', '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'];
      const balances = await account.getBalances(addresses);
      expect(balances).toHaveLength(2);

      balances.forEach((obj) => {
        expect(obj).toHaveProperty('account');
        expect(obj).toHaveProperty('balance');
        expect(obj.account).toBeTypeOf('string');
        expect(obj.balance).toBeTypeOf('string');
      });
    });
  });

  describe('getTransactions', () => {
    test('should return an array of transactions', async () => {
      const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
      const transactions = await account.getTransactions({
        address,
      });
      expect(transactions).toHaveLength(10); // Default is 10
      transactions.forEach((tx) => {
        expect(tx).toHaveProperty('hash');
        expect(tx).toHaveProperty('from');
        expect(tx).toHaveProperty('to');
        expect(tx).toHaveProperty('value');
        expect(tx).toHaveProperty('timeStamp');
        expect(tx).toHaveProperty('gasPrice');
        expect(tx).toHaveProperty('gas');
        expect(tx).toHaveProperty('gasUsed');
        expect(tx).toHaveProperty('blockNumber');
        expect(tx).toHaveProperty('nonce');
        expect(tx).toHaveProperty('input');
      });
    });
  });

  describe('getInternalTransactions', () => {
    test('should return an array of internal transactions with all required properties', async () => {
      const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
      const transactions = await account.getInternalTransactions({
        address,
      });
      expect(transactions).toHaveLength(10); // Default is 10

      transactions.forEach((tx) => {
        expect(tx).toHaveProperty('blockNumber');
        expect(tx).toHaveProperty('timeStamp');
        expect(tx).toHaveProperty('hash');
        expect(tx).toHaveProperty('from');
        expect(tx).toHaveProperty('to');
        expect(tx).toHaveProperty('value');
        expect(tx).toHaveProperty('contractAddress');
        expect(tx).toHaveProperty('input');
        expect(tx).toHaveProperty('type');
        expect(tx).toHaveProperty('gas');
        expect(tx).toHaveProperty('gasUsed');
        expect(tx).toHaveProperty('traceId');
        expect(tx).toHaveProperty('isError');
        expect(tx).toHaveProperty('errCode');
      });
    });
  });

  describe('getInternalTransactionsByTxHash', () => {
    test('should return an array of internal transactions with all required properties', async () => {
      const txHash = '0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170';
      const transactions = await account.getInternalTransactionsByTxHash(txHash);
      expect(transactions).toHaveLength(1);
      transactions.forEach((tx) => {
        expect(tx).toHaveProperty('blockNumber');
        expect(tx).toHaveProperty('timeStamp');
        expect(tx).toHaveProperty('from');
        expect(tx).toHaveProperty('to');
        expect(tx).toHaveProperty('value');
        expect(tx).toHaveProperty('contractAddress');
        expect(tx).toHaveProperty('input');
        expect(tx).toHaveProperty('type');
        expect(tx).toHaveProperty('gas');
        expect(tx).toHaveProperty('gasUsed');
        expect(tx).toHaveProperty('isError');
        expect(tx).toHaveProperty('errCode');
      });
    });
  });
});
