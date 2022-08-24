import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import File from './classes/file.js';
import FileSQL from './classes/fileSQL.js';
let newFile = new FileSQL('messagestable');
let newProduct = new FileSQL('products');

const app = express();
const server = app.listen(8080, () => console.log("Escuchando en puerto 8080"));
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);

io.on('connection', async socket => {
    console.log('Socket connected');
    socket.broadcast.emit('newUser')
    
    socket.on('userConnected', async (data) => {
        let archivo = await newFile.getAll();
        await io.emit('log', archivo);

        let product = await newProduct.getAll();
        await io.emit('sendProduct', product)
    })

    socket.on('message', async (data) => {
        await newFile.addItem(data)
        let archivo = await newFile.getAll();
        console.log(archivo);
        await io.emit('log', archivo);
    })

    socket.on('addProduct', async (data) => {
        await newProduct.getAll();
        await newProduct.addItem(data);
        let product = await newProduct.getAll();
        console.log(product);
        console.log(data);
        await io.emit('sendProduct', product)
    })
})