const cheerio = require('cheerio');

const parseProductLinks = (html) => {
    const $ = cheerio.load(html);
    const data = $("._2UzuFa");
    // const data = "www.flipkart.com"+dat;
    // console.log(data)/
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
    productDetails.rating.ratings = $("._2_R_DZ")[0].innerText;
    // productDetails.colorAndSize = [];
    // $(".attr-val").each((index, el) => {
    //   productDetails.colorAndSize.push($(el).text());
    // });
    // productDetails.highlight = [];
    // $(".dtls-li > span.h-content").each(
    //   (index, el) => {
    //     productDetails.highlight.push($(el).text());
    //   }
    //   );
    //   productDetails.description = $(
    //     "#id-tab-container > div > div:nth-child(3) > div.spec-body > div "
    //     ).text().trim();
        
        return productDetails;
      };




  module.exports = {parseProductLinks, parseProductDetails}