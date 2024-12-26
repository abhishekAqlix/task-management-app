import React, { useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Form  } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";

export default function Modle({ onOpen, onClose, onSave, edit }) {
  const [title, setTitle] = useState(edit ? edit.title : "");
  const [description, setDescription] = useState(edit ? edit.description : "");
  const [priority, setPriority] = useState(edit ? edit.priority : "High");
  const [dueDate, setDueDate] = useState(edit ? moment(edit.dueDate).format("YYYY-MM-DD") : ""); 
  const [dueTime, setDueTime] = useState(edit ? moment(edit.dueDate).format("HH:mm") : ""); 
  const [status, setStatus] = useState(edit ? edit.status : "Todo");

  const handleSave = () => {
    if (!title || !description || !dueDate || !dueTime) {
      toast.error("Title, description, due date, and due time are required!");
      return;
    }

    try {
      // Combine date and time into a single UTC datetime string
      const combinedDateTime = moment(`${dueDate}T${dueTime}`).utc().format();

      onSave({
        title,
        description,
        priority,
        dueDate: combinedDateTime,
        status,
      });
    } catch (error) {
      toast.error("Failed to save the task. Please check the inputs.");
    }
  };

  return (
    <>
      <MDBModal open={onOpen}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{edit ? "Edit Task" : "Add Task"}</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <Form>
                <div className="mx-2 my-3">
                  <strong>Title </strong>
                  <input
                    type="text"
                    disabled ={edit}
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                </div>

                <div className="mx-2 my-3">
                  <strong className="mb-2">Discription</strong>
                  <textarea
                    className="form-control"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description.."
                  />
                </div>

                <div className="mx-2 my-3">
                  <strong className="mb-2">Priority</strong>
                  <select
                    className="form-control"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High"> High </option>
                    <option value="Medium"> Medium </option>
                    <option value="Low"> Low </option>
                  </select>
                </div>

                <div className="mx-2 my-3">
                  <strong className="mb-2">Due Date</strong>
                  <input
                    className="form-control"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div className="mx-2 my-3">
                  <strong className="mb-2">Due Time</strong>
                  <input
                    className="form-control"
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                  />
                </div>

                <div className="mx-2 my-3">
                  <strong className="mb-2">Status</strong>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Todo"> Todo </option>
                    <option value="Progress"> Progress </option>
                    <option value="Done"  disabled={!edit}> Done </option>
                    <option value="Invalid"  disabled={!edit}> Invalid </option>
                  </select>
                </div>
              </Form>
            </MDBModalBody>
            <MDBModalFooter>
              <button className="bg-secondary" onClick={onClose}>
                Close
              </button>
              <button className="bg-primary" onClick={handleSave}>
                Save
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
