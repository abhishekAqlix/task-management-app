import { configureStore } from "@reduxjs/toolkit";
import task from './taskSlice'


const store= configureStore({
reducer:{
 tasks : task,
}

})


export default store;