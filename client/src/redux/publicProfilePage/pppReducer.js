const { createSlice } = require("@reduxjs/toolkit");

const pppSlice = createSlice({
  name: "public profile",
  initialState: {
    data: {
      _id: "654119c83ede7f542cd783fd",
      lastname: "Jaikishana",
      username: "tarunjaikishan1400",
      firstname: "Taruna",
      email: "tarunjaikishan1400@gmail.com",
      profile: {
        mobile: 1929192919,
        bio: "baba baba black sheep have you any wool have any wool i will take and gull.",
        introduction: "Hello World ! How was your going ?",
        link: [
          {
            href: "https://okok.com",
            id: "linkedin",
          },
          {
            href: "http://okgi.com",
            id: "twitter",
          },
        ],
        profession: "Backend Engineering",
      },
      services: [
        {
          _id: "654730fa9cf27a52d88d5dc2",
          serviceTitle: "CSS Workshop",
          serviceType: "onetoone",
          serviceDescription: "This is an example service description.",
          duration: 60,
          price: 50,
          slashPrice: 40,
          createdAt: "2023-11-05T06:06:50.642Z",
          updatedAt: "2023-11-05T06:06:50.642Z",
        },
        {
          _id: "654731039cf27a52d88d5dc5",
          serviceTitle: "CSS Workshop",
          serviceType: "onetoone",
          serviceDescription:
            "This is an example ervice description. Lorem ipsum dolor, it amet consectetur adipisicing elit. A b hic minus autem impedit dolorum atque re facere?",
          duration: 60,
          price: 50,
          slashPrice: 40,
          createdAt: "2023-11-05T06:06:59.830Z",
          updatedAt: "2023-11-05T06:06:59.830Z",
        },
        {
          _id: "654731099cf27a52d88d5dc7",
          serviceTitle: "CSS Workshop",
          serviceType: "message",
          serviceDescription: "This is an example service description. Praesentium quaerat minima saepe dolore placeat voluptatem nihil reiciendis ut deserunt vitae sit orporis a, officiis ducimus consequatur. Labore b, nihil dolor dicta velit minima, rerum praesentium, expedita libero delectus lorem ea!",
          price: 50,
          slashPrice: 40,
          createdAt: "2023-11-05T06:07:05.578Z",
          updatedAt: "2023-11-05T06:07:05.578Z",
        },
      ],
      servicesCount: 3,
    },
    loading: false,
  },
  reducers: {
    pppRequest: (state) => {},
    pppSuccess: (state) => {},
    pppFailure: (state) => {},
  },
});

const { pppRequest, pppSuccess, pppFailure } = pppSlice.actions;
const pppReducer = pppSlice.reducer;
export default pppReducer;
