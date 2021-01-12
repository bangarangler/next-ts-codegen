import { useEffect } from "react";
import { useAxiosContext, useUserContext } from "../../context/allContexts";

const Me = () => {
  // useMeData is all the logic to fetch me
  const { useMeData } = useUserContext();
  // current user data is here for now
  const { user } = useAxiosContext();
  const userEmail = user?.email;
  // using useMeData -> axios, react-query, graphql -> had to be in contest to
  // get access to axios -> hate that trying to figure out way around it
  const { data, status, error } = useMeData(userEmail);

  // don't have to be in use effect just wanted to see the values
  // could be if (status === "loading") <div>Loading...</div> etc,
  useEffect(() => {
    switch (status) {
      case "loading":
        console.log("loading from me");
        break;
      case "error":
        console.log("error from me", error);
        break;
      case "success":
        console.log("success from me", data);
        break;
      default:
        break;
    }
  }, [status, error, data]);

  return (
    <>
      <div>ME COMPONENT LOCAL TESTING</div>
      {error && <div>Error Getting Me</div>}
      {status === "loading" && <div>Loading Me...</div>}
      {data && (
        <div>
          <p>{data.me.user.name}</p>
          <p>{data.me.user.email}</p>
        </div>
      )}
    </>
  );
};

export default Me;
