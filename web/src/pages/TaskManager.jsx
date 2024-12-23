import { useState , useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Modle from '../component/Modle'
import { addTask, editTask } from "../redux/taskSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useCreateTaskMutation, useDeleteIdMutation, useGetTasksQuery } from "../services/apiCall";


function TaskManager() {
  //const task = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editValue, setEditValue] = useState(null);
  const [createTask ] = useCreateTaskMutation();
  const response = useGetTasksQuery();
  const [deleteTask] =useDeleteIdMutation();

console.log("task",response )

  useEffect(()=>{
    if(response.isLoading){
      console.log('loading....');
      }
      if(response.isSuccess){
        console.log("response",response)
      }
      
  },[response , createTask])

 
  function handleEdit(value, index) {
    console.log("value", value);
    setEditValue({ ...value, index });
    setShowModal(true);
  }

  function handleSave(saveValue) {
   if(editValue){ 
      dispatch(editTask({ index: editValue.index, saveValue }) )
   } else {
      dispatch(addTask(saveValue)) 
       createTask(saveValue)
    } 
          
    setShowModal(false);
    setEditValue(null);
  }

  function handleDelete(status , id) {
    if (status === "Done" || status === "Invalid") {
      //dispatch(deleteTask(index));
        deleteTask(id)

    } else {
      toast.error("First complete your task!!");
    }
  }

  return (
    <Container>
      <Button onClick={() => setShowModal(true)} className="mx-2 my-3">
        Add Task
      </Button>

      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Discription</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.map((value, index) => (
            <tr key={index}>
              <td>{value.title}</td>
              <td>{value.description}</td>
              <td>{value.priority}</td>
              <td>{value.status}</td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(value.status , value._id);
                  }}
                  className="me-3"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleEdit(value, index );
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showModal && (
        <Modle
          onOpen={() => setShowModal(true)}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          edit={editValue}
        />
      )}
    </Container>
  );
}


export default TaskManager;







// import React, { useEffect } from 'react';
// import { useCreateUserMutation } from '../services/apiCall';
// import { useDispatch } from 'react-redux';
// import { addTask } from '../slices/taskSlice';

// const MyComponent = () => {
//   const dispatch = useDispatch();
//   const [createUser, res] = useCreateUserMutation();

//   const handleAddTask = (task) => {
//     dispatch(addTask(task));
//     createUser(task);
//   };

//   useEffect(() => {
//     if (res.isLoading) {
//       console.log('loading....');
//     }
//     if (res.isSuccess) {
//       console.log('response', res);
//     }
//   }, [res]);

//   return (
//     <div>
//       <button onClick={() => handleAddTask({ id: 1, name: 'New Task' })}>
//         Add Task
//       </button>
//     </div>
//   );
// };

// export default MyComponent;
