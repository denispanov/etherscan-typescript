import ApiClient from '../ApiClient';
import type { ContractCreationInfo, VerifySourceCodeParams } from './Contract.types';

export default class Contract extends ApiClient {
  constructor(apiKey: string, baseUrl: string) {
    super(apiKey, baseUrl, 'contract');
  }

  public async getContractAbi(address: string) {
    const url = this.createUrl();
    url.searchParams.append('action', 'getabi');
    url.searchParams.append('address', address);

    return this.get<string>(url);
  }

  public async getContractSourceCode(address: string) {
    const url = this.createUrl();
    url.searchParams.append('action', 'getsourcecode');
    url.searchParams.append('address', address);

    return this.get<string>(url);
  }

  public async getContractCreatorAndCreationTxHash(contractAddresses: string[]) {
    const url = this.createUrl();
    url.searchParams.append('action', 'getcontractcreation');
    url.searchParams.append('contractaddresses', contractAddresses.join(','));

    return this.get<ContractCreationInfo[]>(url);
  }

  /**
   * Verifies the source code of a deployed contract on the blockchain.
   *
   * @param {VerifySourceCodeParams} params - The parameters required for source code verification.
   * @param {string} params.chainId - The chain ID to submit verification, e.g., '1' for Ethereum mainnet.
   * @param {string} params.codeFormat - The format of the code to be verified. Use 'solidity-single-file' for a single file or 'solidity-standard-json-input' for a JSON file.
   * @param {string} params.sourceCode - The actual Solidity source code.
   * @param {string} [params.constructorArguments] - Optional constructor arguments if the contract uses them.
   * @param {string} params.contractAddress - The address where the contract is deployed.
   * @param {string} params.contractName - The name of the contract including the path, e.g., 'contracts/Verified.sol:Verified'.
   * @param {string} params.compilerVersion - The Solidity compiler version used, e.g., 'v0.8.24+commit.e11b9ed9'.
   * @returns {Promise<any>} A promise that resolves with the verification result.
  */
  public async verifySourceCode(params: VerifySourceCodeParams) {
    const url = this.createUrl();
    url.searchParams.append('action', 'verifysourcecode');

    const formData = new FormData();
    formData.append('chainId', params.chainId);
    formData.append('codeformat', params.codeFormat);
    formData.append('sourceCode', params.sourceCode);
    formData.append('contractaddress', params.contractAddress);
    formData.append('contractname', params.contractName);
    formData.append('compilerversion', params.compilerVersion);
    if (params.constructorArguments) {
      formData.append('constructorArguments', params.constructorArguments);
    }

    return this.post(url, formData);
  }
}
