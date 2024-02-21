import React from "react";
import "../App.css";
import { IoClose } from "react-icons/io5";

const Form = ({ handelSubmit, handleChange, handleClose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handelSubmit}>
        <div className="close">
          <IoClose onClick={handleClose} />
        </div>
        <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          onChange={handleChange}
          value={rest.name}
        />
        <label htmlFor="email"> email</label>
        <input
          id="email"
          type="text"
          name="email"
          required
          onChange={handleChange}
          value={rest.email}
        />
        <label htmlFor="mobile">mobile</label>
        <input
          id="mobile"
          type="text"
          name="mobile"
          required
          onChange={handleChange}
          value={rest.mobile}
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Form;
