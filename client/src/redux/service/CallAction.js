import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import {
  deleteCallFailure,
  deleteCallRequest,
  deleteCallSuccess,
  getVerifyFailure,
  getVerifyRequest,
  getVerifySuccess,
  updateServiceFailure,
  updateServiceRequest,
  updateServiceSuccess,
} from "./ServiceReducer";

const getVerify = () => {
  return async (dispatch) => {
    dispatch(getVerifyRequest());
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/services/get-services`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(getVerifySuccess(response.data));
      }
    } catch (error) {
      dispatch(getVerifyFailure());
    }
  };
};

const insertCallAction = (values) => {
  return async (dispatch) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/services/onetoonecall`;
      const response = await axios.post(apiUrl, values, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Created Call Successfully");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };
};

const updateCallAction = (values) => {
  return async (dispatch) => {
    dispatch(updateServiceRequest());
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/services/onetoonecall`;
      const response = await axios.put(apiUrl, values, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        dispatch(updateServiceSuccess(values));
        toast.success("Updated Successfully");
      }
    } catch (error) {
      dispatch(updateServiceFailure());
    }
  };
};

const deleteCallAction = (values) => {
  return async (dispatch) => {
    dispatch(deleteCallRequest());
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/services/onetoonecall/delete`;
      const response = await axios.post(apiUrl, values, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Deleted Successfully");
        dispatch(deleteCallSuccess(values));
      }
    } catch (error) {
      dispatch(deleteCallFailure());
    }
  };
};

export { insertCallAction, updateCallAction, getVerify, deleteCallAction };
