import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_orSjciU27NhO@ep-dry-art-an0bel0c-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=verify-full"
});

async function run() {
  await client.connect();
  await client.query(`ALTER TABLE san DROP CONSTRAINT san_trang_thai_san_check;`);
  await client.query(`ALTER TABLE san ADD CONSTRAINT san_trang_thai_san_check CHECK (((trang_thai_san)::text = ANY ((ARRAY['Đang hoạt động'::character varying, 'Đã khóa'::character varying, 'Đang bảo trì'::character varying, 'Đã xóa'::character varying])::text[])));`);
  console.log("Constraint updated successfully.");
  await client.end();
}

run().catch(console.error);
