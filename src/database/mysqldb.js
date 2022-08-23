import options from '../options/mysql.js';
import knex from 'knex';

const database = knex(options);
database.schema.createTable('messagesTable', table => {
    table.primary('id');
    table.increments('id');
    table.string('user',20);
    table.string('message',600);
    table.string('date',30)
}).then(() => console.log("Table created")).catch(err => console.log(err)).finally(() => database.destroy());