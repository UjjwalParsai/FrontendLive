import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api from "../../webApi/Home/api";
import { toast } from "react-toastify";

function PanditFilter({setPanditList,setIsLoading,setError,getPandit,panditList}){


    const navigate=useNavigate();
    const searchKey =useRef();

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
           var response= await axios.get(baseUrl.BASE_URl+api.SEARCH_PANDIT+"/"+searchKey.current.value);
          
           if(response.status)
           {
            if(!response.data.panditList.length==0){
            setPanditList(response.data.panditList);
            setIsLoading(false);
            }
            else{
            toast.info("similar to your searching");
             getPandit();
            }   
            
           }
         }
         else
          getPandit();
        }
        catch(err){
         toast.error("Something went wrong")
        }
      }
      const Search = debounce((event) => getSearch(event));


      const byCharges = async (first,second) => {
        try {
          setIsLoading(true)
         var response = await axios.post(baseUrl.BASE_URl + api.GETPANDIT_BY_CHARGES, { firstPrice:first,secondPrice:second});
          if(response.data.panditList.length){
             if (response.status) {
              setPanditList(response.data.panditList)
              setIsLoading(false);
          }
        }
        else{
          toast.info("similar to your searching");
          getPandit();
          
        }
      }
       
        catch (err) {
          setError("something went wrong");
        }
      }

const all=()=>{
    getPandit();
  }


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

            <li><a  class="dropdown-item" href="#">0-100</a></li>
  
           
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

export default PanditFilter;