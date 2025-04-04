import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
}

const urlSchema = new mongoose.Schema(
    {
        shortURL: {
            type: String,
            required: true,
            unique: true,
        },
        longURL: {
            type: String,
            required: true,
        },
        visitCount: [{
            timestamp: {
                type: Number,
                default: Date.now,
            }
        }]
    },
    {
        timestamps: true
    }
);

const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: 'admin' },
    }
);

const URL = mongoose.model('url', urlSchema);
const User = mongoose.model('user', userSchema);

export { URL, User, connectDB };