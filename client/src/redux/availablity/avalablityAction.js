import axios from "axios";
import Cookies from "js-cookie";

export const CalendarAction = (values) => {
  // console.log(values);
  return async (dispatch) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/events/setweeks `;
      console.log(Cookies.get("token"));
      const response = await axios.put(apiUrl, values, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(response);
    } catch (error) {}
  };
};

export const ScheduleAction = () => {
  return async (dispatch) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/events/getevents `;
      console.log(Cookies.get("token"));
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(response);
    } catch (error) {}
  };
};
