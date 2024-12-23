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

export default function Modle({ onOpen, onClose, onSave, edit }) {
  const [title, setTitle] = useState(edit ? edit.title : "");
  const [description, setDescription] = useState(edit ? edit.description : "");
  const [priority, setPriority] = useState(edit ? edit.priority : "High");
  const [dueDate, setDueDate] = useState(edit ? edit.dueDate : " ");
  const [status, setStatus] = useState(edit ? edit.status : "Todo");

  const clickSave = () => {
    if (
      title.length === 0 ||
      description.length === 0 
    ) {
      toast.error("title , description , priority are must!!");
    } else {
      onSave({ title, description, priority, status });
    }
  };

  return (
    <>
      <MDBModal open={onOpen}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Task</MDBModalTitle>
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
                    placeholder="Discription.."
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
                  <imput
                    className="form-control"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Discription.."
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
                    <option value="Done"> Done </option>
                    <option value="Invalid"> Invalid </option>
                  </select>
                </div>
              </Form>
            </MDBModalBody>
            <MDBModalFooter>
              <button className="bg-secondary" onClick={onClose}>
                Close
              </button>
              <button className="bg-primary" onClick={clickSave}>
                Save
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
