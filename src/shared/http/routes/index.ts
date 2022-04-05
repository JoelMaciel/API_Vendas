import productsRoutes from '@modules/products/routes/Product.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/products', productsRoutes);

export default routes;
