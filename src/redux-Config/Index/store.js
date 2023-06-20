import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import topVenueSlice from "./topVenueSlice";
import topMakeupSlice from "./topMakeupSlice";
import topPanditSlice from "./topPanditSlice";
import userSlice from "./userSlice";



const store=configureStore({

    reducer:{
        category:categorySlice,
        topVenue:topVenueSlice,
        topMakeup:topMakeupSlice,
        topPandit:topPanditSlice,
        CurrentUser:userSlice,
   }
});

export default store