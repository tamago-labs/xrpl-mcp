#!/usr/bin/env node

import { XrplConfig } from './types';


const getArgs = () =>
    process.argv.reduce((args: any, arg: any) => {
        // long arg
        if (arg.slice(0, 2) === "--") {
            const longArg = arg.split("=");
            const longArgFlag = longArg[0].slice(2);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
        }
        // flags
        else if (arg[0] === "-") {
            const flags = arg.slice(1).split("");
            flags.forEach((flag: any) => {
                args[flag] = true;
            });
        }
        return args;
    }, {});

export function validateEnvironment(): void {
    const args = getArgs();

    // Check if private key is provided
    const hasPrivateKey = !!(args?.xrpl_private_key);

    if (!hasPrivateKey) {
        throw new Error(
            'Missing required environment variable: XRPL_PRIVATE_KEY must be provided'
        );
    }

    // Network is required
    const hasXrplNetwork = !!(args?.xrpl_network);
    if (!hasXrplNetwork) {
        throw new Error('Missing required environment variable: XRPL_NETWORK');
    }
}

export function getXrplConfig(): XrplConfig {
    validateEnvironment();

    const args = getArgs();

    const currentEnv = {
        XRPL_PRIVATE_KEY: args?.xrpl_private_key,
        XRPL_NETWORK: args?.xrpl_network
    };

    return {
        privateKey: currentEnv.XRPL_PRIVATE_KEY!,
        network: (currentEnv.XRPL_NETWORK || 'testnet') as 'testnet' | 'mainnet' | 'devnet'
    };
}
