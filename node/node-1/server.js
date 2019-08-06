"use strict";
const express = require('express');
const queue = require('queue');

let server = {
    hostname: '127.0.0.1',
    port: 8080,
    app: express(),
    queue: queue({
        concurrency: 1,
        autostart: true,
    }),
};

server.app.use((req, res, next) => {
    server.queue.push((cb) => {
        setTimeout(() => {
            next();
            cb();
        }, 100);
    });
});

server.app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Request processed!\n');
});

server.app.listen(server.port, server.hostname, () => {
    console.log(`Server running at http://${server.hostname}:${server.port}/`);
});