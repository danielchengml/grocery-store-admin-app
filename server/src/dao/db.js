const knexfile = require('../../knexfile');
const knex = require('knex');
const { PRODUCT_TABLE } = require('../lib/constants');

class PostgresDB {
    constructor() {
        this.db = this.init();
    }

    init() {
        return knex(knexfile);
    }

    ping() {
        return this.db.select()
            .from(PRODUCT_TABLE.NAME)
            .limit(1)
            .then(() => {
                return 'OK'
              }).catch((err) => {
                console.log("DB_PING_FAIL:", err)
                return 'FAIL'
              });
    }

    listProducts(limit) {
        return this.db.select()
            .from(PRODUCT_TABLE.NAME)
            .limit(limit)
            .then((data) => {
                return data;
              }).catch((err) => {
                throw err;
              });
    }

    getProduct(id) {
        return this.db.select()
            .from(PRODUCT_TABLE.NAME)
            .where({'id': id})
            .then((data) => {
                return data;
              }).catch((err) => {
                throw err;
              });
    }


    addProduct(payload) {
        return this.db.insert(payload)
            .into(PRODUCT_TABLE.NAME)
            .then((rows) => {
                return rows.rowCount;
            }).catch((err) => {
                throw err;
            })
    }

    editProduct(id, payload) {
        return this.db(PRODUCT_TABLE.NAME)
            .where({'id': id})
            .update(payload)
            .then((rows) => {
                return rows;
            }).catch((err) => {
                throw err;
            })
    }

    removeProduct(id) {
        return this.db(PRODUCT_TABLE.NAME)
            .where({'id': id})
            .delete()
            .then((rows) => {
                return rows;
            }).catch((err) => {
                throw err;
            })
    }
}

const db = new PostgresDB();
Object.freeze(db);
module.exports = db;