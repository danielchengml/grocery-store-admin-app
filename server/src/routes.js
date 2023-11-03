const healthController = require("./controllers/health_controller");
const productController = require("./controllers/product_controller");

const routes = (router) => {
    router.get('/api/v1/healthcheck', healthController.show);
    router.get('/api/v1/products', productController.listProducts);
    router.post('/api/v1/product', productController.addProduct);
    router.put('/api/v1/product/:id', productController.editProduct);
    router.get('/api/v1/product/:id', productController.getProduct);
    router.delete('/api/v1/product/:id', productController.removeProduct);
    router.get('/api/v1/presignedUrl', productController.getPresignedUrl);
    router.put('/api/v1/upload', productController.uploadToBucket);
};

export default routes;