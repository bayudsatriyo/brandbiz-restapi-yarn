"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./applications/app");
const logging_1 = require("./applications/logging");
app_1.app.listen(8080, () => {
    logging_1.logger.info('App listen in port 8080');
});
