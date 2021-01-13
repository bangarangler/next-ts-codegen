import { useEffect } from "react";
import { useAxiosContext, useUserContext } from "../../context/allContexts";
import { useMeData } from "../../react-query-hooks/useMe";

const Me = () => {
  const { user } = useAxiosContext();
  // user email to pass into me query
  const userEmail = user?.email;
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
          <p>{data?.me?.user?.name}</p>
          <p>{data?.me?.user?.email}</p>
        </div>
      )}
    </>
  );
};

export default Me;
