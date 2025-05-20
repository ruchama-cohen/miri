import { Router, Request, Response } from 'express';
import service from './cart_service';

const router = Router();

// קבלת סל קיים
router.get('/:userId',async (req : Request, res : Response) => {
const cart = await service.getCartByUser(req.params.userId);
if (!cart) 
   res.status(404).send('Cart not found');
res.json(cart);
});
  
// יצירת סל חדש
router.post('/:userId', async (req: Request, res: Response) => {
  const cart = await service.createCart(req.params.userId);
  res.status(201).json(cart);
});

// הוספת מוצר לסל
router.post('/:userId/items', async (req: Request, res: Response) => {
  const { productId, name, quantity, price } = req.body;
  const cart = await service.addItemToCart(req.params.userId, {
    productId, name, quantity, price
  });
  res.json(cart);
});

// עדכון כמות מוצר
router.patch('/:userId/items/:productId', async (req: Request, res: Response) => {
  const cart = await service.updateItemQuantity(
    req.params.userId,
    req.params.productId,
    Number(req.body.quantity)
  );
  res.json(cart);
});

// הסרת מוצר מהסל
router.delete('/:userId/items/:productId', async (req: Request, res: Response) => {
  const cart = await service.removeItemFromCart(
    req.params.userId,
    req.params.productId
  );
  res.json(cart);
});

export default router;