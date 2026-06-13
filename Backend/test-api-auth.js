const pool = require('./src/config/database');
const jwt = require('jsonwebtoken');

async function test() {
  // Generate a dummy admin token so we can hit the API
  const token = jwt.sign({ id: 1, email: 'admin@admin.com', role: 'ADMIN' }, process.env.JWT_SECRET || 'your_jwt_secret');
  
  const http = require('http');

  const options = {
    hostname: 'localhost',
    port: 4003,
    path: '/api/applications/14/details',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
  });

  req.on('error', console.error);
  req.end();
}

test();
