const { default: axios } = require("axios");

const CallAction = (values) => {
  return async (dispatch) => {
    try {
      console.log(values);
      const url = `${process.env.REACT_APP_API_URL}/api/services/onetoonecall`;
      console.log(url);
      const response = await axios.post(url, values);
      console.log(response);
    } catch (error) {}
  };
};

export default CallAction;
