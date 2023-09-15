import React, { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = () => {
  const location = useLocation();

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  // useEffect(() => {
  //   if (token) {
  //     localStorage.setItem(ACCESS_TOKEN, token);
  //   }
  // }, [token]);

  if (token) {
    return <div>성공 {token}</div>;
  } else {
    return <div>실패 {error}</div>;
  }
};

export default OAuth2RedirectHandler;
