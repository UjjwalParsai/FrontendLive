import { useEffect, useRef, useState } from "react";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api, { Makeup } from "../../webApi/Home/api";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../component/Loader/loader";
import { useNavigate } from "react-router-dom";
import "./makeupCard.css"
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

import MakeupFilter from "../Filter/makeupFilter";

function MakeupCard(){
    const[makeupList,setMakeupList]=useState([]);
    const[isLoding,setIsLoading]=useState(true);
    const[error, setError]=useState("");
    const[favouritesList,setFavouritesList]=useState([]);
    const{currentUser}=useSelector(state=>state.CurrentUser);
    

    const navigate=useNavigate();


    const addFavourite = async (makeupId) => {
      try {
        if (currentUser) {
         if(favouritesList?.some(fav => fav.makeupId == makeupId) )
         {
          let response = await axios.post(baseUrl.BASE_URl +Makeup.REMOVE_FROM_FAVOURITE, { customerId: currentUser.customer._id, makeupId: makeupId})
          if (response.status) {
            console.log(response.data)
            setIsLoading(false);
            setFavouritesList(response.data.favouriteList)
          }
        }
        else
        {
          let response = await axios.post(baseUrl.BASE_URl + Makeup.ADD_TO_FAVOURITE, { customerId: currentUser.customer._id, makeupId: makeupId })
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
  
    const likeClick = (makeupId) => {
        doLikeDebounced(makeupId);
      }
  
    const favouriteList = async () => {
  
      try {
        let response = await axios.get(baseUrl.BASE_URl + Makeup.MAKEUP_FAVOURITELIST + "/" + currentUser.customer._id);
        if (response.status) {
          console.log(response.data)  
          setFavouritesList(response.data.favouriteList)
        }
      }
      catch (err) {
  
      }
    }


    const GetMakeup= async()=>{
        try{
            setIsLoading(true);
             var response= await axios.get(baseUrl.BASE_URl+api.GETACTIVE_MAKEUP);
           if(response.status)
           {
            setMakeupList(response.data.makeupDetails);
            setIsLoading(false);
           }
        }
        catch(err){
          setError("Something went Wrong !");
        }
    }

    const detail=(makeup)=>{
        navigate("/makeup-detail",{state:{makeup}}) ;
     }

    useEffect(()=>{
        GetMakeup();
        favouriteList();
    },[])



    return<div className="container-fliud">
      <ToastContainer/>
      {makeupList&&<MakeupFilter setMakeupList={setMakeupList} setIsLoading={setIsLoading} GetMakeup={GetMakeup}  setError={setError} makeupList={makeupList}/> }
    
    {isLoding&&<Loader/>}

      {!isLoding && <div className="container ">
             <div className="row">
                {makeupList?.map((makeup, index) => <div key={index} className="col-lg-3  col-md-4 col-sm-6 mt-5"><div className="card makeup-card  ">
                <div className="card-top-img">
                <img  onClick={()=>detail(makeup)}  className="card-image makeupCard-img" src={makeup?.thumbnail} width={"100%"} height={"250px"}  />
    
                </div>
                {
                  favouritesList?.some(fav=>fav.makeupId==makeup._id) ?
                  <i onClick={()=>likeClick(makeup._id)} className="fa fa-heart heart " style={{ color:"red"}}></i>:   
                   <i onClick={()=>likeClick(makeup._id)} className="fa fa-heart-o heart "></i>
                }
                    <div className=" card-body ">
                        <div className="card-text">
                        <p className=" title " >{makeup?.title}</p>
                        <p className=""><span style={{fontWeight:"500"}}> <i className="fa fa-star" style={{color:"#fabb00"}}></i> {makeup?.rating+" "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {makeup?.address.substring(0,15)+"...."} </span></p>
                        <h6 className="mt-2"> starting from ₹<span className="text-bold" style={{fontWeight:600}}>{makeup?.services[0].price}</span></h6> 
                        </div>
                        </div>
                        
                        </div>
                </div>)}
                </div>
                </div>}
            
                
                
    </div>
}


export default MakeupCard;