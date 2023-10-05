import jwt_decode from "jwt-decode";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAPI } from '../apis/api';
import logoStudyMate from '../components/logoStudyMate.jpg';
import showPwdImg from "../context/hide-password.svg";
import '../context/login.css';
import hidePwdImg from "../context/show-password.svg";
function Login(props) {
  const navigate = useNavigate();
  const { handleAuthentication } = props;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [Message, setMessage] = useState("")
  useEffect(() => {
    localStorage.clear();
    props.handleAuthentication(false, null);
    localStorage.clear();
  }, [])
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      UserAPI.login(formData)
        .then((response) => {
          const accessToken = response.accessToken;
          const decodedToken = jwt_decode(accessToken);
          handleAuthentication(true, decodedToken.roles);
          localStorage.setItem('token', accessToken);
          localStorage.setItem('decodedToken', decodedToken);
          navigate('/home')
          const foundUser = UserAPI.getByPCN(decodedToken.userId)
            .then((foundUser) => {
              if (foundUser) {
                localStorage.setItem('user', JSON.stringify(foundUser));
                console.log(foundUser);
              }
            })
            // .catch((error) => {
            //   console.log(error.message);
            // });
        }
        )
        .catch((error) => {
          setMessage(`Invalid password or email`);
          // console.error(error.message);
        })
      setFormData({
        email: '',
        password: ''
      })
    } catch (error) {
      setMessage("Wrong password or email");
    }
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  return (
    <body>
      <MDBContainer fluid className="p-3 my-5 h-custom body">
        <form onSubmit={handleSubmit}>
          <MDBRow>
            <MDBCol col='1' md='6' className="image">
              <img src={logoStudyMate} class="img-fluid" width="500px" height="500px" alt="Sample image" />
            </MDBCol>
            <MDBCol col='4' md='5'>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <MDBInput wrapperClass='mb-4' label='Email address' id='email' name="email" type='text' size="lg" value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                } />
              <br></br>
              <div className="pwd-container">
                <MDBInput wrapperClass='mb-4' label='Password' id='password' name="password" type={isRevealPwd ? "text" : "password"}
                  value={formData.password}
                  onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                  } />
                <img
                  title={isRevealPwd ? "Hide password" : "Show password"}
                  src={isRevealPwd ? hidePwdImg : showPwdImg}
                  onClick={() => setIsRevealPwd(prevState => !prevState)}
                />
              </div>
              <div className='text-center text-md-start mt-4 pt-2 '>
                <MDBBtn type="submit" className="myButton" size='lg'>Login</MDBBtn>
                <Link to="/register" className="myButton1" size='lg'>Make an account</Link>
              </div>
              {Message && (
                <div className="alert alert-success" role="alert" style={{ backgroundColor: "palewhite", color: "#902923" }} >
                  {Message}
                </div>
              )}
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    </body>
  );
}
export default Login;