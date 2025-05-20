import { Router, Request, Response } from 'express';
import {UsersCollection} from './user_m'

export const router = Router();

router.get('/test',(req, res) => 
    { 
        res.send(`we here`); 
    }); 

router.post('/', async (req, res) => {
    const user = await UsersCollection.create(req.body);
    //await user.save();
    res.status(201).send(user);
});

router.get('/', async (req, res) => {
    const users = await UsersCollection.find();
    res.send(users);
});
router.get('/:name', async (req, res) => {
    const name = req.params.name;              
    const users = await UsersCollection.findOne({name });
    res.send(users);
});

router.get('/byid/:id', async (req, res) => {
    const id = req.params.id;              
    const users = await UsersCollection.findById({ id });
    res.send(users);
});

router.delete('/:name', async (req, res) => {
    const name = req.params.name;              
    const users = await UsersCollection.findOneAndDelete({ name });
    res.send(users);
});