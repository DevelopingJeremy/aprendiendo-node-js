import DBLocal from "db-local";
const { Schema } = new DBLocal({ path: './db' });
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export class UserRepository {
    static async create ({ username, password }) {
        Validations.username({ username });
        Validations.password({ password });

        if (User.findOne({ username })) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        const id = crypto.randomUUID();

        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save();

        return id;
    }

    static async login ({ username, password }) {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Invalid username or password');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid username or password');

        const { password: _, ...publicUser } = user

        return publicUser;
    }
}

class Validations {
    static username ({ username }) {
        if (typeof username !== 'string') throw new Error('Invalid username');
        if (username.length < 3) throw new Error('Username too short');
    }
    static password ({ password }) {
        if (typeof password !== 'string') throw new Error('Invalid password');
        if (password.length < 6) throw new Error('Password too short');
    }
}