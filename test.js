//const path = require("path");
const fs = require("fs/promises");

const { promisify } = require('util')
const { Readable } = require("stream");

const readdir = require("@jsdevtools/readdir-enhanced");
const getSize = promisify(require('get-folder-size'));




(async function df() {
    console.log(await getSize("."));
})()





//import through2 from "through2";

class MyRead extends Readable {
  constructor(options) {
    super(options);
    this._start = 0;
    this._end = 1;
    this._curr = this._start;
  }

  _read = () => {
    var num = this._curr;
    var buf = new Buffer(num.toString(), "utf-8");

    this.push(num + " -- 1");
    this.push(num + " -- 2");

    this.push(num + " -- 3");

    this.push(num + " -- 1");
    this.push(num + " -- 2");

    this.push(num + " -- 3"); this.push(num + " -- 1");
    this.push(num + " -- 2");

    this.push(num + " -- 3"); this.push(num + " -- 1");
    this.push(num + " -- 2");

    this.push(num + " -- 3"); this.push(num + " -- 1");
    this.push(num + " -- 2");

    this.push(num + " -- 3");

    // if(num%2 == 0){
    //     this.emit("even", num + "- even")
    // }

    this._curr++;

    if (num === this._end) {
      this.push(null);
    }
  };
}


//Usage
var num = new MyRead({
    objectMode : true,
    highWaterMark : 1
});

//Listening to data event (will be executed any time that get a piece of data)
num.on('data', function(chunk) {
    //console.log(chunk);
});
num.on('even', function(chunk) {
    //console.log(chunk);
});
