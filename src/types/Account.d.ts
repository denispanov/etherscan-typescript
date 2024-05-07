type Account = {
  account: string;
  balance: string;
};

type Transaction = {
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

export type GetBalancesResponse = Account[];

export type GetTransactionsParams = {
  address: string;
  startBlock?: number;
  endBlock?: number;
  page?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
};

export type GetTransactionsResponse = Transaction[];

