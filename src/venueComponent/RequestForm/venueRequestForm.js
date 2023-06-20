
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { style, reqTitle } from "./requestStyle"
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../webApi/BaseUrl/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Venue } from '../../webApi/Home/api';
import { useSelector } from 'react-redux';


export default function RequestForm({ open, setOpen, venueDetailsId }) {

  
  const [contactPerson, setContactPerson] = useState("")
  const [contactNumber, setContactNumber] = useState("");
  const [totalGuest, setTotalGuest] = useState("");
  const [typeOfEvent, setTypeOfEvent] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const {currentUser}=useSelector(state=>state.CurrentUser)

  const customerId = 15;

  const addRequest = async (event) => {
    try {
      event.preventDefault();

      let response = await axios.post(baseUrl.BASE_URl + Venue.ADD_Request, { contactPerson, contactNumber, totalGuest, typeOfEvent, checkIn, checkOut, customerId,venueDetailsId})
      if(response.status){
       setOpen(false);
      toast.success("request sent!")
      return response.data;
      }
     
    }
    catch (err) {

    }
  }




  const handleClose = () => setOpen(false);

  return <div>
         
    <Modal
    
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
     
        <Typography sx={reqTitle} variant="h6" component="h2">
        
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                Request Booking
              </div>

              <div className="col-md-6 text-end">
                <IconButton aria-label="delete">
                  <CloseIcon onClick={handleClose} />
                </IconButton>
              </div>
            </div>

          </div>

        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p className="text-muted">Fill this form the vendor will contact you shortly. All the information provided will be treated confidentially.</p>
          <div className="col-md-12">
            <div className="row ">
              <form className="form" onSubmit={addRequest}>
                <div className="col-md-12">
                  <input onChange={(event) => setContactPerson(event.target.value)} className="col-md-12 form-control reqInput" type="text"   placeholder="Enter Contact Person Name" />
                </div>
                <div className="col-md-12 mt-4">
                  <input onChange={(event) => setContactNumber(event.target.value)} className="col-md-12 form-control" type="text" placeholder="Enter Mobile Number" />
                </div>

                <div className="row">
                  <div className="col-md-6 mt-4">
                    <input onChange={(event) => setTotalGuest(event.target.value)} className="col-md-12 form-control" type="text" placeholder="Total Guest" />
                  </div>

                  <div className="col-md-6 mt-4">
                    <input onChange={(event) => setTypeOfEvent(event.target.value)} className="col-md-12 form-control " type="text" placeholder="Type of Event" />
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-6 mt-4 p-1">
                    <label>Select Check In Date</label>
                    <input onChange={(event) => setCheckIn(event.target.value)} className="col-md-12 form-control" type="date" />
                  </div>

                  <div className="col-md-6 mt-4 p-1">
                    <label>Select Check out Date</label>
                    <input onChange={(event) => setCheckOut(event.target.value)} className="col-md-12 form-control " type="date" defaultValue={checkIn} pattern="\d{1,2}/\d{1,2}/\d{4}" />
                  </div>

                </div>

                <button type='submit' className="btn btn-danger col-md-12 mt-4">Submit</button>
              </form>

            </div>
          </div>
        </Typography>
      </Box>
    </Modal>

  </div>

}