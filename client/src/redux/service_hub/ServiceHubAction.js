import axios from "axios";
import { pppRequest, pppSuccess, pppFailure } from "./ServiceHubReducer"
export const pppAction = (values) => {
  return async (dispatch) => {
    dispatch(pppRequest());
    try {
      const apiURL = `${process.env.REACT_APP_API_URL}/api/profiles/getUserDetails`;
      const response = await axios.post(apiURL, values);
      if (response.status === 200) {
        dispatch(pppSuccess(response.data)); 
      }
    } catch (error) {
      dispatch(pppFailure(error));
    }
  };
};

// POST -> http://localhost:8080/api/profiles/getUserDetails
// {
//     "username":"tarunjaikishan1400"
// }
