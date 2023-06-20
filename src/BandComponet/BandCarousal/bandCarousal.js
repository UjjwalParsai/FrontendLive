import "./bandCarousl.css"
function BandCarousal(){
    return <>
      <div className="container-fluid">
    <div className="col-md-12" style={{  }}>
      <div className="row">
        <div className="col-md-12 text-end  "  >
          <img className="col-md-7 " src="./img/bandCarousal.jpg" height={"350vh"} style={{ borderRadius: "0.9vh" }} />
          <div className="col-md-5 col-sm-12 text-start bg-white  band_car_conent">
            <p className="mt-5  band_content_head">Find Wedding Band&Dj <span style={{ color: "red" }}>Artist</span></p>
            <p className="text-muted" style={{ marginLeft: "7%" }}>
Melodic Harmony: Uniting the Perfect Band and DJ for Your Dream Wedding!</p>
          </div>
        </div>
      </div>
    </div>

  </div>
    </>
}

export default BandCarousal;