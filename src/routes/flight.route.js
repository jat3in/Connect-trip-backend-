import {Router} from "express";
import { locationSearch } from "../controllers/flight.controller.js";

const router = Router();

router.route("/location").get(locationSearch);



export default router;