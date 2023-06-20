import { useLocation, useNavigate } from "react-router-dom"
import "./description.css"
import React, { useEffect, useRef, useState } from "react";
import Map from "../../component/Map/map";
import HoverRating from "../../component/rating/rating";
import GetMap from "../../component/Map/map2";

import RequestForm from "../RequestForm/venueRequestForm";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";



function VenueDescription() {

  const {currentUser}=useSelector(state=>state.CurrentUser)

  const venue = useLocation().state.venue;
  const [rating, setRating] =React.useState(0);
  const [open, setOpen] =useState(false);

  const navigate=useNavigate();

  const handleOpen = () => {
    if(currentUser)
     setOpen(true)
    else{
      toast.info("First login your self");
      navigate('/user/signIn')
     
    }
  };
  


  return <div className="container  mt-5 ">
  <ToastContainer/>
    <div className="row ">
      <div className="col-lg-12">
        <p className="name">{venue.title}</p>
        <p className="text-muted" style={{ fontSize: "1.10rem" }}><i className="fa fa-map-marker"></i> {venue.address}</p>
        <p ><i className="fa fa-star" style={{ color: "#fabb00" }}></i> {venue.rating}</p>
      </div>

    </div>

    <div className="row" style={{ width: "340px" }}>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <button onClick={handleOpen} className=" btn text-white mt-2" style={{backgroundColor: "#fb1b26"}}>Request Booking</button>
      </div>

      <div className="col-lg-6 col-md-12 col-sm-12 ">
        <button style={{backgroundColor:"#00b300"}} className="btn btn-success mt-2">Check Availabilty</button>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col-lg-8 col-md-8 col-sm-12">

        {/* carousal */}
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active ">
              <img src={venue.thumbnail} width={"100%"} height={"500vw"} />
            </div>

            {venue?.images.map((image, index) => <div className="carousel-item"><img src={image} className="" width={"100%"} height={"500vw"} /> </div>)}

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
      <div className="col-lg-8 col-md-8 col-sm-12" s>
        <div className="row">
          <div className="col-md-3 " >charges per day  <span style={{ fontWeight: "600", fontSize: "1.15rem" }}>₹{venue.charges} </span></div>
          <div className="col-md-2 ">capacity <span style={{ fontWeight: "600", fontSize: "1.15rem" }}>{venue.capacity}</span></div>
        </div>
        <hr />
      </div>
     
    </div>

    

    <div className="row mt-3">
      <div className="col-lg-10 col-md-10 col-sm-12">
        <p className="heading">About Venue</p>
        <p>{venue.description}</p>
      </div>
    </div>
    <hr></hr>

    <div className="row mt-3">

      <div className="col-lg-5 col-md-5">
        <p className="heading">Write A Review</p>
        <hr/>
        <form>
          <div className="m-1" >
            <p>Rate <span style={{fontWeight:500}}> {venue.title}</span></p>
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
        <Map service={venue} />

      </div>
    </div>


    {/* modal  Start*/}
        <RequestForm open={open} setOpen={setOpen} venueDetailsId={venue._id}/>
    {/* modal End */}


  </div>
}

export default VenueDescription