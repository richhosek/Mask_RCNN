const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const download = require("image-downloader");

let images = [];
fs.createReadStream("iaaImages.csv")
.pipe(csv())
.on("data", data=> images.push(data))
.on("end", () => {
    images.forEach(record => {
        download.image({url: record.Image1, dest: `rawIaaImages/perspective1/${record.Stock_number}-1.jpg`})
        .then(({filename}) => console.log(filename))
        .catch(err => console.error(err))
    })
})
