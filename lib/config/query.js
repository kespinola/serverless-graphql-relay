import pool from './pool';
import connection from './connection';
import Promise from 'bluebird';

export const findOne = (table, columns) => id => new Promise((resolve, reject) => {
  pool.query(`SELECT ?? FROM ${table} WHERE id = ?`, [columns, id], (err, [result]) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

export const findAll = (table, columns) => () => new Promise((resolve, reject) => {
  pool.query(`SELECT ?? FROM ${table}`, [columns], (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

export const insertRow = (table) => (row) => new Promise((resolve, reject) => {
  connection.connect();

  connection.query(`INSERT INTO ${table} SET ?`, row, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result.insertId);
    }
  });

  connection.end();
});
