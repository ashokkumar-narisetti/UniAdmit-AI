const http = require('http');

http.get('http://localhost:4003/api/applications/14/details', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
}).on('error', console.error);
