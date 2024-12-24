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
             url :`${id}`,
             method : 'DELETE'
        }),
        invalidatesTags: ['Task'],
}),
createTask : builder.mutation({
    query : (newUser)=>({
        url : '/',
        method : 'POST',
        body:newUser
    }),
    invalidatesTags: ['Task'],
 }),
  updateTask  : builder.mutation({
     query : ({id , saveValue})=>{
          
        return { 
          url : `${id}`,
          method : 'PUT',
          body: saveValue
     }},
     invalidatesTags: ['Task'],
  }),
  

})
})
export const { useGetTasksQuery ,useUpdateTaskMutation  , useDeleteIdMutation  , useCreateTaskMutation} = apiCall
