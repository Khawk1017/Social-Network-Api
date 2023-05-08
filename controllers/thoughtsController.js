const { Thought, Reaction } = require('../models');

module.exports = {
    async getThought(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
}