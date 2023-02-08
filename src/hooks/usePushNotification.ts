import { useEffect } from "react";
import { useSubscribeToPushNotificationMutation } from "../feature/user/userApi";
const usePushNotification = () => {
  const [subscribeToNotification, {}] =
    useSubscribeToPushNotificationMutation();
  const PUBLIC_VAPID_KEY = process.env.REACT_APP_PUBLIC_VAPID_KEY;
  useEffect(() => {
    const subscribe = async () => {
      const vapidKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY as string);
      //@ts-ignore
      const register = window?.WORKER_REGISTRATION;
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey,
      });
      subscribeToNotification(subscription);
    };
    const requestPermission = () => {
      if ("Notification" in window) {
        // Ask for permission
        Notification.requestPermission().then((permission) => {
          // If the user grants permission, send a notification
          if (permission === "granted") {
            subscribe();
          } else {
            subscribe();
          }
        });
      }
    };

    requestPermission();
  }, []);
};

export default usePushNotification;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
