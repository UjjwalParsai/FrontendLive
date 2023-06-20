import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import api, { Venue } from "../../webApi/Home/api";
import { toast } from "react-toastify";

function VenueFilter({ GetVenue, setVenueList, setIsLoading, setError }) {

  const [venueCategory, setVenueCategory] = useState([]);


  const searchKey = useRef();

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  const getSearch = async (event) => {
    try {
      if (searchKey.current.value) {
        setIsLoading(true)
        var response = await axios.get(baseUrl.BASE_URl + api.SEARCH_VENUE + "/" + searchKey.current.value);

        if (response.status) {
          setVenueList(response.data.venueList);
          setIsLoading(false);
        }
      }
      else
        GetVenue();
    }
    catch (err) {
      toast.error("no result found")
    }
  }
  const Search = debounce((event) => getSearch(event));


  const getVenueCategory = async () => {
    try {
      var response = await axios.get(baseUrl.BASE_URl + Venue.GETVENUE_CATEGORY);
      if (response.status) {
        setVenueCategory(response.data.venueCategoryList)
      }
    }
    catch (err) {
      setError("something went wrong");
    }

  }

  const byCategory = async (categoryId) => {
    try {
      setIsLoading(true)
        var response = await axios.post(baseUrl.BASE_URl + Venue.GETVENUE_BY_CATEGORY, { categoryId: categoryId });
        if (response.status) {
          setVenueList(response.data.venueList)
          setIsLoading(false);
        }
      
      else
        GetVenue();
    }
    catch (err) {
      setError("something went wrong");
    }
  }


  const byCapacity = async (first,second) => {
    try {
      setIsLoading(true)
        var response = await axios.post(baseUrl.BASE_URl + Venue.GETVENUE_BY_CAPACITY, { first:first,second:second});
        if (response.status) {
          setVenueList(response.data.venueList)
          setIsLoading(false);
      }
    }
    catch (err) {
      setError("something went wrong");
    }
  }


  const byCharges = async (first,second) => {
    try {
      setIsLoading(true)
        var response = await axios.post(baseUrl.BASE_URl +Venue.GETVENUE_BY_CHARGES, { firstPrice:first,secondPrice:second});
        if (response.status) {
          setVenueList(response.data.venueList)
          setIsLoading(false);
      }
    }
    catch (err) {
      setError("something went wrong");
    }
  }



const all=()=>{
  GetVenue();
}

  useEffect(() => {
    getVenueCategory();
  }, [])



  return <>
    <div className="container-fluid mt-4 venue-filter">
      <div className="row  justify-content-center align-items-center">
        <div  class=" col-md-2 ">
        <span onClick={all} class=" venue-filter-drop" type="button" >
            View-All
          </span>
        </div>

        <div class="dropdown col-md-2 ">
          <span class="dropdown-toggle venue-filter-drop" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Venue-Type
          </span>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        
            {venueCategory?.map((category, index) => <li><a class="dropdown-item" onClick={() => byCategory(category._id)} href="#" >{category.categoryName}</a></li>)}

          </ul>
        </div>

        <div class="dropdown col-md-2 ">
          <span class="dropdown-toggle  venue-filter-drop" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Capacity
          </span>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a onClick={()=>byCapacity(0,100)} class="dropdown-item" href="#">0-100</a></li>
            <li><a onClick={()=>byCapacity(100,500)} class="dropdown-item" href="#">100-500</a></li>
            <li><a  onClick={()=>byCapacity(500,1000)} class="dropdown-item" href="#">500-1000</a></li>
            <li><a onClick={()=>byCapacity(1000,2000)} class="dropdown-item" href="#">1000-2000</a></li>
           
          </ul>
        </div>

        <div class="dropdown col-md-2">
          <span class="dropdown-toggle  venue-filter-drop" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Charges
          </span>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a onClick={()=>byCharges(10000,50000)} class="dropdown-item" href="#">10000-50000</a></li>
            <li><a onClick={()=>byCharges(50000,100000)} class="dropdown-item" href="#">50000-100000</a></li>
            <li><a onClick={()=>byCharges(100000,500000)} class="dropdown-item" href="#">100000-500000</a></li>
          </ul>
        </div>



        <div className="col-md-3 ">
          <div className="form">
            <i className="fa fa-search"></i>
            <input onChange={Search} ref={searchKey} typeName="text" className="form-control form-input" placeholder="search wedding venue..." />
            {/* <span className="left-pan"><i class="fa fa-microphone"></i></span> */}
          </div>

        </div>

      </div>


    </div>
  </>
}

export default VenueFilter;