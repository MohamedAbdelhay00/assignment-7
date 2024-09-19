import express from 'express';
import mongoose from './db/dbConn.js';
import customerRouter from './modules/customer/customer.routes.js';
import carRouter from './modules/cars/car.routes.js';
import rentalRouter from './modules/rental/renral.routes.js';
const app = express()
const port = 3000

app.use(express.json());

app.use('/api/users', customerRouter);
app.use('/api/cars', carRouter);
app.use('/api/rentals', rentalRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))