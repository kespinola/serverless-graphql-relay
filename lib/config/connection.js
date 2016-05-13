import mysql from 'mysql';
import config from './db';

export default mysql.createPool({
  host: config.get('host'),
  port: config.get('port'),
  user: config.get('user'),
  password: config.get('password'),
  database: config.get('database'),
});
