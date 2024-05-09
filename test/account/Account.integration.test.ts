import {
  expect, test, describe, beforeAll,
} from 'bun:test';
import Account from '../../src/account/Account';
import type { ERC1155TransferEvent, ERC20TransferEvent, Erc721TransferEvent } from '../../src/account/Account.types';

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

  describe('getInternalTransactionsByBlockRange', () => {
    test('should return an array of internal transactions with all required properties', async () => {
      const startBlock = 0;
      const endBlock = 99999999;
      const transactions = await account.getInternalTransactionsByBlockRange({
        startBlock,
        endBlock,
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

  describe('getErc20TransferEvents', () => {
    async function checkEventProperties(event: ERC20TransferEvent) {
      expect(event).toHaveProperty('blockNumber');
      expect(event).toHaveProperty('timeStamp');
      expect(event).toHaveProperty('hash');
      expect(event).toHaveProperty('nonce');
      expect(event).toHaveProperty('blockHash');
      expect(event).toHaveProperty('from');
      expect(event).toHaveProperty('contractAddress');
      expect(event).toHaveProperty('to');
      expect(event).toHaveProperty('value');
      expect(event).toHaveProperty('tokenName');
      expect(event).toHaveProperty('tokenSymbol');
      expect(event).toHaveProperty('tokenDecimal');
      expect(event).toHaveProperty('transactionIndex');
      expect(event).toHaveProperty('gas');
      expect(event).toHaveProperty('gasPrice');
      expect(event).toHaveProperty('gasUsed');
      expect(event).toHaveProperty('cumulativeGasUsed');
      expect(event).toHaveProperty('input');
      expect(event).toHaveProperty('confirmations');
    }

    test("should throw an error if neither 'address' nor 'contractAddress' is provided", async () => {
      expect(account.getErc20TransferEvents({})).rejects.toThrow('Either address or contractAddress must be provided');
    });

    test('should return an array of ERC20 transfer events for the given contract address', async () => {
      const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT on Ethereum
      const events = await account.getErc20TransferEvents({
        contractAddress,
      });
      expect(events).toHaveLength(10); // Default is 10
      events.forEach((event) => {
        checkEventProperties(event);
      });
    });

    test('should return an array of ERC20 transfer events for the given address', async () => {
      const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
      const events = await account.getErc20TransferEvents({
        address,
      });
      expect(events).toHaveLength(10); // Default is 10
      events.forEach((event) => {
        checkEventProperties(event);
      });
    });
  });

  describe('getErc721TransferEvents', () => {
    async function checkEventProperties(event: Erc721TransferEvent) {
      expect(event).toHaveProperty('blockNumber');
      expect(event).toHaveProperty('timeStamp');
      expect(event).toHaveProperty('hash');
      expect(event).toHaveProperty('nonce');
      expect(event).toHaveProperty('blockHash');
      expect(event).toHaveProperty('from');
      expect(event).toHaveProperty('contractAddress');
      expect(event).toHaveProperty('to');
      expect(event).toHaveProperty('tokenID');
      expect(event).toHaveProperty('tokenName');
      expect(event).toHaveProperty('tokenSymbol');
      expect(event).toHaveProperty('tokenDecimal');
      expect(event).toHaveProperty('transactionIndex');
      expect(event).toHaveProperty('gas');
      expect(event).toHaveProperty('gasPrice');
      expect(event).toHaveProperty('gasUsed');
      expect(event).toHaveProperty('cumulativeGasUsed');
      expect(event).toHaveProperty('input');
      expect(event).toHaveProperty('confirmations');
    }

    test("should throw an error if neither 'address' nor 'contractAddress' is provided", async () => {
      expect(account.getErc721TransferEvents({})).rejects.toThrow('Either address or contractAddress must be provided');
    });

    test('should return an array of ERC721 transfer events for the given contract address', async () => {
      const contractAddress = '0x06012c8cf97bead5deae237070f9587f8e7a266d'; // CryptoKitties
      const events = await account.getErc721TransferEvents({
        contractAddress,
      });
      expect(events).toHaveLength(10); // Default is 10
      events.forEach((event) => {
        checkEventProperties(event);
      });
    });

    test('should return an array of ERC721 transfer events for the given address', async () => {
      const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
      const events = await account.getErc721TransferEvents({
        address,
      });
      expect(events).toHaveLength(10); // Default is 10
      events.forEach((event) => {
        checkEventProperties(event);
      });
    });
  });

  describe('getErc1155TransferEvents', () => {
    async function checkEventProperties(event: ERC1155TransferEvent) {
      expect(event).toHaveProperty('blockNumber');
      expect(event).toHaveProperty('timeStamp');
      expect(event).toHaveProperty('hash');
      expect(event).toHaveProperty('nonce');
      expect(event).toHaveProperty('blockHash');
      expect(event).toHaveProperty('from');
      expect(event).toHaveProperty('contractAddress');
      expect(event).toHaveProperty('to');
      expect(event).toHaveProperty('tokenID');
      expect(event).toHaveProperty('tokenValue');
      expect(event).toHaveProperty('tokenName');
      expect(event).toHaveProperty('tokenSymbol');
      expect(event).toHaveProperty('transactionIndex');
      expect(event).toHaveProperty('gas');
      expect(event).toHaveProperty('gasPrice');
      expect(event).toHaveProperty('gasUsed');
      expect(event).toHaveProperty('cumulativeGasUsed');
      expect(event).toHaveProperty('input');
      expect(event).toHaveProperty('confirmations');
    }

    test("should throw an error if neither 'address' nor 'contractAddress' is provided", async () => {
      expect(account.getErc1155TransferEvents({})).rejects.toThrow('Either address or contractAddress must be provided');
    });

    test('should return an array of ERC1155 transfer events for the given contract address', async () => {
      const contractAddress = '0x76be3b62873462d2142405439777e971754e8e77'; // Example ERC1155 contract address
      const events = await account.getErc1155TransferEvents({
        contractAddress,
      });
      expect(events).toHaveLength(10); // Default is 10
      events.forEach((event) => {
        checkEventProperties(event);
      });
    });

    test('should return an array of ERC1155 transfer events for the given address', async () => {
      const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
      const events = await account.getErc1155TransferEvents({
        address,
      });
      expect(events).toHaveLength(10); // Default is 10
      events.forEach((event) => {
        checkEventProperties(event);
      });
    });
  });
});
