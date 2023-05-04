import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const ActivationPageComponent = () => {
  const { activationToken } = useParams();

  useEffect(() => {
    if (activationToken) {
      const activateEmail = async () => {
        try {
          const activation = await axios.post(
            "activation",
            { activationToken }
          );
          console.log(activation);
        } catch (error) {
          console.log(error);
        }
      };
      activateEmail();
    }
  }, [activationToken]);
  return <div>ACTIVATED!!</div>;
};

export default ActivationPageComponent;
