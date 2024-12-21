import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
          {task.map((value, index) => (
            <tr key={index}>
              <td>{value.title}</td>
              <td>{value.description}</td>
              <td>{value.priority}</td>
              <td>{value.status}</td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                  className="me-3"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleEdit(value, index);
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
