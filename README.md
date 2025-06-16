# XRPL MCP

![NPM Version](https://img.shields.io/npm/v/@tamago-labs/xrpl-mcp)

**XRPL MCP** is a Model Context Protocol (MCP) server implementation for the XRP Ledger blockchain, compatible with MCP clients like Claude Desktop or Cursor.ai. It allows managing wallet operations, token creation, NFTs, and DEX trading through comprehensive tools.

## Features

- **15+ MCP tools** covering account management, token operations, NFT management, and DEX trading
- **Complete XRPL integration** for payments, trust lines, and account management
- **NFToken support** for minting, burning, and managing non-fungible tokens
- **DEX trading capabilities** with order book access and offer management
- **Comprehensive transaction management** with detailed analytics and history
- **Token creation and management** with configurable settings and compliance features

## Using with Claude Desktop

1. Install Claude Desktop if you haven't already
2. Open Claude Desktop settings
3. Add the XRPL MCP client to your configuration:

```json
{
  "mcpServers": {
    "xrpl-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@tamago-labs/xrpl-mcp",
        "--xrpl_private_key=YOUR_PRIVATE_KEY", 
        "--xrpl_network=mainnet"
      ],
      "disabled": false
    }
  }
}
```

This Private Key mode is recommended for advanced users who can securely manage their private keys. The MCP client handles transactions locally without exposing any data to external servers.

## Use Cases

### 1. Professional Token Management
The agent integrates with XRPL's native features to help you:

- **Create and configure custom tokens** with compliance settings
- **Manage trust lines** for token issuance and distribution
- **Monitor token balances** across multiple currencies
- **Execute token transfers** with destination tags and memos
- **Track transaction history** and analyze payment patterns

### 2. NFT Creation & Trading
The agent assists with NFToken operations:
- **Mint unique NFTokens** with custom metadata and transfer fees
- **Burn unwanted NFTokens** to clean up collections
- **Set transfer restrictions** and royalty structures
- **Manage NFT collections** with proper categorization

### 3. DEX Trading & Market Making
The agent provides professional trading tools:
- **Create and manage trading offers** on XRPL's native DEX
- **Monitor order books** for optimal trade execution
- **Track active offers** and portfolio performance
- **Execute market making strategies** with automated offer management

## Available Tools (15 Tools)

### Core Wallet Operations
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `xrpl_get_wallet_address` | Retrieve your wallet address | "What's my wallet address?" |
| `xrpl_get_account_info` | Get detailed account information | "Show my account details" |
| `xrpl_get_balances` | Get all token balances | "Show my token balances" |
| `xrpl_send_payment` | Send XRP or tokens to another address | "Send 100 XRP to rAddress..." |

### Token Management
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `xrpl_create_token` | Create a new token with custom settings | "Create a token with symbol USD and require authorization" |
| `xrpl_set_trust_line` | Set trust line for a token | "Set trust line for USD token from rIssuer..." |

### NFToken Operations
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `xrpl_mint_nftoken` | Mint a new NFToken | "Mint an NFT with URI https://metadata.com/1" |
| `xrpl_burn_nftoken` | Burn an existing NFToken | "Burn NFToken with ID 0xABC..." |

### DEX Trading
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `xrpl_create_offer` | Create a trading offer | "Create offer to sell 1000 USD for 500 XRP" |
| `xrpl_cancel_offer` | Cancel an existing offer | "Cancel my offer with sequence 123" |
| `xrpl_get_order_book` | Get order book for trading pair | "Show USD/XRP order book" |
| `xrpl_get_account_offers` | Get all active offers for account | "Show my active trading offers" |

### Transaction Management
| Tool Name | Description | Example Usage |
|-----------|-------------|---------------|
| `xrpl_get_transaction` | Get detailed transaction information | "Show details for transaction 0xABC..." |
| `xrpl_get_recent_transactions` | Get recent transactions with analytics | "Show my last 20 transactions" |

## Advanced XRPL Workflow Examples

### Complete Token Issuance Strategy
```
User: "Help me create and distribute a new token for my business"

Agent: 
1. Uses xrpl_create_token to create token with proper compliance settings
2. Uses xrpl_set_trust_line to establish initial trust relationships
3. Uses xrpl_send_payment to distribute tokens to holders
4. Provides ongoing monitoring and management recommendations
```

### NFT Collection Management
```
User: "I want to create and manage an NFT collection with royalties"

Agent:
1. Uses xrpl_mint_nftoken to create NFTs with transfer fees
2. Uses xrpl_get_account_info to monitor collection status
3. Tracks secondary sales and royalty collection
4. Provides collection analytics and optimization strategies
```

### DEX Market Making
```
User: "Set up market making for my token on XRPL DEX"

Agent:
1. Uses xrpl_get_order_book to analyze current market conditions
2. Uses xrpl_create_offer to place buy and sell orders
3. Uses xrpl_get_account_offers to monitor active positions
4. Automatically adjusts spreads based on market activity
```

### Transaction Analysis
```
User: "Analyze my recent XRPL activity and optimize my operations"

Agent:
1. Uses xrpl_get_recent_transactions to fetch detailed history
2. Uses xrpl_get_transaction for in-depth analysis of each transaction
3. Analyzes fee patterns and provides optimization strategies
4. Shows token usage and trading efficiency metrics
```

## Background

Model Context Protocol (MCP), introduced by Claude AI in late 2024, solves the challenge of rapidly evolving AI applications in crypto. Unlike traditional agent kits that tightly couple AI models and components, MCP provides standardized interfaces that remain stable as models evolve.

XRPL MCP leverages this architecture to provide professional-grade blockchain tools that work seamlessly across different AI interfaces, allowing users to manage complex XRPL operations through natural language interactions.



## Troubleshooting

If you're using Ubuntu or another Linux environment with NVM, you'll need to manually configure the path. Follow these steps:

1. Install the XRPL MCP under your current NVM-managed Node.js version.

```bash
npm install -g @tamago-labs/xrpl-mcp
```

2. Due to how NVM installs libraries, you may need to use absolute paths in your config. Replace the example values below with your actual username and Node version:

```json
{
  "mcpServers": {
    "xrpl-mcp": {
      "command": "/home/YOUR_NAME/.nvm/versions/node/YOUR_NODE_VERSION/bin/node",
      "args": [
        "/home/YOUR_NAME/.nvm/versions/node/YOUR_NODE_VERSION/bin/@tamago-labs/xrpl-mcp",
        "--xrpl_private_key=YOUR_PRIVATE_KEY",
        "--xrpl_network=mainnet"
      ]
    }
  }
}
```

3. Restart Claude Desktop and it should work now.
 
## License

This project is licensed under the MIT License.
