import axios from "axios";
import Cookie from "js-cookie";
import {
  getProfileFailure,
  getProfileRequest,
  getProfileSuccess,
} from "./profilePageSlice";

export const handleGetProfileAction = () => {
  return async (dispatch) => {
    dispatch(getProfileRequest()); 
    try {
      const response = await axios.get(
        "http://localhost:8080/api/profiles/getprofile",
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      );
        if (response.status === 200) {
          dispatch(getProfileSuccess(response.data[0]));
        }
    } catch (error) {
      dispatch(getProfileFailure());
    }
  };
};
