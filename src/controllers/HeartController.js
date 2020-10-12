const Heart = require("../models/Heart");

const store = async (req, res) => {
    let { pid } = req.params;
    try {
        const heartExists = await Heart.findOne({
            poem: pid,
            author: req.userId
        });

        if (heartExists) {
            return res.status(200).json("Heart already exists.");
        }

        const heart = await Heart.create({
            poem: pid,
            author: req.userId
        });

        if (heart) {
            return res.status(201).json(heart);
        } else {
            return res.status(406).send();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports = {
    store
}