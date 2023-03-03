/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .hasColumn("customers_subscriptions", "isAcitve")
    .then((exist) => {
      if (exist) {
        return knex.schema.alterTable("customers_subscriptions", (table) => {
          table.renameColumn("isAcitve", "isActive");
        });
      }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
