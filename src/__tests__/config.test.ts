import { getXrplConfig, validateEnvironment } from '../config';

describe('XRPL Config', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    describe('validateEnvironment', () => {
        it('should pass with valid environment', () => {
            process.env.XRPL_PRIVATE_KEY = 'test_key';
            process.env.XRPL_NETWORK = 'testnet';
            
            expect(() => validateEnvironment()).not.toThrow();
        });

        it('should throw when private key is missing', () => {
            process.env.XRPL_NETWORK = 'testnet';
            delete process.env.XRPL_PRIVATE_KEY;
            
            expect(() => validateEnvironment()).toThrow('Missing required environment variable: XRPL_PRIVATE_KEY');
        });

        it('should throw when network is missing', () => {
            process.env.XRPL_PRIVATE_KEY = 'test_key';
            delete process.env.XRPL_NETWORK;
            
            expect(() => validateEnvironment()).toThrow('Missing required environment variable: XRPL_NETWORK');
        });
    });

    describe('getXrplConfig', () => {
        it('should return config with required fields', () => {
            process.env.XRPL_PRIVATE_KEY = 'test_key';
            process.env.XRPL_NETWORK = 'testnet';
            process.env.XRPL_SERVER = 'wss://test.server';
            
            const config = getXrplConfig();
            
            expect(config.privateKey).toBe('test_key');
            expect(config.network).toBe('testnet');
            expect(config.server).toBe('wss://test.server');
        });

        it('should default to testnet if network not specified', () => {
            process.env.XRPL_PRIVATE_KEY = 'test_key';
            process.env.XRPL_NETWORK = '';
            
            expect(() => getXrplConfig()).toThrow();
        });
    });
});
