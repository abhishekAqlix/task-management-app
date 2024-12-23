import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCall= createApi({
reducerPath:'apiCall',
baseQuery: fetchBaseQuery({
    baseUrl:'http://localhost:4000/api/task',

    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token"); 
      
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
      },


}),
tagTypes: ['Task'],
endpoints :(builder)=>({
    
 getTasks: builder.query({
 query:()=>({
    url : '/',
    method : 'GET'
    }),
    providesTags: ['Task'],
  }),

deleteId : builder.mutation({
    query : (id)=>({
             url :`:${id}`,
             method : 'DELETE'
        })
}),
createTask : builder.mutation({
    query : (newUser)=>({
        url : '/',
        method : 'POST',
        body:newUser
    }),
    invalidatesTags: ['Task'],
 }),
//  updateUser  : builder.mutation({
//     query : (updated)=>{
//         // const {id , ...data} = updated

//        return { 
//         // url : `api/task/${id}`,
//         // method : 'PUT',
//         // body:data,
        
//     }}
//  }),
  

})
})
export const { useGetTasksQuery ,useUpdateUserMutation  , useDeleteIdMutation  , useCreateTaskMutation} = apiCall

















