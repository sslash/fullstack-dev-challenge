const http = require("http");
const CreateApi = require("./api/createApi");

const onListen = () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }

    switch (error.code) {
        case "EACCES":
            console.log(`Express server requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(`Http port is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const createApi = new CreateApi({});
createApi.start();
const app = createApi.app;

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const server = http.createServer(app);
server.on("error", onError);
server.listen(app.get("port"), onListen);