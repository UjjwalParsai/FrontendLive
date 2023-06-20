
import "./venueCarousal.css"
function VenueCarousal() {

  return <div className="container-fluid">
    <div className="col-md-12" style={{  }}>
      <div className="row">
        <div className="col-md-12 text-end  "  >
          <img className="col-md-7 " src="./img/carousal2.jpg" height={"350vh"} style={{ borderRadius: "0.9vh" }} />
          <div className="col-md-5 col-sm-12 text-start bg-white  venue_car_conent">
            <p className="mt-5  venue_content_head">Find your wedding <span style={{ color: "red" }}>venue</span></p>
            <p className="text-muted" style={{ marginLeft: "7%" }}>Search through a vast selection of venues to find the place that perfectly matches your wedding vision.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default VenueCarousal;