import { Outlet } from "react-router-dom";
import PanditCarousal from "../PanditCarousal/panditCarousal";
import PanditCard from "../PanditCard/panditCard";

function PanditHome(){
    return <>
      <PanditCarousal/>
      <PanditCard/>
    </>
}

export default PanditHome