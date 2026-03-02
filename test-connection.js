const fetch = require('node-fetch');

async function testConnection() {
    try {
        console.log("Testing Backend Health...");
        const healthRes = await fetch('http://localhost:5000/health');
        const healthData = await healthRes.json();
        console.log("Health Check Success:", healthData);

        console.log("\nTesting CORS Headers...");
        const corsRes = await fetch('http://localhost:5000/api/analyze', {
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://localhost:8000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });

        console.log("CORS Preflight Status:", corsRes.status);
        console.log("Access-Control-Allow-Origin:", corsRes.headers.get('access-control-allow-origin'));
    } catch (error) {
        console.error("Connection Test Failed:", error.message);
    }
}

testConnection();
