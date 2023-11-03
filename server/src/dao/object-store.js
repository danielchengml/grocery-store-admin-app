const Minio = require('minio');
const miniofile = require('../../configs/miniofile');
const { OBJECT_BUCKET } = require('../lib/constants');

class ObjectStore {
    constructor() {
        this.client = this.init();
    }

    init() {
        return new Minio.Client(miniofile);
    }

    getPresignedUrl(name, res) {
        this.client.presignedPutObject(OBJECT_BUCKET.NAME, name, (err, url) => {
            if (err) throw err
            return res.status(200).json({url});
        })
    }

    uploadFile(name, file) {
        this.client.putObject(OBJECT_BUCKET.NAME, name, file, function (err, etag) {
            if (err) return console.log(err)
            console.log('File uploaded successfully.', etag)
        });
    }
}

const os = new ObjectStore();
Object.freeze(os);
module.exports = os;