import googleUser from "../mongodb/models/googleuser";

// SignUp function
// export const googleLogin = async (req, res) => {
//   try {
//     if (req.user) {
//       const { given_name: firstname, family_name: lastname, email } = req.user;
//       let username = email.split("@")[0];
//       const existingUser = await googleUser.findOne({ email });
//       if (existingUser) {
//         res.status(200).json({
//           message: "Login Successful",
//           credentails: {
//             firstname: firstname,
//             lastname: lastname,
//             email: email,
//             email_verified: req.user.email_verified,
//           },
//         });
//       } else {
//         const existingUsername = await googleUser.findOne({ username });
//         if (existingUsername) {
//           username = `${username}#${Math.floor(1000 + Math.random() * 9000)}`;
//         }
//         const user = new googleUser({
//           username,
//           firstname,
//           lastname,
//           email,
//         });

//         const savedUser = await user.save();

//         res.status(200).json({
//           message: "Registered successfully. Welcome to Legeon",
//           user: savedUser,
//         });
//       }
//     } else {
//       res.status(403).json({ error: true, message: "Not Authorized" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error", error });
//   }
// };
