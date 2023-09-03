import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditModal({
  setModalShow,
  modalShow,
  editData,
  setEditData,
  userData,
  setEditDataIndex,
  editDataIndex,
  setErrors,
  errors,
}) {
  const handleClose = () => {
    setModalShow(false);
    setEditDataIndex(null);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: null,
    });
  };

  const handleSubmit = () => {
    const validationErrors = {};

    if (!editData.fullname?.trim()) {
      validationErrors.fullname = "Full name is required";
    }

    if (!editData.email?.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!editData.phonenumber?.trim()) {
      validationErrors.phonenumber = "Phone number is required";
    } else if (isNaN(editData.phonenumber) || editData.phonenumber.length < 7) {
      validationErrors.phonenumber =
        "Phone number should be a number of at least 7 digits";
    }

    if (!editData.dob?.trim()) {
      validationErrors.dob = "Date of birth is required";
    }

    if (!editData.province?.trim()) {
      validationErrors.province = "Province is required";
    }

    if (!editData.district?.trim()) {
      validationErrors.district = "District is required";
    }

    if (!editData.city?.trim()) {
      validationErrors.city = "City is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (editDataIndex !== null) {
      const userDetailIndex = userData?.findIndex(
        (item, i) => i === editDataIndex
      );
      if (userDetailIndex !== -1) {
        if (userDetailIndex === 0) {
          userData.splice(userDetailIndex, 1);
        }
        userData.splice(userDetailIndex, userDetailIndex);

        userData.splice(userDetailIndex, 0, editData);
        setModalShow(false);
        localStorage.setItem("userDetails", JSON.stringify(userData));
        setEditDataIndex(null);
      }
    }
  };

  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <form className="form">
            <div className="column">
              <div className="input-box">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  required
                  name="fullname"
                  onChange={handleChange}
                  value={editData?.fullname}
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
                  value={editData?.email}
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
                  value={editData?.phonenumber}
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
                  value={editData?.dob}
                />
                {errors.dob && <span className="error">{errors.dob}</span>}
              </div>
            </div>

            <div className="input-box address">
              <label>Address</label>

              <div className="column">
                <div className="select-box">
                  <select
                    name="country"
                    disabled
                    onChange={handleChange}
                    value={editData?.country}>
                    <option value={"nepal"} defaultValue>
                      Nepal
                    </option>
                  </select>
                </div>
                <div className="select-box">
                  <select
                    name="province"
                    onChange={handleChange}
                    value={editData?.province}>
                    <option value="">Province Number</option>
                    <option>Province 1</option>
                    <option>Province 2</option>
                    <option>Province 3</option>
                    <option>Province 4</option>
                    <option>Province 5</option>
                    <option>Province 6</option>
                    <option>Province 7</option>
                  </select>
                  {errors.province && (
                    <span className="error">{errors.province}</span>
                  )}
                </div>
              </div>
              <div className="column">
                <input
                  type="text"
                  placeholder="Enter your district"
                  required=""
                  name="district"
                  onChange={handleChange}
                  value={editData?.district}
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
                  value={editData?.city}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            </div>
          </form>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
