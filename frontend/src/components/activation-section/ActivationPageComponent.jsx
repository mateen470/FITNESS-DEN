import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ActivationPageComponent = () => {
  const { activationToken } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (activationToken) {
      const activateEmail = async () => {
        try {
          const activationProcess = await axios.post("activation", {
            activationToken,
          });
          if (activationProcess.data && activationProcess.data.success) {
            toast.success(activationProcess.data.message);
            navigate("/");
          } else if (
            activationProcess.response &&
            activationProcess.response.data &&
            activationProcess.response.data.message
          ) {
            navigate("/not-activated");
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      activateEmail();
    }
  }, [activationToken]);
  return <></>;
};

export default ActivationPageComponent;
