import { Outlet, Route, Routes } from "react-router-dom";
// import VenueDescription from "../Description/description";
import VenueCarousal from "../VenueCarousal/venueCarousal";
import VenueCard from "../VenueCard/venueCard";

function venueHome(){
    
    
    return <>
      
       <VenueCarousal/>
       <VenueCard/>
       <Outlet/>

    </>
}

export default venueHome