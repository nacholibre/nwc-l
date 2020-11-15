'use strict';

const wcl = require('./nwc-l.js');
const test = require('tape');

function testAsyncSyncCount(t, fileLocation, expectedCount) {
    t.equals(wcl.sync(fileLocation), expectedCount);

    wcl.async(fileLocation).then(function (count) {
        t.equals(count, expectedCount);

        t.end();
    });
}

test('simple test', (t) => {
    testAsyncSyncCount(t, './test-data/test-file.txt', 7);
});

test('big lines', (t) => {
    testAsyncSyncCount(t, './test-data/big-lines.txt', 3);
});

test('empty file', (t) => {
    testAsyncSyncCount(t, './test-data/empty-file.txt', 0);
});

test('with empty lines', (t) => {
    testAsyncSyncCount(t, './test-data/with-empty-lines.txt', 5);
});
