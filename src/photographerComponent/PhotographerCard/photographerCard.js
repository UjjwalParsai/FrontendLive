import { useEffect, useRef, useState } from "react";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api, { Photographer } from "../../webApi/Home/api";
import axios from "axios";
import Loader from "../../component/Loader/loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PhotographerFilter from "../Filter/photographerFilter";
import userSlice from "../../redux-Config/Index/userSlice";
import { useSelector } from "react-redux";
import _ from "lodash";


function PhotographerCard(){
    const[photographerList,setPhotographerList]=useState([]);
    const[isLoding,setIsLoading]=useState(true);
    const[error, setError]=useState("");
    const[favouritesList,setFavouritesList]=useState([])
    const{currentUser}=useSelector(state=>state.CurrentUser)

    const navigate=useNavigate();


    const addFavourite = async (photoGrapherId) => {
      try {
        if (currentUser) {
         if(favouritesList?.some(fav => fav.photoGrapherId == photoGrapherId) )
         {
          let response = await axios.post(baseUrl.BASE_URl +Photographer.REMOVE_FROM_FAVOURITE, { customerId: currentUser.customer._id, photoGrapherId: photoGrapherId})
          if (response.status) {
            console.log(response.data)
            setIsLoading(false);
            setFavouritesList(response.data.favouriteList)
          }
        }
        else
        {
          let response = await axios.post(baseUrl.BASE_URl + Photographer.ADD_TO_FAVOURITE, { customerId: currentUser.customer._id, photoGrapherId: photoGrapherId })
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
  
    const doLikeDebounced = _.debounce(addFavourite,500)
  
    const likeClick = (photoGrapherId) => {
        doLikeDebounced(photoGrapherId);
      }
  
    const favouriteList = async () => {
  
      try {
        let response = await axios.get(baseUrl.BASE_URl + Photographer.PHOTOGRAPHER_FAVOURITELIST + "/" + currentUser.customer._id);
        if (response.status) {
          console.log(response.data)  
          setFavouritesList(response.data.favouriteList)
        }
      }
      catch (err) {
  
      }
    }
    
    


    
    const getPhotographer= async()=>{
        try{
            setIsLoading(true);
             var response= await axios.get(baseUrl.BASE_URl+Photographer.GETACTIVE_PHOTOGRAPHER);
           if(response.status)
           {
            setPhotographerList(response.data.photographers);
            setIsLoading(false);
           }
        }
        catch(err){
          setError("Something went Wrong !");
        }
    }

    const detail=(photographer)=>{
        navigate("/photographer-detail",{state:{photographer}}) ;
     }

    useEffect(()=>{
        getPhotographer();
        favouriteList();
    },[])



    return<div className="container-fliud">
      <ToastContainer/>
      <PhotographerFilter setPhotographerList={setPhotographerList} setIsLoading={setIsLoading} getPhotographer={getPhotographer}  setError={setError} photographerList={photographerList}/> 
    
    {isLoding&&<Loader/>}

      {!isLoding && <div className="container ">
             <div className="row">
                {photographerList?.map((photographer, index) => <div className="col-lg-3  col-md-4 col-sm-6 mt-5"><div className="card makeup-card  ">
                <div className="card-top-img">
                <img  onClick={()=>detail(photographer)}  className="card-image makeupCard-img" src={photographer?.thumbnail} width={"100%"} height={"250px"}  />
    
                </div>
                {
                  favouritesList?.some(fav=>fav.photoGrapherId==photographer._id) ?
                  <i onClick={()=>likeClick(photographer._id)} className="fa fa-heart heart " style={{ color:"red"}}></i>:   
                   <i onClick={()=>likeClick(photographer._id)} className="fa fa-heart-o heart "></i>
                }
                    <div className=" card-body ">
                        <div className="card-text">
                        <p className=" title " >{photographer?.title}</p>
                        <p className=""><span style={{fontWeight:"500"}}> <i className="fa fa-star" style={{color:"#fabb00"}}></i> {photographer?.rating+" "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {photographer?.address.substring(0,15)+"...."} </span></p>
                        <h6 className="mt-2"> starting from ₹<span className="text-bold" style={{fontWeight:600}}>{photographer?.services[0].price}</span></h6> 
                        </div>
                        </div>
                        
                        </div>
                </div>)}
                </div>
                </div>}
            
                
                
    </div>
}


export default PhotographerCard;