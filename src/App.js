
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/home/Home';
import VenueHome from './venueComponent/VenueHome/venueHome';
import Navbar from './component/navigation/navbar';
import VenueDescription from './venueComponent/Description/description';
import MakeupHome from './makeupComponent/MakeupHome/makeupHome';
import MakeupDescription from './makeupComponent/makeupDescription/makeupDescription';
import PanditHome from './panditComponent/PanditHome/panditHome';
import PanditDescription from './panditComponent/panditDescription/panditDescription';
import UserSignIn from './component/user/SignIn/user-signin';
import PhotographerHome from './photographerComponent/photographerHome/photographerHome';
import MehandiHome from './mehandiComponent/MehandiHome/mehandiHome';
import MehandiDescription from './mehandiComponent/MehandiDetails/mehandiDescription';
import PhotographerDescription from './photographerComponent/PhotographerDetails/photographerDetail';
import BandHome from './BandComponet/BandHome/bandHome';
import BandDescription from './BandComponet/BandDescription/bandDescription';
import TentHome from './Tent&DecorateComponent/TentHome/tentHome';
import CaterersHome from './CaterersComponent/CateresHome/caterersHome';
import BuggyHome from './BuggyComponent/BuggyHome/buggyHome';
import UserSignUp from './component/user/Signup/user.signup';


function App() {
  return <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/venue" element={<VenueHome />} />
      <Route path='/venue-detail' element={<VenueDescription />} />
      <Route path="/makeup Artist" element={<MakeupHome/>} />
      <Route path='/makeup-detail' element={<MakeupDescription/>} />
      <Route path="/pandit" element={<PanditHome/>} />
      <Route path='/pandit-detail' element={<PanditDescription />} />
      <Route path='/user/signIn' element={<UserSignIn />}></Route>
      <Route path='/user/signUp' element={<UserSignUp/>}></Route>
      <Route path='/photographer' element={<PhotographerHome/>}/>
      <Route path='/photographer-detail' element={<PhotographerDescription/>}/>
      <Route path='/mehandi Artist' element={<MehandiHome/>}/>
      <Route path='/mehandi-detail' element={<MehandiDescription/>}/>
      <Route path='/band&dj' element={<BandHome/>}/>
      <Route path='/band&Dj-detail' element={<BandDescription/>}/>
      <Route path='/tent-decorate' element={<TentHome/>}/>
      <Route path='/caterers' element={<CaterersHome/>}/>
      <Route path='/buggy' element={<BuggyHome/>}/>

    </Routes>
  </>

}

export default App;
