import React from "react";
export const PlaceHolderServices = ({ img, title, discription }) => {
  return (
    <div className="flex flex-col row-span-5 items-center justify-center">
      <img src={img} alt="this is my alternative text " className="h-56" />
      <h1 className="text-xl font-bold">{title}</h1>
      <h2 className="text-lg font-thin">{discription}</h2>
    </div>
  );
};
export default PlaceHolderServices;
