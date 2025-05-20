import { Router } from "express";
import passport from '../config/passport-config.js';
import { authorizeRole } from '../middlewares/authorization.js';
import { productController } from "../controllers/product-controller.js";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.post(
  "/",
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  productController.create
);

router.put(
  "/:id",
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  productController.update
);

router.delete(
  "/:id",
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  productController.delete
);

export default router;