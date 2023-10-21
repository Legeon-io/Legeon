import axios from "axios";
import { setProfile } from "./profileSlice";

export const getUserDetails = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/getuser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ); 
    console.log({ result: response });
    if (response.status === 200) {
      dispatch(setProfile(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
