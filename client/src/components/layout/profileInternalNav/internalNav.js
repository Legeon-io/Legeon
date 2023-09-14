import { Link } from "react-router-dom";

export const InternalNav = (props) => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl mt-5 mx-5 md:ml-10">Profile</h1>
      <div className="flex flex-row items-center gap-x-4 md:justify-between mx-5 md:mx-10 mt-3">
        <div className="flex flex-row gap-4 md:gap-10 mt-3">
          <Link
            className="border border-black p-2 rounded-md  hover:bg-gray-200"
            to="/profile"
          >
            Profile
          </Link>
          <Link
            className="border border-black p-2 hover:bg-gray-200 rounded-md focus:bg-gray-200"
            to="/profile/editProfile"
          >
            Edit Profile
          </Link>
          <Link
            className="border border-black p-2 hover:bg-gray-200 focus:bg-gray-200 rounded-md"
            to="/profile/account"
          >
            Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InternalNav;
