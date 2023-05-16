const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


//  Aggregate function to get the number of Users 
const headCount = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
}

module.exports = {
    // Get all users 
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                headCount: await headCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single user 
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends')
                .populate('thoughts')


            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(
                user
            );
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user and remove them from their email
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No User exists' });
            }

            const thought = await Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'User deleted, but no thought found',
                });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {
            new: true,
            runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this ID!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);

        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: {friends: req.params.friendId} },
                {  new: true }
            );

            if (!friend) {
                return res
                .status(404)
                .json({ message: 'no user found'})
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res 
                .status(404)
                .json({ message: 'user does not exist'});
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    
};