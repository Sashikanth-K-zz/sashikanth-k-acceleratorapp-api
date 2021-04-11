const httpStatus = require("http-status");
const ApiError = require("../middlewares/ApiError");
const spawn = require("child_process").spawn;
const fs = require("fs/promises");
const path = require("path");

const convertBytes = function (bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) {
    return "0";
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) {
    return bytes + " " + sizes[i];
  }
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};

const listStream = (first, last, directoryPath) => {
  let i = 1;

  return new Promise((resolve, reject) => {
    let res = [];
    const ls = spawn("ls", [directoryPath]);

    ls.stdout.on("data", (item) => {
      let list = item.toString().trim().split("\n");

      for (let j = 0; j < list.length; j++) {
        const fileName = list[j];
        // if (i > last) {
        //   ls.stdout.emit("close");
        // }
        if (i >= first && i <= last) {
          res.push(fileName);
        }
        i++;
      }
    });

    ls.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      return reject(data);
    });

    ls.on("close", (e) => {
      console.log("closed");
      return resolve({
        list: res,
        total: i,
      });
    });
  });
};

const getDirectoryLists = async (filter, options) => {
  const directoryPath = filter.directoryPath;

  let page = options.page || 1;
  let limit = options.limit || 10;
  let first = (page - 1) * limit + 1;
  let last = page * limit;

  let { list, total } = await listStream(first, last, directoryPath);

  let res = [];

  for (let i = 0; i < list.length; i++) {
    const fileName = list[i];
    let fullPath = path.join(directoryPath, fileName);

    let stats = await fs.stat(fullPath);

    res.push({
      name: fileName,
      directory: path.parse(fullPath).dir,
      size: convertBytes(stats.size),
      fullPath,
      createdDate: stats.birthtime,
    });
  }

  return {
    total: total,
    page: page,
    totalPages: Math.ceil(total / limit),
    limit: limit,
    list: res,
  };

  // return (
  //   readdirp(directoryPath, { alwaysStat: true })
  //     .on("data", (entry) => {
  //       const {
  //         path,
  //         stats: { size },
  //       } = entry;

  //       res.push({
  //         path,
  //         size,
  //       });
  //       console.log(`${JSON.stringify({ path, size })}`);
  //     })
  //     // Optionally call stream.destroy() in `warn()` in order to abort and cause 'close' to be emitted
  //     .on("warn", (error) => console.error("non-fatal error", error))
  //     .on("error", (error) => console.error("fatal error", error))
  //     .on("end", () => {
  //       console.log("done");
  //       return res;
  //     })
  // );

  // let dirList = await fs.readdir(directoryPath);
  // let stat = await fs.stat(directoryPath);

  // let first = (options.page || 1 - 1) * (options.limit || 3);

  // const res = {
  //   dirlist: dirList.slice(first, first + (options.limit || 3)),
  //   totalFiles: dirList.length,
  //   totalPages: Math.ceil(dirList.length / (options.limit || 3)),
  //   currentPage: options.page || 1,
  //   limit: options.limit || 3,
  //   currentPath: directoryPath,
  // };
};

module.exports = {
  getDirectoryLists,
};
