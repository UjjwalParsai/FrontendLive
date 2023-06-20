import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../webApi/BaseUrl/baseUrl";
import  apiEndPoint from "../../webApi/Home/api"

export const fetchTopVenue= createAsyncThunk("topVenueSlice/fetchTopVenue",async()=>{
    let response= await axios.get(baseUrl.BASE_URl+apiEndPoint.TOPVENUE_LIST);
    console.log(response.data);
    return response.data;
});

const slice= createSlice({
    name:"topVenue",
    initialState:{
        topVenueList: [],
        isLoading: false,
        error: null
    },
    extraReducers:(builder)=> {
       builder.addCase(fetchTopVenue.pending,(state,action)=>{
          state.isLoading=true;
       }).addCase(fetchTopVenue.fulfilled,(state,action)=>{
        state.topVenueList = action.payload.venueList;
        state.isLoading = false;
    }).addCase(fetchTopVenue.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = "something went wrong";
    })
    }
})

export default slice.reducer;