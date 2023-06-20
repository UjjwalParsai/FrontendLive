import { useEffect, useRef, useState } from "react";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import { Band} from "../../webApi/Home/api";
import axios from "axios";
import Loader from "../../component/Loader/loader";
import { useNavigate } from "react-router-dom";
import "./bandCard.css"
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import BandFilter from "../BandFilter/bandFilter";
import _ from  "lodash";



function BandCard() {
  const [bandList, setBandList] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useSelector(state => state.CurrentUser);
  const [favouritesList,setFavouritesList]=useState([]);

  const like = useRef(null);

  const navigate = useNavigate();


  const addFavourite = async (bandId) => {
    try {
      if (currentUser) {
        if (favouritesList?.some(fav => fav.bandId == bandId)){
          let response = await axios.post(baseUrl.BASE_URl + Band.REMOVE_FROM_FAVOURITE, { customerId: currentUser.customer._id, bandId: bandId })
          if (response.status) {
            setIsLoading(false);
            setFavouritesList(response.data.favouriteList)
          }
        }
        else {
          let response = await axios.post(baseUrl.BASE_URl + Band.ADD_TO_FAVOURITE, { customerId: currentUser.customer._id, bandId: bandId })
          if (response.status) {
            setIsLoading(false);
            setFavouritesList(response.data.favouriteList)
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

  const doLikeDebounced = _.debounce(addFavourite, 500)

  const likeClick = (bandId) => {
    doLikeDebounced(bandId);
  }

  const favouriteList = async () => {

    try {
      let response = await axios.get(baseUrl.BASE_URl + Band.BAND_FAVOURITELIST + "/" + currentUser.customer._id);
      if (response.status) {
        setFavouritesList(response.data.favouriteList)
      }
    }
    catch (err) {

    }
  }

  const getBand = async () => {
    try {
      var response = await axios.get(baseUrl.BASE_URl + Band.GETACTIVE_BAND);
      if (response.status) {
        console.log(response.data)
        setBandList(response.data.bandList);
        setIsLoading(false);
      }
    }
    catch (err) {
      setError("Something went Wrong !");
    }
  }



  const detail = (band) => {
    navigate("/band&Dj-detail", { state: {band} });
  }


useEffect(() => {
  getBand();
  favouriteList();
},[])


return <div className="container-fliud">
  <ToastContainer />
  <BandFilter setBandList={setBandList} setIsLoading={setIsLoading} getBand={getBand} setError={setError} bandList={bandList} />
  {isLoding && <Loader />}

  {!isLoding && <div className="container mt-4 ">
    <div className="row">
      {!error && bandList?.map((band, index) => <div className="col-md-3 mt-5"><div className="card band-card  ">
        <div className="card-top-img">
          <img onClick={() => detail(band)} className="card-image bandCard-img" src={band?.thumbnail} width={"100%"} height={"200px"} alt="" />

        </div>
        {
            favouritesList?.some(fav => fav.bandId == band._id) ?
              <i onClick={() => likeClick(band._id)} className="fa fa-heart heart " style={{ color: "red" }}></i> :
              <i onClick={() => likeClick(band._id)} className="fa fa-heart-o heart "></i>
          }
        <div className=" card-body ">
          <div className="card-text">
            <p className=" title " >{band?.title}</p>
            <p className=""><span style={{ fontWeight: "500" }}> <i className="fa fa-star" style={{ color: "#fabb00" }}></i> {band.rating + " "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {band?.address.substring(0, 15) + "...."} </span></p>
            <h6 className="mt-2"> charges ₹<span className="text-bold" style={{ fontWeight: 600 }}>{band?.services[0]?.price}</span></h6>
          </div>
        </div>

      </div>
      </div>)}
    </div>
  </div>}



</div>
}


export default BandCard;