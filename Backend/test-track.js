const http = require('http');

const testTracking = (id, dob) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ applicationId: id, dateOfBirth: dob });
    
    const options = {
      hostname: 'localhost',
      port: 4003,
      path: '/api/applications/track',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: JSON.parse(data)
        });
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
};

async function runTests() {
  console.log("Testing with correct ID and correct DOB...");
  // From previous database checks, ID 14 exists with DOB "2026-06-24T18:30:00.000Z"
  try {
    const res1 = await testTracking(14, '2026-06-24');
    console.log("Expected: 200 Success. Got:", res1.statusCode, res1.data.success);
    
    console.log("Testing with correct ID and incorrect DOB...");
    const res2 = await testTracking(14, '2025-01-01');
    console.log("Expected: 401 Failure. Got:", res2.statusCode, res2.data.message);
    
    console.log("Testing with incorrect ID...");
    const res3 = await testTracking(9999, '2026-06-24');
    console.log("Expected: 404 Failure. Got:", res3.statusCode, res3.data.message);
    
  } catch (err) {
    console.error(err);
  }
}

runTests();
