import React, { useState } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow
} from 'mdb-react-ui-kit';
import { UserAPI } from '../apis/api';
function Register() {
  const [formData, setFormData] = useState({
    pcn: '',
    firstName: '',
    lastName: '',
    address: '',
    password: '',
    email: '',
  });
  const [Message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await UserAPI.create(formData);
      setMessage('User has been created with pcn ' + response.pcn);
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        password: '',
        email: '',
      })
    } catch (error) {
      console.log(error);
      // console.error(JSON.parse(error).message);
      setMessage(`Failed to create user:${error}`);
    }
  };
  return (
    <MDBContainer fluid>
      <form onSubmit={handleSubmit}>
        <div className="p-5 bg-image" style={{ backgroundColor: "#E4C7C4", height: '300px' }}></div>
        {/* <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px',backgroundColor:null, background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}> */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className='mx-5 mb-5 p-5 ' style={{
            marginTop: '-260px', justifyContent: 'center',
            alignItems: 'center', width: '670px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'
          }}>
            <h2 className="fw-bold mb-5">Become a member</h2>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='First name' id='firstName' name='firstName' type='text' value={formData.firstName}
                  onChange={(event) =>
                    setFormData({ ...formData, firstName: event.target.value })
                  } required />
              </MDBCol>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Last name' id='lastName' name='lastName' type='text' value={formData.lastName}
                  onChange={(event) =>
                    setFormData({ ...formData, lastName: event.target.value })
                  } required />
              </MDBCol>
            </MDBRow>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Address' id='address' name='address' type='text' value={formData.address}
                onChange={(event) =>
                  setFormData({ ...formData, address: event.target.value })
                } required />
            </MDBCol>
            <MDBInput wrapperClass='mb-4' label='Email' id='email' name='email' type='email' value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              } required />
            <MDBInput wrapperClass='mb-4' label='Password' id='password' name='password' type='password' value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              } required />
            <MDBBtn type='submit' className='w-100 mb-4' style={{ backgroundColor: "#222222", height: "70px" }} size='md'>Sign up</MDBBtn>
            {Message && (
              <div className="alert alert-success" role="alert">
                {Message}
              </div>
            )}
            {/* </MDBCard> */}
          </div>
        </div>

      </form>
    </MDBContainer>
  );
}
export default Register;