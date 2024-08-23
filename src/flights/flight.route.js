import {Router} from "express";
import { locationSearch } from "./flight.controller.js";

const router = Router();

router.route("/location").get(locationSearch);



export default router;