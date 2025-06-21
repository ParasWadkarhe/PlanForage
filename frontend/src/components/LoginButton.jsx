import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import
import { useState } from 'react';


function LoginButton() {

  const[user,setUser] = useState(false);


  const onSuccess = (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
    console.log("Login Success:", userData);
    setUser(true)
  };

  const onError = () => {
    console.log("Login Failed");
    user(false)
  };

  const handleLogout = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    localStorage.clear();
    setUser(false)
    console.log("✅ User logged out.");
    alert("You have been logged out.");
  };

  return (
    <div className="my-4">
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
      {user==true?<button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button> :
      <></>
      }
      
    </div>
  );
}

export default LoginButton;
