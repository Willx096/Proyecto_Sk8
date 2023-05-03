import express from "express";

const router = express.Router();

import {autentica} from './middleware.js';

router.get('/', function(req, res, next) {
    res.end("Sk8tea Api");
} )

router.get('/secret', autentica, (req, res) => {
    res.status(200).json({
        ok: true,
        data: "EL NÚMERO SECRET ÉS 42"
    });
});

export default router;