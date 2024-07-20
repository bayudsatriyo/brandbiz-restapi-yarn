import { app } from "./applications/app";
import { logger } from "./applications/logging";

app.listen(8000, () => {
  logger.info("App listen in port 8000");
});
