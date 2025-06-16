import { validateAddress, validateCurrencyCode, formatAmount, parseAmount } from '../utils';

describe('XRPL Utils', () => {
    describe('validateAddress', () => {
        it('should validate correct XRPL addresses', () => {
            expect(validateAddress('rDNvpjKYHGjzw7m5fZzTm4zJpTtxhGsxYx')).toBe(true);
            expect(validateAddress('rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH')).toBe(true);
        });

        it('should reject invalid addresses', () => {
            expect(validateAddress('invalid')).toBe(false);
            expect(validateAddress('1DivfNa')).toBe(false);
            expect(validateAddress('')).toBe(false);
        });
    });

    describe('validateCurrencyCode', () => {
        it('should validate standard currency codes', () => {
            expect(validateCurrencyCode('USD')).toBe(true);
            expect(validateCurrencyCode('XRP')).toBe(true);
            expect(validateCurrencyCode('BTC')).toBe(true);
        });

        it('should validate hex currency codes', () => {
            expect(validateCurrencyCode('0158415500000000C1F76FF6ECB0BAC600000000')).toBe(true);
        });

        it('should reject invalid currency codes', () => {
            expect(validateCurrencyCode('TOOLONG')).toBe(false);
            expect(validateCurrencyCode('xx')).toBe(false);
            expect(validateCurrencyCode('123')).toBe(false);
        });
    });

    describe('formatAmount', () => {
        it('should format XRP amounts', () => {
            expect(formatAmount('1000000')).toBe('1 XRP');
            expect(formatAmount('500000')).toBe('0.5 XRP');
        });

        it('should format token amounts', () => {
            expect(formatAmount({ value: '100', currency: 'USD' })).toBe('100 USD');
        });
    });

    describe('parseAmount', () => {
        it('should parse XRP amounts to drops', () => {
            expect(parseAmount('1')).toBe('1000000');
            expect(parseAmount('0.5')).toBe('500000');
        });

        it('should parse token amounts', () => {
            const result = parseAmount('100', 'USD', 'rIssuer123');
            expect(result).toEqual({
                currency: 'USD',
                value: '100',
                issuer: 'rIssuer123'
            });
        });
    });
});
