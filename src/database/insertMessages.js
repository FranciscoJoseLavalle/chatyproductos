import options from '../options/mysql.js';
import knex from 'knex';

const database = knex(options);

const messages = [
    {user: 'Strange', message: 'Holaaaa', date: 'Hoy'}
]
database('messagestable').insert(messages).then( result => console.log(result)).catch(console.log).finally(() => database.destroy())