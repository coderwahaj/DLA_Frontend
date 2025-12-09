require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres',
  'postgres', 
  '@digitaldatabase123',
  {
    host: 'db.abznrdqolsuprysdkdzm.supabase.co', // REMOVED SPACE
    port: 5432,
    dialect: 'postgres',
    dialectOptions:  {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: console.log
  }
);

async function testConnection() {
  try {
    await sequelize. authenticate();
    console.log('✅ Connection has been established successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
}

testConnection();