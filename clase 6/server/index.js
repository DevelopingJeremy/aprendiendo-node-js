import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import dotenv from 'dotenv/config';
import { createClient } from '@libsql/client';

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server,{
    connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        skipMiddlewares: true
    }}
);

const db = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
});

//? Create the messages table if it doesn't exist
// await db.execute(`CREATE TABLE IF NOT EXISTS messages (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     content TEXT,
//     user TEXT
// );`);

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});


io.on('connection', async (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('chat message', (msg, user) => {
        let result
        try {
            result = db.execute({
                sql: 'INSERT INTO messages (content, user) VALUES (:msg, :user);',
                args: { msg, user }
            });
        } catch (e) {
            console.error(e);
            return;
        }

        io.emit('chat message', msg, result.lastInsertRowid, user);
    });

    if (!socket.recovered) {
        try {
            const messages = await db.execute({
                sql: 'SELECT id, content, user FROM messages WHERE id > :lastId;',
                args: { lastId: socket.handshake.auth.serverOffset ?? 0 }
            });

            messages.rows.forEach(message => {
                socket.emit('chat message', message.content, message.id, message.user);
            });
        } catch (e) {
            console.error(e);
        }
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});