import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux-Config/Index/userSlice";
import { toast } from "react-toastify";

function Navbar() {
    const {currentUser}=useSelector(state=>state.CurrentUser);
    const {categoryList,isLoding,error}=useSelector(state=>state.category)
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const signout=()=>{
     navigate("/")
      dispatch(signOut())
    }

    return <div className="container-fluid  ">
        <nav className="navbar navbar-expand-lg navbar-light  mainDiv">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="../img/logo.png" height={"55px"} width={"300px"} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse  " id="navbarText">
                    <ul className="navbar-nav navLink ">
                        <li className="nav-item ">
                            <Link className="nav-link " to="/">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/venue">VENUE</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link  dropdown-toggle"    data-bs-toggle="dropdown" aria-expanded="false">
                                SERVICES
                            </Link>
                            <ul className="dropdown-menu" >
                              {!error&&categoryList.map((category,index)=><li><Link  to={"/"+category.categoryName} className="dropdown-item" >{category.categoryName.toUpperCase()}</Link></li>)  }
                                
                            </ul>
                        </li>
                       
                        {!currentUser&&<li className="nav-item dropdown">
                        <Link className="nav-link  dropdown-toggle"    data-bs-toggle="dropdown" aria-expanded="false">
                                SINGIN
                            </Link>
                            <ul className="dropdown-menu" >
                               <li><Link className="dropdown-item" to="/user/signIn" >As a User</Link></li>
                               <li><Link className="dropdown-item" >As a Vender</Link></li>
                                
                            </ul>
                        </li>}

                        {!currentUser&&<li className="nav-item">
                            <Link className="nav-link " to="/user/signUp">SIGNUP</Link>
                        </li> }
                        
                        
                       {currentUser&& <li className="nav-item">
                            <span onClick={signout} className="nav-link ">SIGNOUT</span>
                        </li>
                            }
                    </ul>
                </div>
            </div>
        </nav>
    </div>
}


export default Navbar;