import knex from 'knex';

const database = knex({
    client: 'sqlite3',
    connection: {
        filename: './sqliteDatabase.sqlite'
    },
    useNullAsDefault: true
})

class FileSQL {
    constructor(fileName) {
        this.fileName = fileName
    }

    async getAll() {
        try {
            let exists = await database.schema.hasTable(this.fileName);
            if (exists) {
                await database(this.fileName).del();
            } else {
                await database.schema.createTable(this.fileName, table => {
                    table.primary('id');
                    table.increments('id');
                    table.string('user');
                    table.string('message');
                    table.string('date');
                })
            }
            const allItems = await database(this.fileName).select('*');

            return allItems
        } catch (error) {
            return {response: 'Cannot get the products' + error}
        }
    }

    async getById(id) {
        try {
            const allItems = JSON.parse(
                await fs.promises.readFile(`src/database/${this.fileName}.json`, 'utf-8')
            )

            const itemFound = allItems.find((item) => item.id === Number(id))

            return itemFound
        } catch (error) {
            console.log(`ERROR: ${error}`)
        }
    }

    async addItem(object) {
        try {
            await database(this.fileName).insert([object]);
        } catch (error) {
            console.log(`ERROR: ${error}`)
        }
    }

    async editById(object) {
        try {
            let allItems = JSON.parse(
                await fs.promises.readFile(`src/database/${this.fileName}.json`, 'utf-8')
            )

            allItems = allItems.map((item) => (item.id !== object.id ? item : object))

            await fs.promises.writeFile(
                `src/database/${this.fileName}.json`,
                JSON.stringify(allItems),
                'utf-8'
            )
        } catch (error) {
            console.log(`ERROR: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            const allItems = JSON.parse(
                await fs.promises.readFile(`src/database/${this.fileName}.json`, 'utf-8')
            )

            const filteredItemList = allItems.filter((item) => item.id !== Number(id))

            if (JSON.stringify(allItems) === JSON.stringify(filteredItemList)) {
                return false
            } else {
                await fs.promises.writeFile(
                    `src/database/${this.fileName}.json`,
                    JSON.stringify(filteredItemList),
                    'utf-8'
                )
                return true
            }
        } catch (error) {
            console.log(`ERROR: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`src/database/${this.fileName}.json`, JSON.stringify([]), 'utf-8')
        } catch (error) {
            console.log(`ERROR: ${error}`)
        }
    }
}

export default FileSQL;