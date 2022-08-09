import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import File from './classes/file.js';
let newFile = new File('chatMessages');
let newProduct = new File('products');

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
        await io.emit('log', archivo);
    })

    socket.on('addProduct', async (data) => {
        await newProduct.addItem(data);
        let product = await newProduct.getAll();
        await io.emit('sendProduct', product)
    })
})