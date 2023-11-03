const productList = require('../files/product_list.json');

exports.seed = async (knex) => {
  if (productList.length > 0) {
    try {
      await knex('product').insert(productList)
      console.log("seeded product table")
    } catch (err) {
      console.log("couldn't insert products")
    }
  }
  return;
}
