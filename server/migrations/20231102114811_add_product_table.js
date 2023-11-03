
exports.up = function(knex) {
    return knex.schema.createTable('product', (t) => {
        t.bigIncrements('id').notNullable().primary();
        t.string('name').unique().notNullable();
        t.string('description');
        t.string('image_url');
        t.decimal('price');
        t.timestamps(true, true);
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('product')
};
