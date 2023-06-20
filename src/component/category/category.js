import { useSelector } from "react-redux";
import "./category.css"
import Slider from "react-slick";
import { settings } from "../Slider/slider";
function Category() {
  const{categoryList,isLoding,error}=useSelector((state)=>state.category)

    return <div className="container-fluid">
         <div className="container">
        <div className="row">
            <div className="mt-4 col-lg-12">
                <p style={{fontFamily:"Merriweather,Merriweather-fallback-TimesNewRoman,times,serif", fontWeight:"700", fontSize:"1.50rem"}}>Categories</p>
            </div>
        </div>
        </div>

 <div className="container">
  
    <Slider {...settings}>
    {!error && categoryList.map((category,index)=> <div className="card">
        <div className="text-center">
    
      <h6 className="card-text">{category.categoryName.toUpperCase()}</h6>
      </div>
    </div>)}
    </Slider>
   
  
</div>
    </div>



}

export default Category;