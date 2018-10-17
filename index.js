var request = require("request");
var cheerio = require("cheerio");

var targetClass = "div.div-col.columns.column-width";

var wikiBase = "https://en.wikipedia.org";
var url = "https://en.wikipedia.org/wiki/List_of_programming_languages";
var targetUrl;

request(url, function(err, response, body) {
    if (err) {
        var error = "cannot connect to the server";
        console.log(error);
    } else {
        var $ = cheerio.load(body);
        var diV = $(targetClass);
        var divItem = diV[Math.floor(Math.random() * diV.length)];
        var a = $("a", divItem);
        var item = a[Math.floor(Math.random() * a.length)];
        targetUrl = $(item).attr("href");
        console.log(targetUrl);
    }
    targetUrl = wikiBase + targetUrl;
    request(targetUrl, function(err, response, body) {
        console.log(body);
    });
});
