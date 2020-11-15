[![Build Status](https://travis-ci.org/nacholibre/nwc-l.svg)](https://travis-ci.org/nacholibre/nwc-l)
# nwc-l
Lighweight Node.js module for counting the number of lines in a file either sync or
async. This module doesn't have any external dependencies, it uses only the
native `fs` module.

Install with
`npm install nwc-l`

---------------------------------------

## Documentation
### nwcl.sync(fileLocation);

* `fileLocation` - String path to the file you want to read from
* Returns: `<integer>` number of lines

### nwcl.async(fileLocation);

* `fileLocation` - String path to the file you want to read from
* Returns: `<Promise>` number of lines

---------------------------------------

## Example
```javascript
const nwcl = require('nwc-l');

// Synchronous
let count = nwcl.sync('./myfile-7lines.txt');
console.log('Number of lines: ' + count);

// Asyncronious Promise
nwcl.async('./myfile-7lines.txt').then((count) => {
    console.log('Number of lines: ' + count);
});
// Asyncronious await
async function countAsync() {
    let asyncCount = await nwcl.async('./myfile-7lines.txt');
    console.log('Number of lines: ' + asyncCount);
}
countAsync();
```
will print
```
Number of lines: 7
Number of lines: 7
Number of lines: 7
```
