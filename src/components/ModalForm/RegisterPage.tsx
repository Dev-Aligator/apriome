import React from "react";
import { useState } from "react";
import { googleIcon } from "../../assets";
import { environmentVariable } from "../../constants/environment";
interface RegisterPageProps {
  setFormPage: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegisterPage = ({ setFormPage }: RegisterPageProps) => {
  const [showPasswd, setShowPasswd] = useState(false);
  // const baseUrl = "http://localhost:8000";
  const baseUrl = environmentVariable.baseUrl;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "email") {
      // Automatically set the username to be the same as the email
      setFormData({
        ...formData,
        [name]: value,
        username: value, // Set username to email
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        console.log("User registered successfully!");
        // You can redirect the user to a login page or display a success message here
        setFormPage(true);
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form signup">
      <div className="form-content">
        <header>Signup</header>
        <form onSubmit={handleSubmit}>
          <div className="field input-field">
            <input
              type="text"
              className="input"
              required
              name="email"
              onChange={handleChange}
            ></input>
            <label className="form-label">Email Address</label>
          </div>
          <div className="field input-field">
            <input
              type={showPasswd ? "text" : "password"}
              className="password"
              name="password"
              onChange={handleChange}
              required
            ></input>
            <label className="form-label">Password</label>
          </div>
          <div className="field input-field">
            <input
              type={showPasswd ? "text" : "password"}
              className="password"
              required
            ></input>
            <label className="form-label">Confirm password</label>

            <i
              className={
                showPasswd ? "bx bx-show eye-icon" : "bx bx-hide eye-icon"
              }
              onClick={() => {
                if (showPasswd) {
                  setShowPasswd(false);
                } else {
                  setShowPasswd(true);
                }
              }}
            ></i>
          </div>
          <div className="field button-field">
            <button type="submit">Signup</button>
          </div>
        </form>
        <div className="form-link">
          <span>
            Already have an account?{" "}
            <a
              onClick={() => {
                setFormPage(true);
              }}
              className="link login-link"
            >
              Login
            </a>
          </span>
        </div>
      </div>
      <div className="line"></div>
      <div className="media-options">
        <a href="#" className="field facebook">
          <i className="bx bxl-facebook facebook-icon"></i>
          <span>Login with Facebook</span>
        </a>
      </div>
      <div className="media-options">
        <a href="#" className="field google">
          <img src={googleIcon} alt="" className="google-img"></img>
          <span>Login with Google</span>
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
