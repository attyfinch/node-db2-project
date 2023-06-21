/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('cars').truncate()
  await knex('cars').insert([
    {vin: '1233', make: 'Ford', model: 'Mustang',mileage: '55000', title: 'Restoration', transmission: 'Manual'},
    {vin: '5343', make: 'BMW', model: '3 Series', mileage: '75000', title: 'Salvage', transmission: null},
    {vin: '9877', make: 'Honda', model: 'Accord', mileage: '100000', title: null, transmission: 'Automatic'},
    {vin: '6579', make: 'Ford', model: 'F150', mileage: '25000', title: "New", transmission: 'Automatic'},
    {vin: '3876', make: 'Toyota', model: 'Prius', mileage: '200000', title: 'Used', transmission: 'Automatic'}
  ]);
};

/*
 field        | data type        | metadata                                            |
| ------------ | ---------------- | --------------------------------------------------- |
| id           | unsigned integer | primary key, auto-increments, generated by database |
| vin          | string           | required, unique                                    |
| make         | string           | required                                            |
| model        | string           | required                                            |
| mileage      | numeric          | required                                            |
| title        | string           | optional                                            |
| transmission | string           | optional                                            |
*/