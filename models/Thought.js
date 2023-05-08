const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                return new Date(timestamp).toISOString();
            },
            username: {
                type: String,
                required: true,
            },
            reactions: [reactionSchema],
        },
        toJson: {
            getters: true,
        },
        id: false,
    },
);
thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
  
  thoughtsSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleDateString();
  });

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;