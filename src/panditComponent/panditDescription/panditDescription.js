import { useLocation } from "react-router-dom"
import { useState } from "react";
import Map from "../../component/Map/map";
import HoverRating from "../../component/rating/rating";

function PanditDescription() {
  const pandit = useLocation().state.pandit;
  const [rating,setRating] =useState(0);
  

  return <div className="container  mt-5 ">
    <div className="row ">
      <div className="col-lg-12">
        <p className="name">{pandit.title}</p>
        <p className="text-muted" style={{ fontSize: "1.10rem" }}><i className="fa fa-map-marker"></i> {pandit.address}</p>
        
      </div>

    </div>

    <div className="row p-1" style={{ width: "450px" }} >
      <div className="col-lg-4 col-md-12 col-sm-12 ">
       <button className="btn  text-white mt-2" style={{backgroundColor:"#00b300",fontSize:"1.1rem"}}><i className="fa fa-phone" style={{  }}></i>   Contact</button>
      </div>

      <div className="col-lg-2 col-md-12 col-sm-12 mt-2">
      <p style={{fontSize:"1.1rem",fontWeight:"500"}} ><i className="fa fa-star" style={{ color: "#fabb00"}}></i> {pandit.rating}</p>
      </div>
      <div className="col-lg-5 col-md-12 col-sm-12 mt-2">
      <p  >Experience   <span style={{fontSize:"1.1rem",fontWeight:"500"}}>{pandit.experience}+</span></p>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col-lg-8 col-md-8 col-sm-12">

        {/* carousal */}
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active ">
              <img src={pandit.thumbnail} width={"100%"} height={"550vw"} />
            </div>

            {pandit.images.map((image, index) => <div className="carousel-item"><img src={image} className="" width={"100%"} height={"550vw"} /> </div>)}

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col-lg-8 col-md-8 col-sm-12">
        <p>Starting Price <span style={{ fontWeight: "700", fontSize: "1.15rem" }}>₹{pandit.services[0].price} </span></p>
        <hr/>
      </div>
     
    </div>

    <div className="row mt-3">
      <div className="col-lg-8 col-md-8 col-sm-12">
        <p className="heading">About</p>
        <p>{pandit.description}</p>
        
      </div>
      <hr/>

      <div className="col-lg-8 col-md-8 col-sm-12">
        <p className="heading">Services</p>
        
          <div className="row">
            {pandit.services.map((service,index)=>  <div className="col-md-3">
                <p style={{fontWeight:500}}>{service.service}</p><p className="text-muted">{service.price}</p> </div>)}
          </div>
          
      </div>
      <hr/>
    </div>


    <div className="row mt-3">

      <div className="col-lg-5 col-md-5">
      <p className="heading">Write A Review</p>
      <hr/>
      <form>
          <div className="m-1" >
            <p>Rate <span style={{fontWeight:500}}> {pandit.title}</span></p>
            <HoverRating rating={rating} setRating={setRating} />
          </div>

          <div className="mt-1">
            <label style={{fontWeight:500}}>Your Review</label>
            <textarea className="form-control mt-1" type="textarea"  rows="5" cols="50"></textarea>

          </div>
        <div className=" mt-3"> <button className="btn text-white" type="submit" style={{backgroundColor: "#fb1b26"}}>Submit</button></div>  
        
        

        </form>
          
      </div>
      <div className="col-lg-7 col-md-7 col-sm-12">
      <p className="heading">Map</p>
        <Map service={pandit} />

      </div>
    </div>


  </div>
}

export default PanditDescription