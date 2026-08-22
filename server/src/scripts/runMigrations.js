const { runMigrations, testConnection } = require('../config/database');

const migrate = async () => {
  console.log('🚀 Starting database migrations...');
  
  const connected = await testConnection();
  if (!connected) {
    console.error('❌ Cannot connect to database.');
    process.exit(1);
  }
  
  try {
    await runMigrations();
    console.log('✅ All migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
};

migrate();