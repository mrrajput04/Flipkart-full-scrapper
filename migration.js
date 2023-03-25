const {client} = require('./index');




    client.query(`
    CREATE TABLE IF NOT EXISTS Products (
        ID SERIAL PRIMARY KEY    NOT NULL,
        TITLE CHAR(50),
        PRICE  json     ,
        DESCRIPTION        CHAR(50),
        RATING json NOT NULL,
        IMAGE CHAR(100),
        HIGHLIGHT json ,
        COLORANDSIZEAVAILABLE json


        );
        `)

        if(process.argv[2]=="DROP"){
        client.query(`
        DROP TABLE IF EXISTS Products
        `)
    }

    


    if(process.argv[2]=="UPDATE"){
        client.query(`
         UPDATE TABLE(

         )
        `)
    }
