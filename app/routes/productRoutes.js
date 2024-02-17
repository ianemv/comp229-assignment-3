import express from "express";
import productCtrl from "../controllers/productsController.js";

const router = express.Router();

router.route("/api/products")
    .get(productCtrl.list)
    .post(productCtrl.create)
    .delete(productCtrl.deleteAll); 

router.route("/api/products/:productId")
    .get(productCtrl.read)
    .put(productCtrl.update)
    .delete(productCtrl.remove);
router.param('productId', productCtrl.productByID);

export default router;
