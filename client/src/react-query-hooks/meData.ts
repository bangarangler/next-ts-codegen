export default "yo";
// import { useAxiosContext } from "../context/allContexts";
// import { GQL_ENDPOINT } from "../../constants";
// import { useQuery } from "react-query";
//
// export function useMeData(email: string) {
//   const axios = useAxiosContext();
//
//   const query = `
//   query Me($email: String!) {
//     me(email: $email) {
//       user {
//       _id
//       name
//       email
//       }
//       error {
//         message
//       }
//     }
//   }
//   `;
//
//   const variables = {
//     email,
//   };
//
//   return useQuery("ME", async () => {
//     const { data } = await axios({
//       url: GQL_ENDPOINT,
//       method: "post",
//       data: {
//         query: query,
//       },
//     });
//
//     console.log("data from me", data);
//     return data;
//   });
// }
