'use strict';

const fs = require('fs');

module.exports = {
    sync: function (fileLocation) {
        let fd = fs.openSync(fileLocation, 'r');

        const readChunkSize = 16384;
        let fdPosition = 0;
        let linesCount = 0;
        let bytesRead;

        do {
            const readBuffer = Buffer.alloc(readChunkSize);
            bytesRead = fs.readSync(fd, readBuffer, 0, readChunkSize, fdPosition);
            fdPosition += bytesRead;

            linesCount += this._countBufferLines(readBuffer);
        } while (bytesRead);

        return linesCount;
    },
    async: function (fileLocation) {
        let linesCount = 0;
        return new Promise((resolve, reject) => {
            fs.createReadStream(fileLocation).on('data', (buffer) => {
                linesCount += this._countBufferLines(buffer);
            }).on('end', () => {
                resolve(linesCount);
            }).on('error', reject);
        });
    },
    _countBufferLines: function (buf) {
        const newLineCharacter = Buffer.from('\n', 'ascii');
        let idx = -1;
        let count = 0;
        while ((idx = buf.indexOf(newLineCharacter, idx + 1)) > -1) count++;
        return count;
    },
};
