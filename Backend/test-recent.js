const pool = require('./src/config/database');

async function test() {
  try {
    const [rows] = await pool.execute('SELECT id, full_name, created_at FROM applications ORDER BY id DESC LIMIT 5');
    console.log("Recent applications:");
    console.log(rows);
    
    const [docRows] = await pool.execute('SELECT * FROM documents ORDER BY id DESC LIMIT 5');
    console.log("Recent documents:");
    console.log(docRows);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
