"use client";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineSortAscending } from "react-icons/ai";
import { Button, Modal } from "react-bootstrap";
import Link from "next/link";
import EditModal from "./Modal";

function Home() {
  const [formDetails, setFormDetails] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    dob: "",
    country: "Nepal",
    province: "",
    district: "",
    city: "",
  });

  const [userData, setUserData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editDataIndex, setEditDataIndex] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};

    if (!formDetails.fullname.trim()) {
      validationErrors.fullname = "Full Name is required";
    }

    if (!formDetails.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formDetails.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formDetails.phonenumber.trim()) {
      validationErrors.phonenumber = "Phone number is required";
    } else if (
      isNaN(formDetails.phonenumber) ||
      formDetails.phonenumber.length < 7
    ) {
      validationErrors.phonenumber =
        "Phone number should be a number of at least 7 digits";
    }

    if (!formDetails.dob.trim()) {
      validationErrors.dob = "Date of birth is required";
    }

    if (!formDetails.province.trim()) {
      validationErrors.province = "Province is required";
    }

    if (!formDetails.district.trim()) {
      validationErrors.district = "District is required";
    }

    if (!formDetails.city.trim()) {
      validationErrors.city = "City is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const getDataFromLocalStorage =
      JSON.parse(localStorage.getItem("userDetails")) || [];
    const allUserDetails = [...getDataFromLocalStorage, formDetails];
    setUserData(allUserDetails);
    localStorage.setItem("userDetails", JSON.stringify(allUserDetails));

    alert("User has been added successfully!");
  };

  const handleChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
      country: "Nepal",
    });
  };
  const handleEdit = (index) => {
    setModalShow(true);
    const dataToBeEdit = userData?.find((data, i) => index === i);
    console.log(dataToBeEdit);
    setEditData(dataToBeEdit);
    setEditDataIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUserData = userData?.filter((data, i) => i !== index);
    setUserData(updatedUserData);
    localStorage.setItem("userDetails", JSON.stringify(updatedUserData));
  };

  const handleSort = () => {
    const newSortDirection =
      sortDirection === "ascending" ? "descending" : "ascending";
    setSortDirection(newSortDirection);

    const sortedUserData = [...userData].sort((a, b) => {
      const nameA = a.fullname.toUpperCase();
      const nameB = b.fullname.toUpperCase();
      if (nameA < nameB) {
        return sortDirection === "ascending" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortDirection === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setUserData(sortedUserData);
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userDetails")) || []);
  }, []);

  return (
    <>
      <section className="container">
        <header>USER FORM</header>
        <form className="form" onSubmit={handleSubmit}>
          <div className="column">
            <div className="input-box">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                required=""
                name="fullname"
                onChange={handleChange}
              />
              {errors.fullname && (
                <span className="error">{errors.fullname}</span>
              )}
            </div>
            <div className="input-box">
              <label>Email Address</label>
              <input
                type="text"
                placeholder="Enter email address"
                required=""
                name="email"
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="Enter phone number"
                required=""
                name="phonenumber"
                onChange={handleChange}
              />
              {errors.phonenumber && (
                <span className="error">{errors.phonenumber}</span>
              )}
            </div>
            <div className="input-box">
              <label>Birth Date</label>
              <input
                type="date"
                placeholder="Enter birth date"
                required=""
                name="dob"
                onChange={handleChange}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
          </div>

          <div className="input-box address">
            <label>Address</label>

            <div className="column">
              <div className="select-box">
                <select name="country" disabled onChange={handleChange}>
                  <option value={"nepal"} defaultValue>
                    Nepal
                  </option>
                </select>
              </div>
              <div className="select-box">
                <select name="province" onChange={handleChange}>
                  <option value="">Province Number</option>
                  <option>Province 1</option>
                  <option>Province 2</option>
                  <option>Province 3</option>
                  <option>Province 4</option>
                  <option>Province 5</option>
                  <option>Province 6</option>
                  <option>Province 7</option>
                </select>
              </div>

              {errors.province && (
                <span className="error">{errors.province}</span>
              )}
            </div>
            <div className="column">
              <input
                type="text"
                placeholder="Enter your district"
                required=""
                name="district"
                onChange={handleChange}
              />
              {errors.district && (
                <span className="error">{errors.district}</span>
              )}
              <input
                type="text"
                placeholder="Enter your city"
                required=""
                name="city"
                onChange={handleChange}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>

      <div className="user-table">
        <table className="content-table">
          <thead>
            <tr className="tableHeading">
              <th>S.N</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Phone Number</th>
              <th>Country</th>
              <th>Province</th>
              <th>District</th>
              <th>City</th>
              <th>
                Actions{" "}
                <button className="sort" onClick={handleSort}>
                  Sort <AiOutlineSortAscending />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-users">
                  The table is empty, add users to fill the table
                </td>
              </tr>
            ) : (
              userData?.map((data, i) => (
                <tr className="active-row" key={i}>
                  <td>{i + 1}</td>
                  <td>{data.fullname}</td>
                  <td>{data.email}</td>
                  <td>{data.dob}</td>
                  <td>{data.phonenumber}</td>
                  <td>{data?.country}</td>
                  <td>{data.province}</td>
                  <td>{data.district}</td>
                  <td>{data.city}</td>
                  <td>
                    <Button
                      className="edit"
                      variant="primary"
                      onClick={() => handleEdit(i)}>
                      Edit <FiEdit />
                    </Button>
                    <Modal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <button className="delete" onClick={() => handleDelete(i)}>
                      Delete <MdOutlineDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <Link href="/profiles">
          <button>View profiles</button>
        </Link>
      </div>

      <EditModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        editData={editData}
        setEditData={setEditData}
        userData={userData}
        editDataIndex={editDataIndex}
        setEditDataIndex={setEditDataIndex}
        setUserData={setUserData}
        errors={errors}
        setErrors={setErrors}
      />
    </>
  );
}

export default Home;
