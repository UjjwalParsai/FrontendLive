import { useEffect, useRef, useState } from "react";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api, { Pandit } from "../../webApi/Home/api";
import axios from "axios";
import Loader from "../../component/Loader/loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PanditFilter from "../PanditFilter/panditFilter";
import { useSelector } from "react-redux";
import _ from "lodash";


function PanditCard(){
    const[panditList,setPanditList]=useState([]);
    const[isLoding,setIsLoading]=useState(true);
    const[error, setError]=useState("");
    const[favouritesList,setFavouritesList]=useState([]);
    const{currentUser}=useSelector(state=>state.CurrentUser);
    

    const navigate=useNavigate();
    
    const addFavourite = async (panditId) => {
      try {
        if (currentUser) {
          if (favouritesList?.some(fav => fav.panditId == panditId)) {
            let response = await axios.post(baseUrl.BASE_URl + Pandit.REMOVE_FROM_FAVOURITE, { customerId: currentUser.customer._id, panditId:panditId })
            if (response.status) {
              console.log(response.data)
              setIsLoading(false);
              setFavouritesList(response.data.favouriteList)
            }
          }
          else {
            let response = await axios.post(baseUrl.BASE_URl + Pandit.ADD_TO_FAVOURITE, { customerId: currentUser.customer._id, panditId: panditId })
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
  
    const likeClick = (panditId) => {
      doLikeDebounced(panditId);
    }
  
    const favouriteList = async () => {
  
      try {
        let response = await axios.get(baseUrl.BASE_URl + Pandit.PANDIT_FAVOURITELIST + "/" + currentUser.customer._id);
        if (response.status) {
          setFavouritesList(response.data.favouriteList)
        }
      }
      catch (err) {
  
      }
    }


    
    const getPandit= async()=>{
        
        try{
            setIsLoading(true);
             var response= await axios.get(baseUrl.BASE_URl+api.GETACTIVE_PANDIT);
           if(response.status)
           {
            setPanditList(response.data.panditDetails);
            setIsLoading(false);
           }
        }
        catch(err){
          setError("Something went Wrong !");
        }
    }

    const detail=(pandit)=>{
        navigate("/pandit-detail",{state:{pandit}}) ;
     }

    useEffect(()=>{
        getPandit();
        favouriteList();
    },[])



    return<div className="container-fliud">
      <ToastContainer/>
      <PanditFilter setPanditList={setPanditList} setIsLoading={setIsLoading} getPandit={getPandit}  setError={setError} panditList={panditList}/> 
    
    {isLoding&&<Loader/>}

      {!isLoding && <div className="container ">
             <div className="row">
                {panditList?.map((pandit, index) => <div className="col-lg-3  col-md-4 col-sm-6 mt-5"><div className="card pandit-card  ">
                <div className="card-top-img">
                <img  onClick={()=>detail(pandit)}  className="card-image panditCard-img" src={pandit?.thumbnail} width={"100%"} height={"250px"}  />
    
                </div>
                {
                  favouritesList?.some(fav=>fav.panditId==pandit._id) ?
                  <i onClick={()=>likeClick(pandit._id)} className="fa fa-heart heart " style={{ color:"red"}}></i>:   
                   <i onClick={()=>likeClick(pandit._id)} className="fa fa-heart-o heart "></i>
                }
                    <div className=" card-body ">
                        <div className="card-text">
                        <p className=" title " >{pandit?.title}</p>
                        <p className=""><span style={{fontWeight:"500"}}> <i className="fa fa-star" style={{color:"#fabb00"}}></i> {pandit?.rating+" "}</span> . <span className="text-muted"> <i className="fa fa-map-marker"></i> {pandit?.address.substring(0,15)+"...."} </span></p>
                        <h6 className="mt-2"> starting from ₹<span className="text-bold" style={{fontWeight:600}}>{pandit?.services[0].price}</span></h6> 
                        </div>
                        </div>
                        
                        </div>
                </div>)}
                </div>
                </div>}
            
                
                
    </div>
}


export default PanditCard;