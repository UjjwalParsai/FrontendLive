import { useEffect, useRef, useState } from "react";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api, { Caterers, Makeup } from "../../webApi/Home/api";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../component/Loader/loader";
import { useNavigate } from "react-router-dom";
import "./caterersCard.css"
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import CaterersFilter from "../CaterersFilter/caterersFilter";



function CaterersCard(){
    const[caterersList,setCaterersList]=useState([]);
    const[isLoding,setIsLoading]=useState(true);
    const[error, setError]=useState("");
    const[favouritesList,setFavouritesList]=useState([]);
    const{currentUser}=useSelector(state=>state.CurrentUser);
    

    const navigate=useNavigate();


    const addFavourite = async (catererId) => {
      try {
        if (currentUser) {
         if(favouritesList?.some(fav => fav.catererId == catererId) )
         {
          let response = await axios.post(baseUrl.BASE_URl +Caterers.REMOVE_FROM_FAVOURITE, { customerId: currentUser.customer._id, catererId: catererId})
          if (response.status) {
            setIsLoading(false);
            setFavouritesList(response.data.favouriteList)
          }
        }
        else
        {
          let response = await axios.post(baseUrl.BASE_URl +Caterers.ADD_TO_FAVOURITE, { customerId: currentUser.customer._id, catererId:catererId })
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
  
    const doLikeDebounced = _.debounce(addFavourite,500)
  
    const likeClick = (catererId) => {
        doLikeDebounced(catererId);
      }
  
    const favouriteList = async () => {
  
      try {
        let response = await axios.get(baseUrl.BASE_URl + Caterers.CATERERS_FAVOURITELIST + "/" + currentUser.customer._id);
        if (response.status) {  
          setFavouritesList(response.data.favouriteList)
        }
      }
      catch (err) {
  
      }
    }


    const getCaterers= async()=>{
        try{
            setIsLoading(true);
             var response= await axios.get(baseUrl.BASE_URl+Caterers.GETACTIVE_CATERERS);
           if(response.status)
           {
            setCaterersList(response.data.caterersDetails);
            setIsLoading(false);
           }
        }
        catch(err){
          setError("Something went Wrong !");
        }
    }

    const detail=(caterers)=>{
        navigate("/caterers-detail",{state:{caterers}}) ;
     }

    useEffect(()=>{
        getCaterers();
        favouriteList();
    },[])



    return<div className="container-fliud">
      <ToastContainer/>
      {caterersList&&<CaterersFilter setCaterersList={setCaterersList} setIsLoading={setIsLoading} getCaterers={getCaterers}  setError={setError} caterersList={caterersList}/> }
    
    {isLoding&&<Loader/>}

      {!isLoding && <div className="container ">
             <div className="row">
                {caterersList?.map((caterers, index) => <div key={index} className="col-lg-3  col-md-4 col-sm-6 mt-5"><div className="card caterers-card  ">
                <div className="card-top-img">
                <img  onClick={()=>detail(caterers)}  className="card-image caterersCard-img" src={caterers?.thumbnail} width={"100%"} height={"250px"}  />
    
                </div>
                {
                  favouritesList?.some(fav=>fav.catererId==caterers._id) ?
                  <i onClick={()=>likeClick(caterers._id)} className="fa fa-heart heart " style={{ color:"red"}}></i>:   
                   <i onClick={()=>likeClick(caterers._id)} className="fa fa-heart-o heart "></i>
                }
                    <div className=" card-body ">
                        <div className="card-text">
                        <p className=" title " >{caterers?.title}</p>
                        <p className=""><span style={{fontWeight:"500"}}> <i className="fa fa-star" style={{color:"#fabb00"}}></i> {caterers?.rating+" "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {caterers?.address.substring(0,15)+"...."} </span></p>
                        <h6 className="mt-2"> starting from ₹<span className="text-bold" style={{fontWeight:600}}>{caterers?.services[0].price}</span></h6> 
                        </div>
                        </div>
                        
                        </div>
                </div>)}
                </div>
                </div>}
            
                
                
    </div>
}


export default CaterersCard;