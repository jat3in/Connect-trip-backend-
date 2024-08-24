import { asyncHandler } from "../utils/asyncHandler.js";
import { Accomodation } from "../models/accomodation.model.js";
import { Transport } from "../models/transport.model.js";
import { Activity} from "../models/activities.model.js";
import mongoose from "mongoose";


const PriceCalculator = asyncHandler( async (req,res,next) => {
    const {package_inclusion} = req.body;
    // console.log(package_inclusion, duration);
    const transportArray = package_inclusion.transport;
    // const priceTransport =  transportArray.map( async (data) => {
    //    transportFind = await Transport.findOne({_id: data}).select("price");
    //    const price = transportFind.price++;
    //   transportPriceArray.push(price);
    //   console.log(transportPriceArray)
    //    return transportPriceArray;
    // //    console.log(transportFind.price++);
    // });
    
    const priceTransport = await Promise.all(
        transportArray.map(async (data) => {
            const transportFind = await Transport.findOne({ _id: data }).select("price");
            return transportFind.price; // Return the price directly
        })
    );
    
   
    const transportTotalSum = priceTransport
    .map(price => parseFloat(price.toString()))  // Convert Decimal128 to number
    .reduce((acc, curr) => acc + curr, 0); 

    // console.log(priceTransport, totalSum);

    // console.log(transportPriceArray)


    // console.log(priceTransport)
    


    // for(let i = 1; i<= transport; i++){
    //     console.log(package_inclusion.transport[i])
    //    const transportPrice = await Transport.findOne({_id: transport[i]}).select("price");
    //     // transport_price = transportPrice.price;
    //     console.log(transportPrice)

    // }

    // console.log(transport_price)


    // accomodations price calculation

    const accomodationArray = package_inclusion.accomodation;

    const priceAccomodation = await Promise.all(
        accomodationArray.map(async (data) => {
            const accomodationFind = await Accomodation.findOne({ _id: data }).select("price");
            return accomodationFind.price; // Return the price directly
        })
    );

    const accomodationTotalSum = priceAccomodation
    .map(price => parseFloat(price.toString()))  // Convert Decimal128 to number
    .reduce((acc, curr) => acc + curr, 0); 

    // console.log(accomodationTotalSum)

    const activitiesArray = package_inclusion.activities;

    const priceActivities = await Promise.all(
        activitiesArray.map(async (data) => {
            const activitiesFind = await Activity.findOne({ _id: data }).select("price");
            return activitiesFind.price; // Return the price directly
        })
    );

    const activitiesTotalSum = priceActivities
    .map(price => parseFloat(price.toString()))  // Convert Decimal128 to number
    .reduce((acc, curr) => acc + curr, 0); 

    // console.log(activitiesTotalSum + accomodationTotalSum + transportTotalSum)

    let sumAll = activitiesTotalSum + accomodationTotalSum + transportTotalSum;
    let finalPrice = sumAll * 1.20;
    console.log(finalPrice)

    req.finalPrice = finalPrice;
    next();


});


export { PriceCalculator }