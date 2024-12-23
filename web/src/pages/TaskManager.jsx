import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Modle from '../component/Modle'
import { addTask, deleteTask, editTask } from "../redux/taskSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function TaskManager() {
  const task = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editValue, setEditValue] = useState(null);

  function handleEdit(value, index) {
    console.log("value", value);
    setEditValue({ ...value, index });
    setShowModal(true);
  }

  function handleSave(saveValue) {
   if(editValue){ 
      dispatch(editTask({ index: editValue.index, saveValue }) )
    } else {
      dispatch(addTask(saveValue)) } 

    setShowModal(false);
    setEditValue(null);
  }

  function handleDelete(index) {
    if (task[index].status === "Done" || task[index].status === "Invalid") {
      dispatch(deleteTask(index));
    } else {
      toast.error("First complete your task!!");
    }
  }

  // useEffect(()=>{
  //   console.log("task",task);
  // },[task])

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-secondary">Task Manager</h1>
      
        <Button onClick={() => setShowModal(true)} variant="outline-primary">
          <FaPlus className="me-2" /> Add Task
        </Button>
      </div>
      <hr className="flex-grow-1 mx-2 my-3 border-top border-secondary" />
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="bg-light text-secondary">
          <tr>
            <th>Title</th>
            <th>Discription</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {task.map((value, index) => (
            <tr key={index}>
              <td>{value.title}</td>
              <td>{value.description}</td>
              <td>{value.priority}</td>
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
                  onClick={() => handleEdit(value, index)}
                  variant="outline-info"
                  size="sm"
                  className="me-2 d-flex align-items-center"
                >
                  <FaEdit className="me-1" /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(index)}
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
