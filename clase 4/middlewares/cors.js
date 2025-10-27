import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:1234',
    'http://127.0.0.1:5500'
];

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (como Postman o curl)
        if (!origin) return callback(null, true);

        if (acceptedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Origen no permitido por CORS'));
        }
    }
});