import options from '../options/mysql.js';
import knex from 'knex';

const database = knex(options);

database('messagestable').select('*').then(result => console.log(JSON.parse(JSON.stringify(result)))).catch(console.log).finally(()=> database.destroy());