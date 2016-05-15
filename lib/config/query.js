import pool from './pool';
import connection from './connection';
import Promise from 'bluebird';
import { keys as getKeys, values as getValues } from 'ramda';
import { join } from 'underscore.string';

const joinBy = (seperator, strings) => join(seperator, ...strings);

export const readyFields = (manifest = {}) => ({
  lookup: `${joinBy(' = ?, ', getKeys(manifest))} = ?`,
  values: getValues(manifest),
});

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

export const findWhere = (table, columns) => (manifest) => new Promise((resolve, reject) => {
  const { lookup, values } = readyFields(manifest);

  connection.connect();

  connection.query(`SELECT ?? FROM ${table} WHERE ${lookup}`, [columns, ...values], (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });

  connection.end();
});
