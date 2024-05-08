# etherscan-typescript

A TypeScript library for interacting with the Etherscan API, enabling developers to easily fetch blockchain data directly through Etherscan's interfaces.

## Installation

To install the library, you can use either npm or bun:

```bash
npm install etherscan-typescript
```

or

```bash
bun add etherscan-typescript
```

## Usage

Start by importing the `EtherScan` class from the library and initializing it with your Etherscan API key:

```typescript
import { EtherScan } from 'etherscan-typescript';

const apiKey = 'YOUR_ETHERSCAN_API_KEY';
const etherscan = new EtherScan(apiKey);
```

### Example: Fetching an Account Balance

You can retrieve the balance of an Ethereum address as follows:

```typescript
async function getBalance() {
  const address = '0x...'; // Specify the Ethereum address
  const balance = await etherscan.account.getBalance(address);
  console.log(balance);
}

getBalance();
```

## Features

The `etherscan-typescript` library provides access to various Etherscan API functionalities, including but not limited to:

- **Account API**: Fetch balances, transaction history, and ERC-20 token transfers.
- **Contract API**: Retrieve contract ABI, source code, and other contract-related data.
- **Transaction API**: Check transaction status and gas used.
- **Blocks API**: Information on blocks and uncle blocks by number or date.

## Contributing

Contributions to the `etherscan-typescript` library are welcome. Please ensure that your code adheres to the existing style, and include tests for new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
