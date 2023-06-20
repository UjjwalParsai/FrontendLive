import { useEffect, useRef, useState } from "react";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api, { Venue } from "../../webApi/Home/api";
import axios from "axios";
import Loader from "../../component/Loader/loader";
import { useNavigate } from "react-router-dom";
import "./venueCard.css"
import { ToastContainer, toast } from "react-toastify";
import VenueFilter from "../Filter/venueFilter";
import { useSelector } from "react-redux";
import _ from "lodash";


function VenueCard() {
  const [venueList, setVenueList] = useState([]);
  
  const [isLoding, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useSelector(state => state.CurrentUser);
  const [favouritesList, setFavouriteList] = useState([]);
 


  const like = useRef(null);

  const navigate = useNavigate();

  const GetVenue = async () => {
    try {
      var response = await axios.get(baseUrl.BASE_URl + Venue.GETACTIVE_VENUE);
      if (response.status) {
        setVenueList(response.data.venueList);
        setIsLoading(false);
      }
    }
    catch (err) {
      setError("Something went Wrong !");
    }
  }



  const detail = (venue) => {
    navigate("/venue-detail", { state: { venue } });
  }



  

  const addFavourite = async (venueId) => {
    try {
      if (currentUser) {
       if(favouritesList?.some(fav => fav.venueId == venueId) )
       {
        let response = await axios.post(baseUrl.BASE_URl + Venue.REMOVE_FROM_FAVOURITE, { customerId: currentUser.customer._id, venueId: venueId })
        if (response.status) {
          setIsLoading(false);
          setFavouriteList(response.data.favouriteList)
        }
      }
      else
      {
        let response = await axios.post(baseUrl.BASE_URl + Venue.ADDVENUE_FAVOURITE, { customerId: currentUser.customer._id, venueId: venueId })
        if (response.status) {
          setIsLoading(false);
          setFavouriteList(response.data.favouriteList)
        }

      }
      }
      else {
        navigate("/user/signIn")
      }
    }
    catch (err) {
      toast.error("something went wrong");
    }
  }

  const doLikeDebounced = _.debounce(addFavourite,500)

  const likeClick = (venueId) => {
      doLikeDebounced(venueId);
    }

  const favouriteList = async () => {

    try {
      let response = await axios.get(baseUrl.BASE_URl + Venue.VENUE_FAVOURITElIST + "/" + currentUser.customer._id);
      if (response.status) {
        console.log(response.data)  
        setFavouriteList(response.data.favouriteList)
      }
    }
    catch (err) {

    }
  }

  useEffect(() => {
    GetVenue();
    favouriteList();
  }, [])


  return <div className="container-fliud">
    <ToastContainer />
    <VenueFilter setVenueList={setVenueList} setIsLoading={setIsLoading} GetVenue={GetVenue} setError={setError} />
    {isLoding && <Loader />}

    {!isLoding && <div className="container mt-4 ">


      <div className="row">
        {!error && venueList?.map((venue, index) => <div className="col-md-3 mt-5"><div className="card v-card  ">
          <div className="card-top-img">
            <img onClick={() => detail(venue)} className="card-image v-c-img" src={venue?.thumbnail} width={"100%"} height={"200px"} alt="" />

          </div>
          {
            favouritesList?.some(fav => fav.venueId == venue._id) ?
              <i onClick={() => likeClick(venue._id)} ref={like} className="fa fa-heart heart" style={{ color: "red" }} aria-hidden="true"></i> :
              <i onClick={() =>likeClick(venue._id)} ref={like} className="fa fa-heart-o heart"  aria-hidden="true"></i>


          }
          <div className=" card-body ">
            <div className="card-text">
              <p className=" title " >{venue?.title}</p>
              <p className=""><span style={{ fontWeight: "500" }}> <i className="fa fa-star" style={{ color: "#fabb00" }}></i> {venue.rating + " "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {venue?.address.substring(0, 15) + "...."} </span></p>
              <h6 className="mt-2"> charges ₹<span className="text-bold" style={{ fontWeight: 600 }}>{venue?.charges}</span></h6>
            </div>
          </div>

        </div>
        </div>)}
      </div>
    </div>}



  </div>
}


export default VenueCard;