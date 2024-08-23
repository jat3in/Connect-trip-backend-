import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { FlightData } from "./flights.data.js";



const locationSearch = asyncHandler( async (req,res) => {
    const { from, to, date } = req.query;

    // Filter flights based on search parameters
    const filteredFlights = FlightData.filter(flight => {
        
      const matchesDeparture = from
        ? flight.departure.airport.municipalityName === from
        : true;
      const matchesArrival = to
        ? flight.arrival.airport.municipalityName === to
        : true;
      const matchesDate = date
        ? new Date(flight.departure.actualTimeLocal).toISOString().split('T')[0] === date
        : true;
  
      return matchesDeparture && matchesArrival && matchesDate;
    });
  
    // Return the filtered flights

    if (filteredFlights.length > 0) {
      res.status(200).json(new ApiResponce(200,filteredFlights,"Flight found successfully"));
    } else {
      res.status(404).json(new ApiError(404,"Flight not found"));
    }
 
});


export {locationSearch}