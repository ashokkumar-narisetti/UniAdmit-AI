const pool = require('./src/config/database');

async function test() {
  try {
    const [rows] = await pool.execute(`
    SELECT
      a.*,
      ar.tenth_school_name,
      ar.tenth_board,
      ar.tenth_passout_year,
      ar.tenth_percentage,
      ar.tenth_attendance,
      ar.inter_college_name,
      ar.inter_board,
      ar.inter_passout_year,
      ar.inter_percentage,
      ar.inter_attendance,
      d.document_type,
      d.file_name,
      d.file_path
    FROM applications a
    LEFT JOIN academic_records ar
      ON a.id = ar.application_id
    LEFT JOIN documents d
      ON a.id = d.application_id
    WHERE a.id = 14
    `);
    console.log(rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
