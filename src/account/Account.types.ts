export type AccountWithBalance = {
  account: string;
  balance: string;
};

export type Transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
};

export type InternalTransaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  contractAddress: string;
  input: string;
  type: string;
  gas: string;
  gasUsed: string;
  traceId: string;
  isError: string;
  errCode: string;
};

export type InternalTransactionByHash = Omit<InternalTransaction, 'hash' | 'traceId'>;

export type GetTransactionsParams = {
  address: string;
  startBlock?: number;
  endBlock?: number;
  page?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
};

export type getInternalTransactionsByBlockRangeParams = {
  startBlock: number;
  endBlock: number;
  page?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
};

export type TransferEventParams = {
  contractAddress?: string;
  address?: string;
  page?: number;
  offset?: number;
  startBlock?: number;
  endBlock?: number;
  sort?: 'asc' | 'desc';
};

export type ERC20TransferEvent = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};

export type Erc721TransferEvent = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  tokenID: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
};

export type ERC1155TransferEvent = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  contractAddress: string;
  from: string;
  to: string;
  tokenID: string;
  tokenValue: string;
  tokenName: string;
  tokenSymbol: string;
  confirmations: string;
};

export type GetBlocksByAddressParams = {
  address: string;
  blockType: 'blocks' | 'uncles';
  page?: number;
  offset?: number;
};

export type GetBeaconChainWithdrawalsParams = {
  address: string;
  startBlock?: number;
  endBlock?: number;
  page?: number;
  offset?: number;
  sort?: string;
};

export type BeaconChainWithdrawal = {
  withdrawalIndex: string;
  validatorIndex: string;
  address: string;
  amount: string;
  blockNumber: string;
  timestamp: string;
};
