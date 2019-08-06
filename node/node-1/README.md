# node-1
node-1 is a third homework of Otus Fullstack developer course (fall-winter of 2019 section).

**Description:**

1. Implement `request` script for web server testing. Script accepts the following input:
   - the number of requests `N`;
   - type of requests - parallel or serial.
2. Create a local web server `server`, responding to requests every 100ms.

The `request` script should send` N` serial or parallel `HTTP` requests to the local web server `server`.

## Getting started
### Getting dependency modules
The homework directory contains package.json, therefore run `npm install` to get dependency modules.
### Run web server
For running `server`, launch it with node interpreter:
`node server.js`
### Run request script
For running `request` script just follow the usage hint:
`Usage: ./request.js [Request number N] [Request type (parallel|sequent)] ..."`

For example, for running 5 parallel requests for your local web server just type in your CLI:
`./request.js 5 parallel`,
or vice versa for running 5 sequent requests:
`./request.js 5 sequent`