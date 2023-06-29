const { env } = process;

require('dotenv').config({path:`./.env_${process.env.NODE_ENV}` });

env.APP_PORT = env.APP_PORT || '3000';

module.exports={
 port:env.APP_PORT,
 dbUrl:env.DB_URL,
 database:env.DATABASE,
 jwtSecret:env.JWTSECRET
}