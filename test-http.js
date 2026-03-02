const http = require('http');

function test(options, label) {
    return new Promise((resolve) => {
        console.log(`Testing ${label}...`);
        const req = http.request(options, (res) => {
            console.log(`${label} Status:`, res.statusCode);
            console.log(`${label} Headers:`, JSON.stringify(res.headers, null, 2));
            resolve();
        });
        req.on('error', (e) => {
            console.error(`${label} Error:`, e.message);
            resolve();
        });
        req.end();
    });
}

async function run() {
    // Test Health
    await test({
        hostname: 'localhost',
        port: 5000,
        path: '/health',
        method: 'GET'
    }, 'Health Check');

    // Test CORS Preflight
    await test({
        hostname: 'localhost',
        port: 5000,
        path: '/api/analyze',
        method: 'OPTIONS',
        headers: {
            'Origin': 'http://localhost:8000',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
        }
    }, 'CORS Preflight');
}

run();
