import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../feature/auth/authApi";
import { useChangeActiveStatusMutation } from "../feature/user/userApi";
export const useUserOnlineStatus = () => {
  const { data, isLoading } = useGetCurrentUserQuery("");
  const [changeActiveStatus, {}] = useChangeActiveStatusMutation();
  useEffect(() => {
    if (data?._id && !isLoading) {
      changeActiveStatus(true);
    }
  }, [data, isLoading]);

  const goOffline = async () => {
    await changeActiveStatus(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      goOffline();
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { goOffline };
};
