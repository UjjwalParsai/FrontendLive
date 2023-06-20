import Slider from "react-slick"
import { settings } from "../../component/Slider/slider"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function TopPandit(){
    const{topPanditList,isLoading,error}=useSelector(state=>state.topPandit)

const navigate=useNavigate()
    const details=(pandit)=>{
      navigate("/pandit-detail",{state:{pandit}})
    }

    return <div className="container-fluid">
    <div className="container">
        <div className="row">
            <div className="mt-4 col-lg-12">
                <p style={{fontFamily:"Merriweather,Merriweather-fallback-TimesNewRoman,times,serif", fontWeight:"700", fontSize:"1.50rem"}}>Pan<span className="text-danger">dit</span></p>
            </div>
        </div>
    </div>

    <div className="container">
        
            <Slider {...settings}>
            {!error && topPanditList.map((pandit, index) => <div className="card   Div">
            <img onClick={()=>details(pandit)} className="card-image" src={pandit.thumbnail} width={"100%"} height={"270px"} />
                <div className=" card-body ">
                    <div className="card-text">
                    <p className=" title " >{pandit.title}</p>
                    <p className=""><span style={{fontWeight:"500"}}> <i className="fa fa-star" style={{color:"#fabb00"}}></i> {pandit.rating+" "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {pandit.address.substring(0,15)+"...."} </span></p>
                    <h6 className="mt-2"> charges ₹<span className="text-bold">{pandit.charges}</span></h6> 
                    </div>
                   
                    
                    </div>
            </div>)}

            </Slider>
            </div>
           
           </div>
}

export default TopPandit