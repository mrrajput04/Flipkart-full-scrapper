const { Client } = require("pg");
const dotenv = require("dotenv").config();
const PASSWORD = process.env.PASSWORD;


const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Flipkart-Scrapper",
  password: PASSWORD,
  port: 5000,
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { client };