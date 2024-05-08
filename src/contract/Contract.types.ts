export type ContractCreationInfo = {
  contractAddress: string;
  contractCreator: string;
  txHash: string;
};

export type VerifySourceCodeParams = {
  chainId: string;
  codeFormat: 'solidity-single-file' | 'solidity-standard-json-input';
  sourceCode: string;
  constructorArguments?: string;
  contractAddress: string;
  contractName: string;
  compilerVersion: string;
};
