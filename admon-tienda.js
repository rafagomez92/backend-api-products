import http from 'http';
import express from 'express';
import productsRoutes from './online_store/productsRoutes';
import productsList from './online_store/products';
import adminRoutes from './online_store/adminRoutes';

const APP = express();
const PRODUCTS = express();
const ADMIN = express();
let total = 0;
let vendidos = 0;

APP.use('/products', PRODUCTS);  //Ruta exclusiva para products
APP.use('/admin', ADMIN);  //Ruta exclusiva para administración

const SERVER = http.createServer(APP);

APP.get('/', (req, res) => {
    console.log(vendidos);
    res.send('API HOME');    
});

APP.get('/vendidos', (req, res) => {    
    const valueTotal = String(total);
    // console.log(valueTotal);
    // console.log(total);
    res.send(valueTotal);
});

productsRoutes(PRODUCTS, productsList, total, vendidos);
adminRoutes(ADMIN, productsList,total);


SERVER.listen(3000);

