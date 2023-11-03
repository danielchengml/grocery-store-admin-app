import db from '../dao/db'
import os from '../dao/object-store'
const uuid = require('uuid');

export const listProducts = (req, res) => {
    const DEFAULT_COUNT = 100;
    let count = req.query.count ? req.query.count : DEFAULT_COUNT;
    return db.listProducts(count)
      .then((products) => {
        return res.status(200).json(products);
      }).catch((err) => {
        console.log(`ListProductsErr: ${err}`)
        return res.status(500)
          .json({"ListProductsError" : "Something went wrong. Please try again."})
      });
}

export const getProduct = (req, res) => {
    let { id } = req.params;
    return db.getProduct(id)
        .then((row) => {
            return res.status(200).json(row);
        }).catch((err) => {
            console.log(`GetProductsErr: ${err}`)
            return res.status(400)
                .json({"GetProductsError" : err})
        });
}

export const addProduct = (req, res) => {
    let payload = req.body;
    return db.addProduct(payload)
        .then((row) => {
            return res.status(200).json(row);
        }).catch((err) => {
            console.log(`AddProductsErr: ${err}`)
            return res.status(500)
                .json({"AddProductsError" : err})
        });
}

export const editProduct = (req, res) => {
    let payload = req.body
    let { id } = req.params;
    return db.editProduct(id, payload)
        .then((row) => {
            return res.status(200).json(row);
        }).catch((err) => {
            console.log(`EditProductsErr: ${err}`)
            return res.status(500)
                .json({"EditProductsError" : err})
        });
}

export const removeProduct = (req, res) => {
    let { id } = req.params;
    return db.removeProduct(id)
        .then((row) => {
            return res.status(200).json(row);
        }).catch((err) => {
            console.log(`RemoveProductsErr: ${err}`)
            return res.status(500)
                .json({"RemoveProductsError" : err})
        });
}

export const getPresignedUrl = async (req, res) => {
    let name = uuid.v4();
    try {
        return os.getPresignedUrl(name, res);
    } catch (err) {
        return res.status(500)
            .json({"GetPresignedUrlError" : err})
    }
}

export const uploadToBucket = async (req, res) => {
    if (req && req.files) {
        let file = req.files[0];
        console.log("req.body", req.files[0])
        try {
            let url = await os.uploadFile(file.originalname, file.buffer);
            return res.status(200).json({"url" : url})
    
        } catch (err) {
            return res.status(500)
                .json({"UploadToBucketError" : err})
        }
    } else {
        return res.status(400)
            .json({"UploadToBucketError" : "req.files empty " + req.files})
    }
}