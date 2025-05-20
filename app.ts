import express, { Request, Response }  from 'express';
import {router as usersRouter} from './users/user_controller';
import cartsRouter from './carts/cart_controller';
import {myDB} from './db';
const app = express();

app.use(express.json());
myDB.getDB();
// נתיבי ה-API
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);

app.use((err: Error, req: Request , res: Response, next: any) => {
    res.status(500).send('משהו השתבש!');
});

export default app;