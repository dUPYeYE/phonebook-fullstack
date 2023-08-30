import dbConnection from './connection.js';

export const listAllPartners = () => {
  const query = 'SELECT * FROM partners;';
  return dbConnection.executeQuery(query);
};

export const listAllPartnersFiltered = (filter) => {
  const query = 'SELECT * FROM partners WHERE first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ?;';
  const options = [`%${filter}%`, `%${filter}%`, `%${filter}%`];
  return dbConnection.executeQuery(query, options);
};

export const getPartner = (id) => {
  const query = 'SELECT * FROM partners WHERE partner_id = ?;';
  const options = [id];
  return dbConnection.executeQuery(query, options);
};

export const patchPartner = (id, fname, lname, phonenum) => {
  const query = 'UPDATE partners SET first_name = ?, last_name = ?, phone_number = ? WHERE partner_id = ?';
  const options = [fname, lname, phonenum, id];
  return dbConnection.executeQuery(query, options);
};

export const insertPartner = (fname, uname, phonenum) => {
  const query = 'INSERT INTO partners(first_name, last_name, phone_number) VALUES (?, ?, ?);';
  const options = [fname, uname, phonenum];
  return dbConnection.executeQuery(query, options);
};

export const deletePartner = (id) => {
  const query = 'DELETE FROM partners WHERE partner_id = ?;';
  const options = [id];
  return dbConnection.executeQuery(query, options);
};
