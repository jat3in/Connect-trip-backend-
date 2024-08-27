import { asyncHandler } from "../utils/asyncHandler.js";


const calculateRoute = asyncHandler( async (req,res,next) => {
    const {transport_from, transport_to} = req.body;
    // console.log(transport_from, transport_to);

    const route = `${transport_from} - ${transport_to}`;
    // console.log(route);

    req.route = route;
    next();   
});

export {calculateRoute}