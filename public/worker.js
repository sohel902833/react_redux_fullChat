console.log("Service Worker Ready");
self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Recieved...", data, self.registration);
  console.log(self.registration);
  self.registration
    .showNotification(data.title, {
      body: data?.body,
    })
    .catch((err) => {
      console.log(err);
    });
});
