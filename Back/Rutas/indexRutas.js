import express from "express";

const router = express.Router();

router.get('/', function(req, res, next) {
    res.end("Sk8tea Api");
} )

export default router;