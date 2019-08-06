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

async function processSequentRequest(N) {
    for (let i = 0; i < N; ++i) {
        await new Promise(resolve => {
            getRequest(resolve);
        });
    }
}

if (process.argv.length !== 4 || isNaN(process.argv[2])) {
    console.log("Bad arguments ...\n\nUsage: %s [Request number N] [Request type (parallel|sequent)] ...\n", __filename);
}

switch (process.argv[3]) {
    case "parallel":
        processParallelRequest(process.argv[2]);
        break;
    case "sequent":
        processSequentRequest(process.argv[2]);
        break;
    default:
        console.error("Got invalid request type: parallel or sequent supported");
}