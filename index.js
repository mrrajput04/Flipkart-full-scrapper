const { client } = require("./db");
const { fetch, parseProductDetails, parseProductLinks } = require("./scrapper");
async function scrapper(pageNo) {
  const Products = [];
  if (pageNo === 0) {
    return "completed";
  }
  const productData = await fetch(
    `https://www.flipkart.com/search?q=tshirt&page=${pageNo}`
  ).catch((err) => console.log("can't fetch data", err));

  const productLink = await parseProductLinks(productData);
  for (let i of productLink) {
    const productDom = await fetch(`https://flipkart.com${i}`);
    const data = parseProductDetails(productDom);
    Products.push(data);
  }
  let query = "";
  for (const result of Products) {
    try {
      let des = result.description.replace("'", '"');
      query = `INSERT INTO Products (title,imageURL,description,price,rating,highlight,colorAndSizeAvailable) VALUES('"${
        result.title
      }"','"${result.imageURL}"','${des}','${JSON.stringify(
        result.price
      )}','${JSON.stringify(result.rating)}','${JSON.stringify(
        result.highlight
      )}','${JSON.stringify(
        result.colorAndSizeAvailable
      )}'); `;
      await client.query(query);

      console.log("data save");
    } catch (err) {
      console.log(result.description);
      console.log("data not save", err);
    }
  }
  return scrapper(pageNo - 1);
}

scrapper(1);
