import "./buggyCarousal.css"

function BuggyCarousal(){
    return <div className="container-fluid">
    <div className="col-md-12" style={{  }}>
      <div className="row">
        <div className="col-md-12 text-end  "  >
          <img className="col-lg-7 col-sm-12 " src="./img/buggyCarousal.jpg" height={"355vh"} style={{ borderRadius: "0.9vh" }} />
          <div className="col-md-5 col-sm-12 text-start bg-white  buggy_car_conent">
            <p className="mt-5  buggy_content_head">Find Best <span style={{ color: "red" }}>Buggy</span></p>
            <p className="text-muted" style={{ marginLeft: "7%" }}>Arrive in Style: Elegant Wedding Buggy Rentals for a Timeless Love Story</p>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default BuggyCarousal;