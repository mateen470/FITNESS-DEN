import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [eyeIcon, setEyeIcon] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const { email, password } = formData;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginRequest = await axios.post(
        "login",
        { email, password },
        { withCredentials: true }
      );
      if (loginRequest.data && loginRequest.data.success) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${loginRequest.data.data}`;
        toast.success(loginRequest.data.message);
        navigate("/route-check");
      }
      if (
        loginRequest.response &&
        loginRequest.response.data &&
        loginRequest.response.data.message
      ) {
        toast.error(loginRequest.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth < 1100 && windowHeight > 1000 ? (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: 5,
              p: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              width: "80vw",
            }}
          >
            <Typography fontSize={"7vw"} color={"white"} fontWeight={800}>
              Welcome Back!
            </Typography>
            <Box
              sx={{
                mt: 3,
                minWidth: "70%",
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid white",
              }}
            >
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  minWidth: "100%",
                  padding: "10px",
                  color: "white",
                  backgroundColor: "none",
                  outline: "none",
                  border: "none",
                  fontSize: "2vh",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: 3,
                minWidth: "70%",
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid white",
                pr: 3,
              }}
            >
              <input
                type={eyeIcon ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  minWidth: "100%",
                  padding: "10px",
                  color: "white",
                  backgroundColor: "none",
                  outline: "none",
                  border: "none",
                  fontSize: "2vh",
                }}
              />
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => setEyeIcon(!eyeIcon)}
              >
                {eyeIcon ? (
                  <RemoveRedEyeIcon sx={{ color: "white", fontSize: "2vh" }} />
                ) : (
                  <VisibilityOffIcon sx={{ color: "white", fontSize: "2vh" }} />
                )}
              </button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <NavLink to={"/forgot"}>
                <Typography
                  fontFamily={"Comme, sans-serif"}
                  color={"white"}
                  sx={{
                    borderBottom: "2px solid white",
                    fontSize: "2vh",
                  }}
                >
                  Forgot Password?
                </Typography>
              </NavLink>
            </Box>

            <Button
              onClick={handleFormSubmit}
              sx={{
                textTransform: "none",
                background: "white",
                color: "black",
                fontSize: "2.2vh",
                my: 2,
              }}
            >
              SignIn
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography
                fontFamily={"Comme, sans-serif"}
                color={"white"}
                sx={{ fontSize: "2vh" }}
              >
                Don't have an account?
                <NavLink
                  to={"/signup"}
                  style={{ borderBottom: "2px solid white", fontSize: "2vh" }}
                >
                  Sign Up
                </NavLink>
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : windowWidth < 1000 ? (
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            my: 5,
          }}
        >
          <Box
            sx={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: 5,
              p: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "50vh",
              width: "90vw",
            }}
          >
            <Typography
              fontSize={windowWidth < 400 ? "1.8rem" : "7vw"}
              color={"white"}
              fontWeight={800}
            >
              Welcome Back!
            </Typography>
            <Box
              sx={{
                mt: 3,
                minWidth: "70%",
                display: "flex",
                justifyContent: "center",
                borderBottom: "2px solid white",
                pr: 3,
              }}
            >
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  minWidth: "100%",
                  padding: windowWidth < 400 ? "10px 0px" : "10px",
                  color: "white",
                  backgroundColor: "none",
                  outline: "none",
                  border: "none",
                  fontSize: windowWidth < 400 ? "1.1rem" : "1.2rem",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: 3,
                minWidth: "70%",
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid white",
                pr: 3,
              }}
            >
              <input
                type={eyeIcon ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  minWidth: "100%",
                  padding: windowWidth < 400 ? "10px 0px" : "10px",
                  color: "white",
                  backgroundColor: "none",
                  outline: "none",
                  border: "none",
                  fontSize: windowWidth < 400 ? "1.1rem" : "1.2rem",
                }}
              />
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => setEyeIcon(!eyeIcon)}
              >
                {eyeIcon ? (
                  <RemoveRedEyeIcon
                    sx={{
                      color: "white",
                      fontSize: windowWidth < 400 ? "1.1rem" : "1.2rem",
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    sx={{
                      color: "white",
                      fontSize: windowWidth < 400 ? "1.1rem" : "1.2rem",
                    }}
                  />
                )}
              </button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <NavLink to={"/forgot"}>
                <Typography
                  fontFamily={"Comme, sans-serif"}
                  color={"white"}
                  sx={{
                    borderBottom: "2px solid white",
                    fontSize: "1.2rem",
                  }}
                >
                  Forgot Password?
                </Typography>
              </NavLink>
            </Box>

            <Button
              onClick={handleFormSubmit}
              sx={{
                textTransform: "none",
                background: "white",
                color: "black",
                fontSize: windowWidth < 400 ? "1rem" : "1.4rem",
                my: 2,
              }}
            >
              SignIn
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography
                fontFamily={"Comme, sans-serif"}
                color={"white"}
                sx={{ fontSize: "1.2rem" }}
              >
                Don't have an account?
                <NavLink
                  to={"/signup"}
                  style={{
                    borderBottom: "2px solid white",
                    fontSize: "1.2rem",
                  }}
                >
                  Sign Up
                </NavLink>
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontSize={"7vw"} color={"white"} fontWeight={800}>
            Welcome Back!
          </Typography>
          <Box
            sx={{
              mt: 3,
              minWidth: "70%",
              display: "flex",
              justifyContent: "center",
              borderBottom: "2px solid white",
            }}
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                minWidth: "100%",
                padding: "10px",
                color: "white",
                backgroundColor: "none",
                outline: "none",
                border: "none",
                fontSize: "1.7vw",
              }}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
              minWidth: "70%",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid white",
              pr: 3,
            }}
          >
            <input
              type={eyeIcon ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                minWidth: "100%",
                padding: "10px",
                color: "white",
                backgroundColor: "none",
                outline: "none",
                border: "none",
                fontSize: "1.7vw",
              }}
            />
            <button
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                outline: "none",
              }}
              onClick={() => setEyeIcon(!eyeIcon)}
            >
              {eyeIcon ? (
                <RemoveRedEyeIcon sx={{ color: "white", fontSize: "2.5vw" }} />
              ) : (
                <VisibilityOffIcon sx={{ color: "white", fontSize: "2.5vw" }} />
              )}
            </button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <NavLink to={"/forgot"}>
              <Typography
                fontFamily={"Comme, sans-serif"}
                color={"white"}
                sx={{
                  borderBottom: "2px solid white",
                  fontSize: "1.5vw",
                }}
              >
                Forgot Password?
              </Typography>
            </NavLink>
          </Box>
          <Box
            sx={{
              border: "2px solid white",
              p: 1,
              px: 2,
              mt: 3,
              height: "4vw",
              width: "8.5vw",
              cursor: "pointer",
            }}
            onClick={handleFormSubmit}
          >
            <Typography
              color={"black"}
              fontFamily={"Comme, sans-serif"}
              sx={{
                background: "white",
                fontSize: "1.7vw",
                height: "3.8vw",
                width: "9vw",
                ml: -4.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "scale 0.3s ease-in-out",
                fontWeight: "bold",
                "&:hover": {
                  scale: "0.95 !important",
                },
              }}
            >
              SignIn
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              fontFamily={"Comme, sans-serif"}
              color={"white"}
              sx={{ fontSize: "1.5vw" }}
            >
              Don't have an account?
              <NavLink
                to={"/signup"}
                style={{ borderBottom: "2px solid white", fontSize: "1.5vw" }}
              >
                Sign Up
              </NavLink>
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LoginForm;
