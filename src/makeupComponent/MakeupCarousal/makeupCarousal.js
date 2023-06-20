import "./makeupCarousal.css"
function MakeupCarousal() {

  return <div className="container-fluid">
    <div className="col-md-12" style={{  }}>
      <div className="row">
        <div className="col-md-12 text-end  "  >
          <img className="col-lg-7 col-sm-12 " src="./img/makeupCarousal2.jpg" height={"355vh"} style={{ borderRadius: "0.9vh" }} />
          <div className="col-md-5 col-sm-12 text-start bg-white  makeup_car_conent">
            <p className="mt-5  makeup_content_head">Find your makeup <span style={{ color: "red" }}>Artist</span></p>
            <p className="text-muted" style={{ marginLeft: "7%" }}>
Unveil Your Radiant Beauty: Choose from a Premier Selection of Makeup Artists to Achieve Your Flawless Vision</p>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default MakeupCarousal;