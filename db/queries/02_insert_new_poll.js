const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const pool = new Pool;

const generateRandomString = function() {
  let shortened = "";
  const alphanum = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i <= 5; i++) {
    shortened += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
  }
  return shortened;
};

const insertNewPoll = (newPoll) => {
  const queryString = `
  INSERT INTO polls (title, description, admin_url, voting_url)
  VALUES ($1, $2)
  RETURNING *;`;
  const queryParams = [newPoll.title, newPoll.desc]
  return pool.query(queryString, queryParams)
    .then((res) => {
      console.log("RES.ROWS:",res.rows)
      //return res.rows;
    })
}

const updatePoll = () => {
let admin_url = hi;
const queryString = `hi`;
const queryParams = [admin_url, voting_url]
}

const insertOptions = (newPoll) => {
  const queryString = `INSERT INTO options (poll_id, choice)
  VALUES ($1, $2)`;
  const queryParams = [newPoll.title, newPoll.desc]
  return dbParams.query(queryString, queryParams)
    .then((res) => {
      console.log(res.rows)
      //return res.rows;
    })
}


const addProperty = function(property) {
  const costPerNight = Number(property.cost_per_night);
  const numOfBaths = Number(property.number_of_bathrooms);
  const numOfBeds = Number(property.number_of_bedrooms);
  const numOfParking = Number(property.parking_spaces);
  const queryParams = [property.title, property.description, property.owner_id, property.cover_photo_url,
    property.thumbnail_photo_url, costPerNight, numOfParking, numOfBaths,
    numOfBeds, property.province, property.city, property.country, property.street, property.post_code];

  let queryString = `
INSERT INTO properties (
  title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces,
  number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
RETURNING *;
 `;
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};

module.exports = insertNewPoll;
