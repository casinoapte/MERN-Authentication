const router = require('express').Router();


router.get("/", (req, res) => {
    res.send("Hello It Works")
})



module.exports = router;