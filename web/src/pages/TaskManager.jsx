import { useState , useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Modle from '../component/Modle'
import { addTask, editTask , deleteTask} from "../redux/taskSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import NotificationDropdown from "./NotficationDropdown";
import { useCreateTaskMutation, useDeleteIdMutation, useGetTasksQuery, useUpdateTaskMutation } from "../services/apiCall";
import socketIO from 'socket.io-client';




function TaskManager() {
  //const task = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editValue, setEditValue] = useState(null);
  const [createTask ] = useCreateTaskMutation();
  const response = useGetTasksQuery();
  const [deleteTask] =useDeleteIdMutation();
  const socket = socketIO.connect('http://localhost:4000');


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
      updateTask({ id : editValue._id, saveValue})
      setEditValue(null);
   } else {
      dispatch(addTask(saveValue)) 
       createTask(saveValue)
    } 
    setShowModal(false);
    
  }

  function handleDelete(status , id , index) {
    if (status === "Done" || status === "Invalid") {
      dispatch(deleteTask(index));
        deleteId(id)

    } else {
      toast.error("deleted when task is Done or Invalid");
    }
  }

  //response.data?.map((val)=>{
    // console.log( val.dueDate.split('T')[0])
    // const dueD =  new Date(val.dueDate);
    // const res =  dueD
    // console.log("res", res)
//  })
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-secondary">Task Manager</h1>
      

    <div className="d-flex justify-content-between">
        <Button onClick={() => setShowModal(true)} variant="outline-primary" className="mx-1">
          <FaPlus className="me-2" /> Add Task
        </Button>
        <NotificationDropdown />
        </div>
      </div>
      <hr className="flex-grow-1 mx-2 my-3 border-top border-secondary" />
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="bg-light text-secondary">
          <tr>
            <th>Title</th>
            <th>Discription</th>
            <th>Priority</th>
            <th>Due Date</th>
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
              <td>{value.dueDate}</td>
              <td
                className={
                  value.status === "Done"
                    ? "text-success"
                    : value.status === "Invalid"
                    ? "text-danger"
                    : "text-warning"
                }
              >
                {value.status}
              </td>
              <td className="d-flex justify-content-start" width={'100px'}>
                <Button
                  onClick={() => handleEdit(value, index )}
                  variant="outline-info"
                  size="sm"
                  className="me-2 d-flex align-items-center"
                >
                  <FaEdit className="me-1" /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(value.status ,value._id , index)}
                  variant="outline-danger"
                  size="sm"
                  className="d-flex align-items-center"
                >
                  <FaTrashAlt className="me-1" /> Delete
                </Button>
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
