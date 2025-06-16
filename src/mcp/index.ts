// XRPL Core Tools
import { GetWalletAddressTool } from "./xrpl/get_wallet_address_tool";
import { GetAccountInfoTool } from "./xrpl/get_account_info_tool";
import { GetBalancesTool } from "./xrpl/get_balances_tool";
import { SendPaymentTool } from "./xrpl/send_payment_tool";

// Token Tools
import { CreateTokenTool } from "./token/create_token_tool";
import { SetTrustLineTool } from "./token/set_trust_line_tool";
import { MintNFTokenTool } from "./token/mint_nftoken_tool";
import { BurnNFTokenTool } from "./token/burn_nftoken_tool";

// Transaction Tools
import { CreateOfferTool } from "./transaction/create_offer_tool";
import { CancelOfferTool } from "./transaction/cancel_offer_tool";
import { GetTransactionTool } from "./transaction/get_transaction_tool";
import { GetRecentTransactionsTool } from "./transaction/get_recent_transactions_tool";

// DEX Tools
import { GetOrderBookTool } from "./dex/get_order_book_tool";
import { GetAccountOffersTool } from "./dex/get_account_offers_tool";

export const XrplMcpTools = {
    // XRPL Core
    "GetWalletAddressTool": GetWalletAddressTool,
    "GetAccountInfoTool": GetAccountInfoTool,
    "GetBalancesTool": GetBalancesTool,
    "SendPaymentTool": SendPaymentTool,
    
    // Token Management
    "CreateTokenTool": CreateTokenTool,
    "SetTrustLineTool": SetTrustLineTool,
    "MintNFTokenTool": MintNFTokenTool,
    "BurnNFTokenTool": BurnNFTokenTool,
    
    // Trading & Transactions
    "CreateOfferTool": CreateOfferTool,
    "CancelOfferTool": CancelOfferTool,
    "GetTransactionTool": GetTransactionTool,
    "GetRecentTransactionsTool": GetRecentTransactionsTool,
    
    // DEX & Order Book
    "GetOrderBookTool": GetOrderBookTool,
    "GetAccountOffersTool": GetAccountOffersTool
};
