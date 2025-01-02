import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBadge } from 'mdb-react-ui-kit';
import { FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';

const socket = io('http://localhost:4000', { transports: ['websocket'] });

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  console.log('notifications:', notifications);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server for notification');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    socket.on('tasksDue', (tasks) => {
      console.log('Received tasks:', tasks);
      const newNotifications = tasks.map(task => ({
        message: `Task due soon: ${task.title}`,
        id: task._id,
      }));
      setNotifications(newNotifications);
      setNotificationCount(newNotifications.length);

      newNotifications.forEach(notification => {
        toast.info(notification.message);
      });
    });

    return () => {
      socket.off('tasksDue');
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
    };
  }, [notifications]);

  return (
    <div>
      <MDBDropdown>
        <MDBDropdownToggle tag="button" className="btn btn-primary">
          <FaBell style={{ color: 'white', marginRight: '8px' }} />
          {notificationCount > 0 && (
            <MDBBadge color="danger" className="ms-2">
              {notificationCount}
            </MDBBadge>
          )}
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MDBDropdownItem key={notification.id} link as="button">
                {notification.message}
              </MDBDropdownItem>
            ))
          ) : (
            <MDBDropdownItem link as="button">
              No notifications
            </MDBDropdownItem>
          )}
        </MDBDropdownMenu>
      </MDBDropdown>
    </div>
  );
};

export default NotificationDropdown;