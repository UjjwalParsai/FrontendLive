import "./mehandiCarousal.css"

function MehandiCarousal() {

  return <div className="container-fluid">
    <div className="col-md-12" style={{  }}>
      <div className="row">
        <div className="col-md-12 text-end  "  >
          <img className="col-md-7 " src="./img/mehandiCarousal.jpg" height={"350vh"} style={{ borderRadius: "0.9vh" }} />
          <div className="col-md-5 col-sm-12 text-start bg-white  mehandi_car_conent">
            <p className="mt-5  mehandi_content_head">Find your mehandi <span style={{ color: "red" }}>Artist</span></p>
            <p className="text-muted" style={{ marginLeft: "7%" }}>Exquisite Mehandi Artistry: Unveiling the Beauty of Intricate Designs</p>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default MehandiCarousal;