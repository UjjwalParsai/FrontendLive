import { useSelector } from "react-redux"
import "./topVenue.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { settings } from "../Slider/slider";
import { Link, useNavigate } from "react-router-dom";

function TopVenue() {
    const { topVenueList, isLoding, error } = useSelector(state => state.topVenue)
    const navigate = useNavigate();

   const detail=(venue)=>{
       navigate("/venue-detail",{state:{venue}}) 
    }

    return <div className="container-fluid">
        <div className="container">
            <div className="row">
                <div className="mt-4 col-lg-12">
                    <p style={{fontFamily:"Merriweather,Merriweather-fallback-TimesNewRoman,times,serif", fontWeight:"700", fontSize:"1.50rem"}}>Wedding <span className="text-danger">-Venues</span></p>
                </div>
            </div>
        </div>

        <div className="container">
            
                <Slider {...settings}>
                {!error && topVenueList.map((venue, index) => <div className="card  Div">
                   
                <img onClick={()=>detail(venue)} className="card-image " src={venue.thumbnail} width={"100%"} height={"250px"} />
            
                    <div className=" card-body ">
                        <div className="card-text">
                        <p className=" title " >{venue.title}</p>
                        <p className=""><span style={{fontWeight:"500"}}> <i className="fa fa-star" style={{color:"#fabb00"}}></i> {venue.rating+" "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {venue.address.substring(0,15)+"...."} </span></p>
                        <h6 className="mt-2"> charges ₹<span className="text-bold">{venue.charges}</span></h6> 
                        </div>
                       
                        
                        </div>
                </div>)}

                </Slider>
                
                
                
            </div>
           
        </div>
   
}

export default TopVenue