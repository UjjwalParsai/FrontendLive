import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api, { Mehandi } from "../../webApi/Home/api";
import { toast } from "react-toastify";

function MehandiFilter({setMehandiList,setIsLoading,setError,getMehandi,mehandiList}){

 
    const searchKey =useRef();
    const services=[]

    function debounce(func, timeout = 1000) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }
      const getSearch = async () => {
      try{
         if(searchKey.current.value){
          
          setIsLoading(true)
           var response= await axios.get(baseUrl.BASE_URl+Mehandi.SEARCH_MEHANDI+"/"+searchKey.current.value);
        
           if(response.status)
           {
            if(!response.data.mehandiList.length==0){
            setMehandiList(response.data.mehandiList);
            setIsLoading(false);
            }
            else{
            toast.info("similar to your searching");
             getMehandi();
            }   
            
           }
         }
         else
          getMehandi();
        }
        catch(err){
         toast.error("Something went wrong")
        }
      }
      const Search = debounce((event) => getSearch(event));


      const byCharges = async (first,second) => {
        try {
          setIsLoading(true)
            var response = await axios.post(baseUrl.BASE_URl + Mehandi.GETMEHANDI_BY_CHARGES, { firstPrice:first,secondPrice:second});
            if (response.status) {
              setMehandiList(response.data.mehandiList)
              setIsLoading(false);
          }
        }
        catch (err) {
          setError("something went wrong");

        }
      }

      const bySerives= async (service) => {
        try {
          setIsLoading(true)
            var response = await axios.post(baseUrl.BASE_URl + Mehandi.GETMEHANDI_BY_SERVICES, {serviceName:service});
            if (response.status) {
              setMehandiList(response.data.mehandiList)
              setIsLoading(false);
          }
        }
        catch (err) {
          setError("something went wrong");

        }
      }

      const all=()=>{
          getMehandi();
        }

  const getService=()=>{
    mehandiList?.map((mehandi,index)=>{   
      mehandi.services.map((service,index)=>{
        if(services.indexOf(service.service)==-1)
           services.push(service.service);
      })
    })
  
  }
  getService();

  useEffect(()=>{

  },[])


    return <>
        <div className="container-fluid mt-4 venue-filter">
      <div className="row  justify-content-center align-items-center">
        <div  class=" col-md-2 ">
        <span onClick={all} class=" venue-filter-drop" type="button" >
            View-All
          </span>
        </div>


        <div class="dropdown col-md-2 ">
          <span class="dropdown-toggle  venue-filter-drop" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            services
          </span>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

          {services.map((service,index)=><li key={index}><a onClick={()=>bySerives(service)} class="dropdown-item" href="#">{service}</a></li>) }
  
           
          </ul>
        </div>

        <div class="dropdown col-md-2">
          <span class="dropdown-toggle  venue-filter-drop" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Charges
          </span>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a onClick={()=>byCharges(1000,5000)} class="dropdown-item" href="#">1000-5000</a></li>
            <li><a onClick={()=>byCharges(5000,10000)} class="dropdown-item" href="#">5000-10000</a></li>
            <li><a onClick={()=>byCharges(10000,20000)} class="dropdown-item" href="#">10000-20000</a></li>
            
          </ul>
        </div>



        <div className="col-md-3 ">
          <div className="form">
            <i className="fa fa-search"></i>
            <input onChange={Search} ref={searchKey} typeName="text" className="form-control form-input" placeholder="Search anything..." />
            {/* <span className="left-pan"><i class="fa fa-microphone"></i></span> */}
          </div>

        </div>

      </div>


    </div>
    </>
}

export default MehandiFilter;