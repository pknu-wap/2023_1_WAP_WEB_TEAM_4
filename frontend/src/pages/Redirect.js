import React from "react";
import { useLocation } from "react-router-dom";

function Redirect() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 쿼리 문자열에서 원하는 매개변수를 가져옵니다.
  const paramValue = queryParams.get("paramName");

  // 이제 paramValue 변수에 쿼리 문자열에서 추출한 값이 들어 있습니다.
  console.log(paramValue);

  return (
    <div>
      <p>쿼리 문자열에서 가져온 값: {paramValue}</p>
    </div>
  );
}

export default Redirect;
