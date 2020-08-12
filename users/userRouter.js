const express = require("express");
const Users = require("./userDb");

const router = express.Router();

router.post("/user", validateUser(), (req, res) => {
    // do your magic!
    Users.insert(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(next(error));
});

router.post("/user/:id/posts", (req, res) => {
    // do your magic!
});

router.get("/user", async (req, res) => {
    // do your magic!
    const users = await Users.get();

    res.status(200).json(users);
});

router.get("/user/:id", validateUserId(), (req, res) => {
    res.status(200).json(req.user);
});

router.get("/user/:id/posts", (req, res) => {
    // do your magic!
});

router.delete("/user/:id", validateUserId(), (req, res) => {
    // do your magic!
    Users.remove(req.user.id)
        .then((yup) =>
            res.status(202).json({
                message: "Deleted!",
                yup,
            })
        )
        .catch((error) => res.status(500).json(error));
});

router.put("/user/:id", validateUser(), validateUserId(), (req, res) => {
    // do your magic!
    const { id } = req.params;

    Users.update(id, req.body)
        .then((user) => res.status(201).json({ message: "Updated!", yup }))
        .catch((error) => res.status(500).json(error));
});

//custom middleware
function validateUserId(req, res, next) {
    // do your magic!
    return (req, res, next) => {
        Users.getById(req.params.id)
            .then((user) => {
                if (user) {
                    req.user = user;
                    return next();
                } else {
                    return res.status(400).json({
                        message: "invalid user ID",
                    });
                }
            })
            .catch((error) => {
                return res.status(500).json({
                    message: "Server Error - ValUseID",
                });
            });
    };
}

function validateUser(req, res, next) {
    // do your magic!
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({
                message: "missing user data",
            });
        } else if (!req.body.name) {
            return res.status(400).json({
                message: "Missing required Name field!",
            });
        } else {
            req.user = req.body.name;
            return next();
        }
    };
}

function validatePost(req, res, next) {
    // do your magic!
    if (!req.body) {
        return res.status(400).json({
            message: "Missing Post data",
        });
    } else if (!req.body.text) {
        return res.status(400).json({
            message: "Missing required field: Text!",
        });
    } else {
        return next();
    }
}

module.exports = router;
