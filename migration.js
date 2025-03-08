const { client } = require("./db");

client.query(`
    CREATE TABLE IF NOT EXISTS Products (
        ID SERIAL PRIMARY KEY    NOT NULL,
        TITLE CHAR(500),
        PRICE  json     ,
        DESCRIPTION        CHAR(1000),
        RATING json ,
        IMAGEURL CHAR(500),
        HIGHLIGHT json ,
        COLORANDSIZEAVAILABLE json


        );
        `);
        

if (process.argv[2] == "DROP") {
  client.query(`
        DROP TABLE IF EXISTS Products
        `);
}

if (process.argv[2] == "UPDATE") {
  client.query(`
         UPDATE TABLE(

         )
        `);
}
