import "./carousal.css"

function Carousel(){
    return <div className="container-fluid">
      
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="./img/carousal1.jpg" className="d-block w-100 mainImg" alt="..." height={'650px'} />
      </div>
      {/* <div className="carousel-item active">
        <img src="./img/carousal2.jpg" className="d-block w-100  mainImg" alt="..." height={'620px'}/>
      </div>  */}
      </div>
    </div>

   {/* <div className=" search container text-center  ">
    <div className="row">
    <div className="col-md-5 col-sm-12">
      <div className="col-md-6">
     <input type="search" className="searchBar form-control" placeholder="search"/>
     </div>
     <div className="col-md-6 ">
     <i className="fa fa-search"></i>
     </div>
     </div>
     </div>
   </div> */}
    
  </div>
}

export default Carousel;