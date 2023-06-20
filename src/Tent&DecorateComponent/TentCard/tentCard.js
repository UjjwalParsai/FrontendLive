import { useEffect, useRef, useState } from "react";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import { Mehandi, Tent } from "../../webApi/Home/api";
import axios from "axios";
import Loader from "../../component/Loader/loader";
import { useNavigate } from "react-router-dom";
import "./tentCard.css"
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import TentFilter from "../TentFilter/tentFilter";
import _ from "lodash";


function TentCard() {
  const [tentList, setTentList] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useSelector(state => state.CurrentUser);
  const [favouritesList, setFavouritesList] = useState([]);


  const like = useRef(null);

  const navigate = useNavigate();


  const addFavourite = async (tentId) => {
    try {
      if (currentUser) {
        if (favouritesList?.some(fav => fav.tentId == tentId)){
          let response = await axios.post(baseUrl.BASE_URl + Tent.REMOVE_FROM_FAVOURITE, { customerId: currentUser.customer._id, tentId: tentId })
          if (response.status) {
            setIsLoading(false);
            setFavouritesList(response.data.favouriteList)
          }
        }
        else {
          let response = await axios.post(baseUrl.BASE_URl + Tent.ADD_TO_FAVOURITE, { customerId: currentUser.customer._id, tentId: tentId })
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

  const likeClick = (tentId) => {
    doLikeDebounced(tentId);
  }

  const favouriteList = async () => {

    try {
      let response = await axios.get(baseUrl.BASE_URl + Tent.TENT_FAVOURITELIST + "/" + currentUser.customer._id);
      if (response.status) {
        setFavouritesList(response.data.favouriteList)
      }
    }
    catch (err) {

    }
  }

  const getTent = async () => {
    try {
      var response = await axios.get(baseUrl.BASE_URl + Tent.GETACTIVE_TENT);
      if (response.status) {
        setTentList(response.data.tentList);
        setIsLoading(false);
      }
    }
    catch (err) {
      setError("Something went Wrong !");
    }
  }



  const detail = (tent) => {
    navigate("/tent-detail", { state: { tent } });
  }


  useEffect(() => {
    getTent();
    favouriteList();
  }, [])


  return <div className="container-fliud">
    <ToastContainer />
    <TentFilter setTentList={setTentList} setIsLoading={setIsLoading} getTent={getTent} setError={setError} tentList={tentList} />
    {isLoding && <Loader />}

    {!isLoding && <div className="container mt-4 ">
      <div className="row">
        {!error && tentList?.map((tent, index) => <div className="col-md-3 mt-5"><div className="card tent-card  ">
          <div className="card-top-img">
            <img onClick={() => detail(tent)} className="card-image tentCard-img" src={tent?.thumbnail} width={"100%"} height={"200px"} alt="" />

          </div>
          {
            favouritesList?.some(fav => fav.tentId == tent._id) ?
              <i onClick={() => likeClick(tent._id)} className="fa fa-heart heart " style={{ color: "red" }}></i> :
              <i onClick={() => likeClick(tent._id)} className="fa fa-heart-o heart "></i>
          }
          <div className=" card-body ">
            <div className="card-text">
              <p className=" title " >{tent?.title}</p>
              <p className=""><span style={{ fontWeight: "500" }}> <i className="fa fa-star" style={{ color: "#fabb00" }}></i> {tent.rating + " "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {tent?.address.substring(0, 15) + "...."} </span></p>
              <h6 className="mt-2"> starting from ₹<span className="text-bold" style={{ fontWeight: 600 }}>{tent?.services[0]?.price}</span></h6>
            </div>
          </div>

        </div>
        </div>)}
      </div>
    </div>}



  </div>
}


export default TentCard;