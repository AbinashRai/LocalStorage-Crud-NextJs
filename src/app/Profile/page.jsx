"use client";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import EditModal from "@/app/components/Modal";

const Profiles = () => {
  const [editData, setEditData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [editDataIndex, setEditDataIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState([]);

  const handleEdit = (index) => {
    setModalShow(true);
    const dataToBeEdit = userData?.find((data, i) => index === i);
    setEditData(dataToBeEdit);
    setEditDataIndex(index);
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userDetails")) || []);
  }, []);

  return (
    <>
      <h1 className="text-center p-2">Profiles</h1>
      <div className="container-profile">
        {userData.length === 0 ? (
          <p className="no-users">
            No users currently available, add a user to view the user
          </p>
        ) : (
          <Row>
            {userData.map((user, index) => (
              <Col key={index} sm={12} md={6} lg={4}>
                <Card className="user-card mb-4 p-3">
                  <p className="para">Name: {user.fullname}</p>
                  <p className="para">Phone Number: {user.phonenumber}</p>
                  <p className="para">Email: {user.email}</p>
                  <p className="para">Date of birth: {user.dob}</p>
                  <p className="para">Country: {user.country}</p>
                  <p className="para">Province: {user.province}</p>
                  <p className="para">District: {user.district}</p>
                  <p className="para">City: {user.city}</p>
                  <button className="mt-2" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                </Card>
              </Col>
            ))}
          </Row>
        )}
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
};

export default Profiles;
