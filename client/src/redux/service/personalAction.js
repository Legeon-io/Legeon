import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  deleteCallFailure,
  deleteCallRequest,
  deleteCallSuccess,
  updateServiceFailure,
  updateServiceRequest,
  updateServiceSuccess,
} from "./ServiceReducer";

const insertMessageAction = (values) => {
  return async (dispatch) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/services/message`;
      const response = await axios.post(apiUrl, values, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Created Call Successfully");
      }
    } catch (error) {}
  };
};

const updateMessageAction = (values) => {
  console.log(values);
  return async (dispatch) => {
    dispatch(updateServiceRequest());
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/services/message`;
      const response = await axios.put(apiUrl, values, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(updateServiceSuccess(values));
        toast.success("Created Call Successfully");
      }
    } catch (error) {
      dispatch(updateServiceFailure());
    }
  };
};

const deleteMessageAction = (values) => {
  return async (dispatch) => {
    dispatch(deleteCallRequest());
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/services/message/delete`;
      const response = await axios.post(apiUrl, values, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Delete Call Successfully");
        dispatch(deleteCallSuccess(values));
      }
    } catch (error) {
      dispatch(deleteCallFailure());
    }
  };
};

export { insertMessageAction, updateMessageAction, deleteMessageAction };
