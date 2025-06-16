import { Agent } from '../../agent';

export async function getOrderBook(agent: Agent, takerGets: any, takerPays: any, limit: number = 20) {
    try {
        const response = await agent.client.request({
            command: 'book_offers',
            taker_gets: takerGets,
            taker_pays: takerPays,
            limit: limit
        });

        return {
            offers: response.result.offers || [],
            ledger_current_index: response.result.ledger_current_index
        };
    } catch (error) {
        throw new Error(`Failed to get order book: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function getAccountOffers(agent: Agent, address: string) {
    try {
        const response = await agent.client.request({
            command: 'account_offers',
            account: address,
            ledger_index: 'current'
        });

        return response.result.offers || [];
    } catch (error) {
        throw new Error(`Failed to get account offers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function getTickerInfo(agent: Agent, takerGets: any, takerPays: any) {
    try {
        // Get recent trades by looking at order book and recent transactions
        const orderBook = await getOrderBook(agent, takerGets, takerPays, 10);
        
        return {
            pair: `${takerGets.currency || 'XRP'}/${takerPays.currency || 'XRP'}`,
            orderBook: orderBook.offers,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        throw new Error(`Failed to get ticker info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
