import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import

function LoginButton() {
  const onSuccess = (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
    console.log("Login Success:", userData);
  };

  const onError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="my-4">
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </div>
  );
}

export default LoginButton;
