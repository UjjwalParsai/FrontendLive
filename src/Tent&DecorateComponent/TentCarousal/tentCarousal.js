
import "./tentCarousal.css"
function TentCarousal() {

  return <div className="container-fluid">
    <div className="col-md-12" style={{  }}>
      <div className="row">
        <div className="col-md-12 text-end  "  >
          <img className="col-md-7 " src="./img/tentCarousal.jpg" height={"350vh"} style={{ borderRadius: "0.9vh" }} />
          <div className="col-md-5 col-sm-12 text-start bg-white  tent_car_conent">
            <p className="mt-5  tent_content_head">Find wedding <span style={{ color: "red" }}>Tent&Decorate</span></p>
            <p className="text-muted" style={{ marginLeft: "7%" }}>Transform Your Space: Discover the Perfect Tent & Decorations for Your Next Event</p>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default TentCarousal;