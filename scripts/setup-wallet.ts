#!/usr/bin/env ts-node

import { Wallet } from 'xrpl';
import * as fs from 'fs';
import * as path from 'path';

async function setupWallet() {
    console.log('🚀 Setting up XRPL wallet...\n');

    // Generate a new wallet
    const wallet = Wallet.generate();
    
    console.log('✅ New wallet generated:');
    console.log(`Address: ${wallet.address}`);
    console.log(`Private Key: ${wallet.seed}`);
    console.log(`Public Key: ${wallet.publicKey}\n`);

    // Create .env content
    const envContent = `# XRPL Configuration
XRPL_PRIVATE_KEY=${wallet.seed}
XRPL_NETWORK=testnet
# XRPL_SERVER=wss://custom.server.url (optional)
`;

    // Write to .env file
    const envPath = path.join(process.cwd(), '.env');
    fs.writeFileSync(envPath, envContent);
    
    console.log('✅ .env file created successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Fund your testnet wallet at: https://xrpl.org/xrp-testnet-faucet.html');
    console.log(`2. Use address: ${wallet.address}`);
    console.log('3. Run: npm run build && npm start');
    console.log('\n⚠️  IMPORTANT: Keep your private key secure and never share it!');
}

if (require.main === module) {
    setupWallet().catch(console.error);
}

export default setupWallet;
