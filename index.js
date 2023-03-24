const { Client } = require("pg");
const dotenv = require("dotenv").config();
const PASSWORD = process.env.PASSWORD;
const { fetch, parseProductDetails, parseProductLinks } = require("./scrapper");

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

async function scrapper(pageNo) {
  const Products = [];
  if (pageNo === 0) {
    return "completed";
  }
  const flipkartData = await fetch(
    `https://www.flipkart.com/search?q=tshirt&page=${pageNo}`
  ).catch((err) => console.log("can't fetch data", err));

  const productLink = await parseProductLinks(flipkartData);

  console.log(productLink,'======<<')
  for (let i of productLink) {
    const productDom = await fetch(`https://flipkart.com${i}`);
    const data = parseProductDetails(productDom);
    Products.push(data);
  }
  Products.map((result) => {
    try {
      console.log(result, "===<<");
      return;
      // await client.query(`
      // INSERT INTO TABLE  (result)
      // `);
      console.log("data saved");
    } catch (error) {
      console.error("can not save data");
    }
  });
  return scrapper(pageNo - 1);
}

scrapper(1);
