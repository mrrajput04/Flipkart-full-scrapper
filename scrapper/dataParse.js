const cheerio = require('cheerio');

const parseProductLinks = (html) => {
    const $ = cheerio.load(html);
    const data = $("._2UzuFa");
    if (data.length <= 0)
      return "nothing found";
    const list = [];
    data.each((index,ele)=>{
      list.push($(ele).attr("href"));
    })
    return list;
  }

  const parseProductDetails = (html)=>{ 
    const $ = cheerio.load(html);
      const productDetails = {};
    productDetails.title = $(".yhB1nd > span").text();
    productDetails.imageURL = $("._312yBx > img").attr("src");
    productDetails.price = {};
    productDetails.price.discountPrice = $("._25b18c > ._16Jk6d").text();
    productDetails.price.actualPrice = $(" div._3I9_wc._2p6lqe").text();
    productDetails.price.discountPercentage = $(" div._3Ay6Sb._31Dcoz.pZkvcx").text();
    
    productDetails.rating = {};
    productDetails.rating.overall = $("div._3LWZlK._3uSWvT").text();
    productDetails.rating.ratings = $("._2_R_DZ:first").text();
    productDetails.colorAndSizeAvailable = [];
    $("._3V2wfe").each((index, el) => {
      productDetails.colorAndSizeAvailable.push($(el).text());
    });
    productDetails.highlight = [];
    $("._3j4Zjq").each((index, el) => {
      productDetails.highlight.push($(el).text());
    });
      productDetails.description = $(
        "._1AN87F"
        ).text().slice(0,600);
        
        return productDetails;
      };




  module.exports = {parseProductLinks, parseProductDetails}