const {Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

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
        }
    }
);

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;