import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ActivationPageComponent = () => {
  const { activationToken } = useParams();
  useEffect(() => {
    if (activationToken) {
      const activateEmail = async () => {
        try {
          const activationProcess = await axios.post("activation", {
            activationToken,
          });
          if (activationProcess.data && activationProcess.data.success) {
            toast.success(activationProcess.data.message);
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
