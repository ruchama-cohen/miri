import app from './app';
import http from 'http';

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// שמיעה על הפורט
server.listen(port, () => {
    console.log(`we up in port ${port}`);
});