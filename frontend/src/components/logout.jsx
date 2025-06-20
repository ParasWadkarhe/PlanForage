import React from 'react';

function LogoutButton() {
  const handleLogout = () => {
    // Disable Google auto-login (optional)
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    // Clear local storage or any saved tokens/user data
    localStorage.clear();

    console.log("✅ User logged out.");
    alert("You have been logged out.");
  };

  return (
    <div className="my-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
