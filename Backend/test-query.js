const pool = require('./src/config/database');

async function test() {
  try {
    const [rows] = await pool.execute('SELECT * FROM documents');
    console.log(rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
