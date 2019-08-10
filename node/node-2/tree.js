#!/usr/bin/env node

"use strict";
const fs = require('fs');

let tree = {
    value: {
        "files": [],
        "dirs": [],
    },
    _number: 0,

    get numberProcessingFiles() {
        return this._number
    },
    set numberProcessingFiles(number) {
        if (number === 0) {
            this.write(this.value)
        }
        this._number = number
    },

    addDirectory: function(path, count) {
        this.value["dirs"].push(path);
        this.numberProcessingFiles += count - 1;
    },
    addFile: function(path) {
        this.value["files"].push(path);
        this.numberProcessingFiles--;
    },

    write: (data) => {
        console.log(data);
    }
};

function buildDirectoryStatistics(path) {
    fs.readdir(path, (err, files) => {
        if (err) {
            if (err.code === "ENOTDIR") {
                tree.addFile(path);
            }
            return
        }

        if (path.substr(-1) !== '/') {
            path = path + '/';
        }

        tree.addDirectory(path, files.length);
        for (let file of files) {
            buildDirectoryStatistics(path + file);
        }
    });
}

if (process.argv.length !== 3) {
    console.error("Bad arguments ...\n\nUsage: %s [directory path] ...\n", __filename);
    return
}

let filepath = process.argv[2];

fs.stat(filepath, (err, stats) => {
    if (err) {
        console.error("Error: " + err.message);
        return
    }

    if (!stats.isDirectory()) {
        console.info("File with entered path is not a directory");
        return
    }

    tree.numberProcessingFiles = 1;
    buildDirectoryStatistics(filepath);
});