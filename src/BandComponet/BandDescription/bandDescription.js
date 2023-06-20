import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import Map from "../../component/Map/map";
import HoverRating from "../../component/rating/rating";

function BandDescription() {
  const band = useLocation().state?.band;
  const [rating,setRating] =useState(0);
  

  return <div className="container  mt-5 ">
    <div className="row ">
      <div className="col-lg-12">
        <p className="name">{band?.title}</p>
        <p className="text-muted" style={{ fontSize: "1.10rem" }}><i className="fa fa-map-marker"></i> {band?.address}</p>
        <p ><i className="fa fa-star" style={{ color: "#fabb00" }}></i> {band?.rating}</p>
      </div>

    </div>

    <div className="row" style={{ width: "340px" }}>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <button className=" btn btn-danger mt-2">Request Booking</button>
      </div>

      <div className="col-lg-6 col-md-12 col-sm-12 ">
        <button className="btn btn-success mt-2">Check Availabilty</button>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col-lg-8 col-md-8 col-sm-12">

        {/* carousal */}
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active ">
              <img src={band?.thumbnail} width={"100%"} height={"560vw"} />
            </div>

            {band?.images.map((image, index) => <div className="carousel-item"><img src={image} className="" width={"100%"} height={"550vw"} /> </div>)}

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
        <p>Starting From<span style={{ fontWeight: "700", fontSize: "1.15rem" }}>₹{band?.services[0].price} </span></p>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col-lg-8 col-md-8 col-sm-12">
        <p className="heading">About</p>
        <p>{band?.description}</p>
      </div>
    </div>


    <div className="row mt-3">

      <div className="col-lg-5 col-md-5">
      <p className="heading">Rating</p>
         
         
          <HoverRating rating={rating} setRating={setRating}/>
          
      </div>
      <div className="col-lg-7 col-md-7 col-sm-12">
      <p className="heading">Map</p>
        <Map service={band} />

      </div>
    </div>


  </div>
}

export default BandDescription;