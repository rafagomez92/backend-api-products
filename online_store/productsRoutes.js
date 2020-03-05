import products from './products';
import { v4 as uuidv4 } from 'uuid';

export default (PRODUCTS, productsList, total, vendidos) => {
    PRODUCTS.get('/', (req, res) => {
        const viewActive = Number(req.query.status) === 1;
        const activeProducts = viewActive ? 
        productsList.filter(p => p.stock > 0)
        : productsList;
        res.json({ status: 'ok', result: activeProducts });       
    });
    
    PRODUCTS.get('/:id', (req, res) => {
        const product = productsList.find(p => p.id === req.params.id);
        if (product) {
            res.json({ status: 'ok', result: product });
        } else {                        
            res.sendStatus(404);        
        }
    });

    PRODUCTS.put('/agregar', (req, res) => {             
        const addProduct = {
            id: uuidv4(),
            name: req.query.name,
            stock: req.query.stock,
            value: req.query.value
        };
        const product = productsList.find(p => p.name === addProduct.name);           
        if (product) {
            res.send('Este producto ya fue agregado');
        } else {            
            productsList.push(addProduct);
            console.log(addProduct);
            res.json({ status: 'ok', result: addProduct });       
        }
    });

    PRODUCTS.put('/:id', (req, res) => {
        const product = productsList.find(p => p.id === req.params.id);
        if (product && product.stock > 0) {                        
            vendidos += product.value;
            product.stock--;            
            total += product.value;    
            console.log(total);                                      
            res.json({ status: 'ok', result: product });
        } else {
            res.sendStatus(404);            
        }                
    });
    
    PRODUCTS.delete('/:id', (req, res) => {
        const product = productsList.find(p => p.id === req.params.id);
        if (product) {
            productsList = productsList.filter(p => p.id !== req.params.id);
            res.json({ status: 'ok', result: product });
        } else {
            res.sendStatus(404);            
        }               
    });


}