# node-2
node-2 is a fourth homework of Otus Fullstack developer course (fall-winter of 2019 section).

**Description:**

Implement `NodeJS` script `tree` for listing the files and folders of UFS.

Requirements:
1. The result should be an object with arrays of `{files, folders}`.
2. File system calls must be asynchronous.
3. The script takes an input parameter - the path to the folder.
4. Add the ability to execute this script through the command `npm run tree - path`

## Getting started
### Getting dependency modules
The homework directory contains package.json, therefore run `npm install` to get dependency modules.

### Run tree script
For running `tree`, launch it with node interpreter:
`node tree.js path`,
or alternatively with help of npm scripts section:
`npm run tree - path`.
