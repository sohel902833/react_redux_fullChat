const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    const swURL = `${process.env.PUBLIC_URL}/worker.js`;
    const registration = await navigator.serviceWorker
      .register(swURL)
      .then((register) => {
        //@ts-ignore
        window.WORKER_REGISTRATION = register;
      });

    return registration;
  }
};

export default registerServiceWorker;
