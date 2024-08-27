import { asyncHandler } from "../utils/asyncHandler.js";


const calculateRoute = asyncHandler( async (req,res) => {
    const {transport_from, transport_to} = req.body;
    console.log(transport_from, transport_to);
    
    
})