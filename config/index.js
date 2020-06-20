require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGODB_URI || 'mongodb://localhost:27017/devflix',
  dbName: process.env.MONGODB_NAME || 'devflix_dev',
}

module.exports = { config };
