import connection from './connection';
import Promise from 'bluebird';

export const findOne = (table, columns) => id => new Promise((resolve, reject) => {
  connection.connect();

  connection.query(`SELECT ?? FROM ${table} WHERE id = ?`, [columns, id], (err, [result]) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });

  connection.end();
});

export const findAll = (table, columns) => () => new Promise((resolve, reject) => {
  connection.connect();

  connection.query(`SELECT ?? FROM ${table}`, [columns], (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });

  connection.end();
});
