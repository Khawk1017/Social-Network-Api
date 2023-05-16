const { Schema, model} = require('mongoose');

// Schema to create the User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v){
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email",
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    
    
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJson: {
            virutals: true,
        },
        id: false,
    }
    
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User