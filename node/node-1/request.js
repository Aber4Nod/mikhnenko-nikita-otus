#!/usr/bin/env node

"use strict";
const http = require("http");

function getRequest(resolve) {
    http.get('http://localhost:8080', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log("Got Data: " + data);
        });

        if (resolve !== undefined)
            resolve();
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function processParallelRequest(N) {
    for (let i = 0; i < N; ++i) {
        getRequest();
    }
}

async function processSequenceRequest(N) {
    for (let i = 0; i < N; ++i) {
        await new Promise(resolve => {
            getRequest(resolve);
        });
    }
}

if (process.argv.length !== 4 || isNaN(process.argv[2])) {
    console.log("Bad arguments ...\n\nUsage: %s [Request number N] [Request type (parallel|sequence)] ...\n", __filename);
}

switch (process.argv[3]) {
    case "parallel":
        processParallelRequest(process.argv[2]);
        break;
    case "sequence":
        processSequenceRequest(process.argv[2]);
        break;
    default:
        console.error("Got invalid request type: parallel or sequence supported");
}