const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    SubscriptionPlans: [{
        type: {
            type: String,
            required: true
        },
        plan: {
            type: String,
            required: true
        },
        purchasedAt: {
            type: Date,
            required: true
        },
        amountPaid: {
            type: Number,
            required: true
        }
    }],
    TopUp: [{
        plan: {
            type: String,
            required: true
        },
        amountPaid: {
            type: Number,
            required: true
        },
        purchasedAt: {
            type: Date,
            required: true
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);

/*SubscriptionPlans: [{
        type: {
            type: String,
            required: true
        },
        plan: {
            type: String,
            required: true
        },
        purchasedAt: {
            type: String,
            required: true
        },
        amountPaid: {
            type: String,
            required: true
        }
    }],
    TopUp: [{
        plan: {
            type: String,
            required: true
        },
        amountPaid: {
            type: String,
            required: true
        },
        purchasedAt: {
            type: String,
            required: true
        }
    }], */