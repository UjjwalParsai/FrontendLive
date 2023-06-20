import "./photographerCarousal.css"

function PhotographerCarousal(){
    return <div className="container-fluid">
    <div className="col-md-12" style={{  }}>
      <div className="row">
        <div className="col-md-12 text-end  "  >
          <img className="col-lg-7 col-sm-12 " src="./img/photographer2.jpg" height={"355vh"} style={{ borderRadius: "0.9vh" }} />
          <div className="col-md-5 col-sm-12 text-start bg-white  photo_car_conent">
            <p className="mt-5  photo_content_head">Find Wedding Photo<span style={{ color: "red" }}>grapher</span></p>
            <p className="text-muted" style={{ marginLeft: "7%" }}>Capturing Life's Beauty Through the Lens: Unveiling the World's Wonders One Click at a Time</p>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default PhotographerCarousal;