import { useEffect, useRef, useState } from "react";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import { Mehandi } from "../../webApi/Home/api";
import axios from "axios";
import Loader from "../../component/Loader/loader";
import { useNavigate } from "react-router-dom";
import "./mehandiCard.css"
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import MehandiFilter from "../MehandiFilter/mehandiFilter";
import _ from "lodash";


function MehandiCard() {
  const [mehandiList, setMehandiList] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useSelector(state => state.CurrentUser);
  const [favouritesList, setFavouritesList] = useState([]);



  const navigate = useNavigate();



  const addFavourite = async (mehandiId) => {
    try {
      if (currentUser) {
        if (favouritesList?.some(fav => fav.mehandiId == mehandiId)) {
          let response = await axios.post(baseUrl.BASE_URl + Mehandi.REMOVE_FROM_FAVOURITE, { customerId: currentUser.customer._id, mehandiId: mehandiId })
          if (response.status) {
            console.log(response.data)
            setIsLoading(false);
            setFavouritesList(response.data.favouriteList)
          }
        }
        else {
          let response = await axios.post(baseUrl.BASE_URl + Mehandi.ADD_TO_FAVOURITE, { customerId: currentUser.customer._id, mehandiId: mehandiId })
          if (response.status) {
            console.log(response.data)
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

  const likeClick = (mehandiId) => {
    doLikeDebounced(mehandiId);
  }

  const favouriteList = async () => {

    try {
      let response = await axios.get(baseUrl.BASE_URl + Mehandi.MEHANDI_FAVOURITELIST + "/" + currentUser.customer._id);
      if (response.status) {
        setFavouritesList(response.data.favouriteList)
      }
    }
    catch (err) {

    }
  }


  const getMehandi = async () => {
    try {
      var response = await axios.get(baseUrl.BASE_URl + Mehandi.GETACTIVE_MEHANDI);
      if (response.status) {
        setMehandiList(response.data.mehandiList);
        setIsLoading(false);
      }
    }
    catch (err) {
      setError("Something went Wrong !");
    }
  }



  const detail = (mehandi) => {
    navigate("/mehandi-detail", { state: { mehandi } });
  }


  useEffect(() => {
    getMehandi();
    favouriteList();

  }, [])


  return <div className="container-fliud">
    <ToastContainer />
    <MehandiFilter setMehandiList={setMehandiList} setIsLoading={setIsLoading} getMehandi={getMehandi} setError={setError} mehandiList={mehandiList} />
    {isLoding && <Loader />}

    {!isLoding && <div className="container mt-4 ">
      <div className="row">
        {!error && mehandiList?.map((mehandi, index) => <div className="col-md-3 mt-5"><div className="card mehandi-card  ">
          <div className="card-top-img">
            <img onClick={() => detail(mehandi)} className="card-image mehandiCard-img" src={mehandi?.thumbnail} width={"100%"} height={"200px"} alt="" />

          </div>
          {
            favouritesList?.some(fav => fav.mehandiId == mehandi._id) ?
              <i onClick={() => likeClick(mehandi._id)} className="fa fa-heart heart " style={{ color: "red" }}></i> :
              <i onClick={() => likeClick(mehandi._id)} className="fa fa-heart-o heart "></i>
          }
          <div className=" card-body ">
            <div className="card-text">
              <p className=" title " >{mehandi?.title}</p>
              <p className=""><span style={{ fontWeight: "500" }}> <i className="fa fa-star" style={{ color: "#fabb00" }}></i> {mehandi.rating + " "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {mehandi?.address.substring(0, 15) + "...."} </span></p>
              <h6 className="mt-2"> charges ₹<span className="text-bold" style={{ fontWeight: 600 }}>{mehandi?.services[0]?.price}</span></h6>
            </div>
          </div>

        </div>
        </div>)}
      </div>
    </div>}



  </div>
}


export default MehandiCard;