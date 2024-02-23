import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./component/Form";

 

function App() {
  console.log(process.env.REACT_APP_SERVER_DOMIN)
  const [dataList, setDataList] = useState([]);
  const [showCreate, setShewCreate] = useState(false);
  const [showEdit, setShewEdit] = useState(false);
  const [createData, setCreateData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // read data
  const handelGetDataList = async () => {
    const dataRes = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}`);
    if (dataRes.data.success) {
      setDataList(dataRes.data.data);
    }
  };
  useEffect(() => {
    handelGetDataList();
  }, []);
  // create data
   const handelSubmit = async (e) => {
    e.preventDefault();
     const resData = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/create`, createData);
    console.log(resData);
    if (resData.data.success) {
      alert(resData.data.message);
      setShewCreate(false);

      handelGetDataList();
      setCreateData({
        name: "",
        email: "",
        mobile: "",
      });
    }
  };
// delete data
  const handelDelete = async (id) => {
    const dataRes = await axios.delete( `${process.env.REACT_APP_SERVER_DOMIN}/delete/${id}` );
    if (dataRes.data.success) {
      handelGetDataList();
      alert(dataRes.data.message);
    }
  };
  const handelEdit = (el) => {
    setEditData(el);
    setShewEdit(true);
  };
  // updata data
  const handelSubmitEdit = async(e) => {
    e.preventDefault();
    const resData = await axios.put(`${process.env.REACT_APP_SERVER_DOMIN}/update`,editData);
    console.log(resData);
    if (resData.data.success) {
      handelGetDataList();
      alert(resData.data.message);
      setShewEdit(false);
    }
  };
  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setShewCreate(true)}>
        Add
      </button>
      {showCreate && (
        <>
          <Form
            handelSubmit={handelSubmit}
            handleChange={handleChange}
            handleClose={() => setShewCreate(false)}
            rest={createData}
          />
        </>
      )}

      {showEdit && (
        <>
          <Form
            handelSubmit={handelSubmitEdit}
            handleChange={handleChangeEdit}
            handleClose={() => setShewEdit(false)}
            rest={editData}
          />
        </>
      )}
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>mobile</th>
              <th></th>
            </tr>
          </thead>
          {dataList[0] ? (
            dataList.map((el) => {
              return (
                <tbody>
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                      <dutton
                        className="btn btn-edit"
                        onClick={() => handelEdit(el)}
                      >
                        Edit
                      </dutton>
                      <dutton
                        className="btn btn-delete"
                        onClick={() => handelDelete(el._id)}
                      >
                        {" "}
                        Delete
                      </dutton>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>...please wait </p>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
