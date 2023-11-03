// import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const productsDirectory = path.join(process.cwd(), 'products');

export async function getSortedProductsData() {
  let res = await fetch('http://grocery-store-server:4000/api/v1/products');
  let allProductsData = await res.json()
  return allProductsData.sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getAllProductIds() {

    let res = await fetch('http://grocery-store-server:4000/api/v1/products');
    let products = await res.json();

    return products.map((product) => {
      return {
        params: {
          id: product.id,
        },
      };
    });
}

export async function getProductData(id) {
    let res = await fetch(`http://grocery-store-server:4000/api/v1/product/${id}`);
    let product = await res.json()
    return product[0]
}

export async function addProduct(payload) {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };
    try {
        let fetchResponse = await fetch('/api/product/create', settings);
        let product = await fetchResponse.json();
        return product
    } catch (e) {
        return e;
    }  

}

export async function getPresignedUrl() {
  try {
      let res = await fetch('/api/image/getPresignedUrl');
      let url = await res.json();
      return url
  } catch (e) {
      return e;
  }  
}

export async function uploadToBucket(url, file) {

  try {
    const settings = {
      method: 'PUT',
      headers: {
          Accept: 'image/png',
          'Content-Type': 'image/png',
      },
      body: file
    };
    console.log("this.url!!!", url)
    console.log("this.settings!!!", settings)
    let res = await fetch(url, settings);
    let data = await res.json();
    console.log("this.data!!!", data)
    return data
  } catch (e) {
      return e;
  }  

}