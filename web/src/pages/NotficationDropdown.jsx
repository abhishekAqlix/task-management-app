import React, { useState, useEffect } from 'react';
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBadge
} from 'mdb-react-ui-kit';
import { FaBell } from 'react-icons/fa';
import socketIO from 'socket.io-client';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = socketIO.connect('http://localhost:4000');

    socket.on('connection', () => {
      console.log('Connected to the server');
    });

    socket.on('taskUpdated', (task) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: task._id, message: `Task updated: ${task.title}` }
      ]);
    });

    socket.on('taskDeleted', (taskId) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: taskId, message: `Task deleted: ${taskId}` }
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const notificationCount = notifications.length;

  return (
    <div>
      <MDBDropdown>
        <MDBDropdownToggle tag="button" className="btn btn-primary">
          <FaBell style={{ color: 'crimson', marginRight: '8px' }} />
          {notificationCount > 0 && (
            <MDBBadge color="danger" className="ms-2">
              {notificationCount}
            </MDBBadge>
          )}
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MDBDropdownItem key={notification.id} link childTag='button'>
                {notification.message}
              </MDBDropdownItem>
            ))
          ) : (
            <MDBDropdownItem link childTag='button'>
              No notifications
            </MDBDropdownItem>
          )}
        </MDBDropdownMenu>
      </MDBDropdown>
    </div>
  );
};

export default NotificationDropdown;