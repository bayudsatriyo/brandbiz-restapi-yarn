"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BrandBiz Rest API",
            version: "1.0.0",
            description: "Rest Api for Brandbiz website || By: Uciha Bayu",
            contact: {
                author: "Bayu Dwi Satriyo",
                email: "bayudsatriyo@gmail.com",
                github: "github.com/bayudsatriyo",
            },
        },
        servers: [
            {
                url: "https://brandbiz-api-v2-production.up.railway.app",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/Doc/*ts", "./src/validations/*ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app) {
    // Swagger page
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Docs in JSON format
    app.get("/docs.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.info(`Docs available at https://brandbiz-api-v2-production.up.railway.app/docs`);
}
exports.default = swaggerDocs;
