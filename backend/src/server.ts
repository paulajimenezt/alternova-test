import { app, appInitialization } from "./app";

const port = process.env.PORT ?? 3000;

if (process.env.NODE_ENV !== "test") {
  appInitialization
    .then(() => {
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Failed to initialize the app:", err);
    });
}
