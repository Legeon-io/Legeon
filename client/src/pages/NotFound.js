import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-transparent font-bold text-9xl bg-clip-text bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500  drop-shadow-lg">
        404
      </h1>
      <p className="text-4xl font-semibold">Oops! Page not found</p>

      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="mt-10 bg-gradient-to-r to-pink-500 from-indigo-500 via-purple-500 duration-300 px-5 py-2 rounded-full  text-white font-bold hover:scale-105"
      >
        Back To Home
      </button>
    </div>
  );
}

export default NotFound;
