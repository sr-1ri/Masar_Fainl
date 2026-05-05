import { Router, type IRouter } from "express";
import healthRouter from "./health";
import anthropicRouter from "./anthropic";
import masarRouter from "./masar";

const router: IRouter = Router();

router.use(healthRouter);
router.use(anthropicRouter);
router.use(masarRouter);

export default router;
