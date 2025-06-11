import React from 'react';

export default function Login() {
  const handleGoogleLogin = () => {
    alert('Google Login button clicked!');
    // এখানে তোমার Google OAuth লজিক হবে
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
    

      <button
        onClick={handleGoogleLogin}
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow transition-colors duration-300"
      >
        <svg
          className="w-6 h-6 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083h-1.569v-.072H24v7.833h11.299c-1.492 4.172-5.675 7.176-11.299 7.176-6.664 0-12.081-5.38-12.081-12.02 0-6.64 5.417-12.02 12.081-12.02 3.078 0 5.856 1.147 7.943 3.015l5.61-5.61C34.403 8.105 29.555 6 24 6 12.96 6 4 14.95 4 26s8.96 20 20 20c11.06 0 20-8.95 20-20 0-1.347-.151-2.663-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.82C13.57 17.045 18.406 14 24 14c3.078 0 5.856 1.147 7.943 3.015l5.61-5.61C34.403 8.105 29.555 6 24 6c-7.55 0-14.065 4.277-17.694 10.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.63 0 10.563-3.367 12.709-8.213l-6.054-4.932c-1.64 1.096-3.754 1.745-6.655 1.745-5.658 0-10.477-3.73-12.12-8.774l-6.56 5.057C9.75 38.41 16.345 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083h-1.569v-.072H24v7.833h11.299c-.805 2.249-2.516 4.14-4.899 5.226l6.054 4.932C38.371 33.935 43.611 27.792 43.611 20.083z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
