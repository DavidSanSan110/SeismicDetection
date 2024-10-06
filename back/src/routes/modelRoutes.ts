import { Router } from "express";
import { ExampleController } from "../controllers/modelController";

const router = Router();
const modelController = new ExampleController();

router.get("/", modelController.register);

export default router;

