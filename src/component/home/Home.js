import Carousel from "../carousel/Carousel";
import Category from "../category/category";
import Navbar from "../navigation/navbar";
import { fetchCategory } from "../../redux-Config/Index/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTopVenue } from "../../redux-Config/Index/topVenueSlice";
import { fetchTopMakeup } from "../../redux-Config/Index/topMakeupSlice";
import TopMakeup from "../topMakeup/topMakeup";
import TopVenue from "../TopVenue/topVenue";
import { fetchTopPandit } from "../../redux-Config/Index/topPanditSlice";
import TopPandit from "../../panditComponent/topPandit/topPandit";
import { ToastContainer } from "react-toastify";

function Home(){
    const dispatch=useDispatch();
    const {categoryList} = useSelector((state)=>state.category);
    const { topMakeupList} = useSelector(state => state.topMakeup);
    const { topVenueList } = useSelector(state => state.topVenue);
    const { topPanditList } = useSelector(state => state.topPandit)
    useEffect(()=>{
       if(!categoryList.length) 
        dispatch(fetchCategory());
        if(!topVenueList.length)
        dispatch(fetchTopVenue());
        if(!topMakeupList.length)
        dispatch(fetchTopMakeup());
        if(!topPanditList.length)
        dispatch(fetchTopPandit());
        if(!categoryList.length)
        dispatch(fetchCategory())
    },[])

    return <>
     
     <ToastContainer/>
     <Carousel/>
    
     <TopVenue/>
     <TopMakeup/>
     <TopPandit/>
    </>
           
    

}
export default Home