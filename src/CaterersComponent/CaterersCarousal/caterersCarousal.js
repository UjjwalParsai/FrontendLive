import "./caterersCarousal.css"
function CaterersCarousal() {

  return <div className="container-fluid">
    <div className="col-md-12" style={{  }}>
      <div className="row">
        <div className="col-md-12 text-end  "  >
          <img className="col-lg-7 col-sm-12 " src="./img/caterersCarousal.jpg" height={"355vh"} style={{ borderRadius: "0.9vh" }} />
          <div className="col-md-5 col-sm-12 text-start bg-white  caterers_car_conent">
            <p className="mt-5  caterers_content_head">Caterers <span style={{ color: "red" }}>services</span></p>
            <p className="text-muted" style={{ marginLeft: "7%" }}>
Exquisite Catering Services: Indulge in Unforgettable Flavors and Impeccable Service</p>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default CaterersCarousal;