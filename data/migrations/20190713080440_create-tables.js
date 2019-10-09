
exports.up = function(knex) {
  return knex.schema
    .createTable('schemes', tbl => {
      tbl.increments();
      tbl.text('scheme_name', 128)
        .unique()
        .notNullable();
    })
    .createTable('steps', tbl => {
      tbl.increments();
      tbl.integer('step_number')
        .unsigned()
        .notNullable();
      tbl.text('instructions', 128)
        .notNullable();
      tbl.integer('scheme_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('schemes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('steps')
    .dropTableIfExists('schemes')
    .dropTableIfExists('instructions');
};
