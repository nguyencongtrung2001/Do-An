import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_orSjciU27NhO@ep-dry-art-an0bel0c-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=verify-full"
});

async function run() {
  await client.connect();
  const res = await client.query(`SELECT pg_get_constraintdef(oid) FROM pg_constraint WHERE conname = 'giaodich_trang_thai_giao_dich_check';`);
  console.log("Constraint:", res.rows[0]);
  await client.end();
}

run().catch(console.error);
