import "../styles/EditButtons.css";

import React from "react";

const EditButtons = ({ handleDelete, handleCancel }) => (
  <div className="Edit-Buttons">
    {handleDelete && (
      <div
        tabIndex="0"
        className="Edit-Button"
        style={{ backgroundColor: "#FF3547", marginLeft: 0 }}
        onClick={handleDelete}
      >
        Delete
      </div>
    )}
    <div tabIndex="0" className="Edit-Button-Cancel" onClick={handleCancel}>
      <ion-icon name="close" />
    </div>
  </div>
);

export default EditButtons;
