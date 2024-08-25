import { asyncHandler } from "../utils/asyncHandler.js";
import { Accomodation } from "../models/accomodation.model.js";
import { Transport } from "../models/transport.model.js";

const PriceCalculator = asyncHandler( async (req,res,next) => {
    const {holiday_inclusion} = req.body;
    // console.log(package_inclusion, duration);

    // console.log(holiday_inclusion)
    const transportArray = holiday_inclusion.transport;
    // console.log(transportArray)
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

    const accomodationArray = holiday_inclusion.accomodation;

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

    // console.log( accomodationTotalSum ,transportTotalSum)

    let sumAll = accomodationTotalSum + transportTotalSum;
    let finalPrice = sumAll * 1.20;
    // console.log(finalPrice)
    req.priceAccomodation = accomodationTotalSum;
    req.priceTransport = transportTotalSum;
    req.finalPrice = finalPrice;

    // console.log(finalPrice)
    next();


});

const calculateDuration = asyncHandler( async (req,res, next) => {
    const {startDate, endDate} = req.body;
    // console.log(duration);


         const newstartDate = new Date(startDate);
        const newendDate = new  Date(endDate);
        
        const differenceInTime = newendDate - newstartDate; // difference in milliseconds
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        // console.log(differenceInDays)

        req.durationInDays = differenceInDays;

        console.log(differenceInDays)
        next();
})


export { PriceCalculator , calculateDuration}