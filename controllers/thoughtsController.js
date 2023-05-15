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
    },

    // Get a single thought 
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought 
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if(!thought) {
                res.status(404).json({ message:' No thought with that ID'})
            }

            await User.deleteMany({_id: {$in: thought.users}});
            res.json({ message: 'Thought and users deleted!'}); 
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought 
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                req.status(404).json({ message: 'No thought with this id'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add reaction 
    async addReaction(req, res) {
        console.log('You are adding an thought');
        console.log(req.body);

        try {
            const user = await Thought.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Removes reaction
    async removeReaction(req, res) {
        try {
            const user = await Thought.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: { reactions: {reactionId: req.params.reactionId} } },
                { runValidators: true, new: true}
            );

            if (!user) {
                return res
                .status(404)
                .json({ message: 'No User with that ID ;('});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

};