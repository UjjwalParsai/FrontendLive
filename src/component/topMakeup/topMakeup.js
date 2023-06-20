import { useSelector } from "react-redux"
import "./topMakeup.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { settings } from "../Slider/slider";
import { useNavigate } from "react-router-dom";

function TopMakeup() {
    const { topMakeupList, isLoding, error } = useSelector(state => state.topMakeup)

    const navigate =useNavigate();

    const detail=(makeup)=>{
        navigate("/makeup-detail",{state:{makeup}}) 
     }

    return <div className="container-fluid">
        <div className="container">
            <div className="row">
                <div className="mt-4 col-lg-12">
                    <p style={{fontFamily:"Merriweather,Merriweather-fallback-TimesNewRoman,times,serif", fontWeight:"700", fontSize:"1.50rem"}}>Makeup <span className="text-danger">-Artist</span></p>
                </div>
            </div>
        </div>

        <div className="container">
            
                <Slider {...settings}>
                {!error && topMakeupList.map((makeup, index) => <div className="card   Div">
                <img onClick={()=>detail(makeup)} className="card-image" src={makeup?.thumbnail} width={"100%"} height={"270px"} />
                    <div className=" card-body ">
                        <div className="card-text">
                        <p className=" title " >{makeup?.title}</p>
                        <p className=" "><span style={{fontWeight:"500"}}> <i className="fa fa-star" style={{color:"#fabb00"}}></i> {makeup?.rating+" "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {makeup?.address.substring(0,15)+"...."} </span></p>
                        <h6 className="mt-2">From ₹{makeup?.services[0].price}</h6> 
                        </div>
                       
                        
                        </div>
                </div>)}

                </Slider>
                
                
                
            </div>
           
        </div>
   
}

export default TopMakeup