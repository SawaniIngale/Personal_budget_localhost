// import React from "react";

// function InactivityModal({ show, onStayLoggedIn, onLogout }) {
//     if (!show) return null;
  
//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <h4>Are you still there?</h4>
//           <p>You will be logged out due to inactivity.</p>
//           <button onClick={onStayLoggedIn}>Stay Logged In</button>
//           <button onClick={onLogout}>Log Out</button>
//         </div>
//       </div>
//     );
//   }

// export default InactivityModal;

import React from "react";

function InactivityModal({ show, onStayLoggedIn, onLogout }) {
  if (!show) return null;

  return (
    <>
      <style>
        {`
          .modal {
            display: block; 
            position: fixed; 
            z-index: 1; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto; 
            background-color: rgba(0,0,0,0.4); 
          }

          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 30%; 
          }

          .modal button {
            padding: 10px 20px;
            margin-right: 10px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
          }

          .modal button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      <div className="modal">
        <div className="modal-content">
          <h4>Are you still there?</h4>
          <p>You will be logged out due to inactivity.</p>
          <button onClick={onStayLoggedIn}>Stay Logged In</button>
          <button onClick={onLogout}>Log Out</button>
        </div>
      </div>
    </>
  );
}

export default InactivityModal;
