import products from './products';
import { v4 as uuidv4 } from 'uuid';

export default (ADMIN, productsList, total) => {          
    ADMIN.get('/', (req, res) => {        
        const viewActive = Number(req.query.status) === 1;
        const activeProducts = viewActive ? 
        productsList.filter(p => p.stock > 0)
        : productsList;
        res.json({ status: 'ok', result: activeProducts });       
    });

    ADMIN.put('/agregar', (req, res) => {             
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
            res.json({ status: 'ok', result: addProduct });       
        }
    });

    ADMIN.put('/:id', (req, res) => {
        const product = productsList.find(p => p.id === req.params.id);        
        if (product && product.stock > 0) {                        
            total += product.value;
            product.stock--;
            product.total += product.value;                        
            console.log(total);                                      
            res.json({ status: 'ok', result: product });
        } else {
            res.sendStatus(404);            
        }                
    });

    ADMIN.delete('/:id', (req,res) => {
        const product = productsList.find(p => p.id === req.params.id);
        if(product) {
            productsList = productsList.filter(p => p.id !==req.params.id);
            res.json({ status: 'ok', result: product });
        } else {
            res.sendStatus(404);
        }
    });

    ADMIN.post('/:id', (req, res) => {        
        const product = productsList.find(p => p.id === req.params.id);
        const   productInput = Number(req.query.quantity);
        if (product && product.stock >= 0) {                                    
            if(productInput) {
                product.stock += productInput;
            } else {
                product.stock++;                                    
            }
            res.json({ status: 'ok', result: product });
        } else {
            res.sendStatus(404);            
        }                
    });

    ADMIN.get('/total/products', (req, res) => {        
        res.send(String(total));
    });

    ADMIN.get('/total/products/:id', (req, res) => {        
        const product = productsList.find(p => p.id === req.params.id);
        if(product) {
            res.json(product.total);
        } else {
            res.sendStatus(404);
        }
    });






}