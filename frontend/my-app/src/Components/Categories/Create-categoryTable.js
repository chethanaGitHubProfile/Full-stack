import React, { useState } from "react";
import { Modal } from "antd";
import CategoryForm from "./Category-Form";
import toast from "react-hot-toast";
import axios from "axios";

const CategoryTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedForm, setUpdatedForm] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const { category } = props;
  let serialNumber = 0;

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <h2>Manage Category </h2>
      <h3>Total Category-{category.data.length}</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>categoryId</th>
            <th>category Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.data.map((ele, i) => {
            serialNumber++;
            const categoryId = `C${serialNumber.toString().padStart(2, "0")}`;
            return (
              <tr key={i}>
                <td>{serialNumber}</td>
                <td>{categoryId}</td>
                <td>{ele.name}</td>
                <td>{ele.status}</td>
                <td>
                  <button className="btn btn-primary ms-2">show</button>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => {
                      setVisible(true);
                      setUpdatedForm(ele.form);
                      // setEditIndex(i);
                    }}
                  >
                    edit
                  </button>
                  <button className="btn btn-danger ms-2">remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
        <CategoryForm
          value={updatedForm}
          setValue={setUpdatedForm}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </>
  );
};
export default CategoryTable;
