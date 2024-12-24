import React, { useState } from 'react';
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBadge
} from 'mdb-react-ui-kit';
import { FaBell } from 'react-icons/fa';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'second.' },
    { id: 2, message: 'first' },
    { id: 3, message: 'first.' }
  ]);

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
