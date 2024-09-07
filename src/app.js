const http = require('http');
const path = require('path');
const fs = require('fs');
const pg = require('pg')
const logsDir = 'logs';
const logsPath = path.resolve('./logs');
if (!fs.existsSync(logsPath)) {
 fs.mkdirSync(logsDir, {recursive: true});
}
const file = `app.log`;
const logFilePath = path.resolve(logsPath, file);
const port = process.env.PORT || 3000;
if (!port) {
 throw new Error('PORT variable not set!');
}
const createdAt = new Date();

const client = new pg.Client({
    user: 'test-user',
    password: '1234',
    host: 'postgres',
    port: 5432,
    database: "test-db"
})
client.connect();

const server = http.createServer(async (req, res) => {
    if(req.url == '/db'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        var r = await client.query('SELECT * FROM public.people')
        r.rows.forEach((e) => {
            res.write(JSON.stringify(e))
        })
        res.end();
    }
    else{
        fs.appendFileSync(logFilePath, `${new Date().toISOString()}:request\n`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Hello World, started at ${createdAt.toISOString()}`);
    }
});
server.listen(port, () => {
 console.log(`Server running at http://localhost:${port}/`);
});
