#!/usr/bin/env ts-node

import { readFileSync } from 'fs';
import { join } from 'path';

async function verifyBuild() {
    console.log('🔍 Verifying XRPL MCP build...\n');
    
    try {
        // Check package.json
        const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
        console.log(`✅ Package: ${packageJson.name}@${packageJson.version}`);
        
        // Check if all required dependencies are present
        const requiredDeps = ['@modelcontextprotocol/sdk', 'xrpl', 'zod', 'bignumber.js', 'axios'];
        const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
        
        if (missingDeps.length > 0) {
            console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
            return false;
        }
        
        console.log('✅ All required dependencies present');
        
        // Check TypeScript files
        const { Agent } = await import('../src/agent');
        console.log('✅ Agent class imported successfully');
        
        const { XrplMcpTools } = await import('../src/mcp');
        const toolCount = Object.keys(XrplMcpTools).length;
        console.log(`✅ ${toolCount} MCP tools loaded`);
        
        // List all tools
        console.log('\n📋 Available tools:');
        Object.entries(XrplMcpTools).forEach(([key, tool]: [string, any]) => {
            console.log(`  - ${tool.name}`);
        });
        
        console.log('\n✅ Build verification successful!');
        console.log('\n📖 Next steps:');
        console.log('1. Run: npm run setup:wallet (if needed)');
        console.log('2. Configure .env file');
        console.log('3. Run: npm run build');
        console.log('4. Run: npm start');
        
        return true;
        
    } catch (error) {
        console.error('❌ Build verification failed:', error);
        return false;
    }
}

if (require.main === module) {
    verifyBuild().then(success => {
        process.exit(success ? 0 : 1);
    });
}

export default verifyBuild;
