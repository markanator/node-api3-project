// imports
const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
// middlewares
const logger = require("./middleware/logger");

// init setup
const server = express();
const port = 4000;
// middlewares
server.use(express.json());
server.use(logger());
// routes
server.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to NODE API 3 PROJECT!",
    });
});
server.use(userRouter);
server.use(postRouter);

// error checking
server.use((error, req, res, next) => {
    // console.log(error);
    res.status(500).json({
        message: "Something went wrong, try again later.",
        error,
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
