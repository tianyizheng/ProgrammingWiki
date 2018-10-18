var request = require("request-promise");
var cheerio = require("cheerio");
var targetClass = "div.div-col.columns.column-width";

var wikiBase = "https://en.wikipedia.org";
// DBPedia SPARQL endpoint
var dbPedia = "http://dbpedia.org/sparql/";
var url = "https://en.wikipedia.org/wiki/List_of_programming_languages";
var targetUrl;

module.exports = async function() {
    var name;
    var result;
    await request(url).then(async function(body) {
        var $ = cheerio.load(body);
        var diV = $(targetClass);
        var divItem = diV[Math.floor(Math.random() * diV.length)];
        var a = $("a", divItem);
        var item = a[Math.floor(Math.random() * a.length)];
        name = $(item).text();
        targetUrl = $(item).attr("href");
        targetUrl = wikiBase + targetUrl;
        targetUrl = getDbpediaUrl(targetUrl);
        await request(targetUrl).then(function(body) {
            var $ = cheerio.load(body);
            var summary = $("p.lead");
            result = name + "\n" + summary.text();
        });
    });
    return result;
};

getDbpediaUrl = function(url) {
    if (url.indexOf("wikipedia") != -1) {
        var parts = url.split("/");
        var title = parts[parts.length - 1];
        url = "http://dbpedia.org/resource/" + title;
        return url;
    } else if (url.indexOf("dbpedia.org") != -1) {
        return url;
    } else {
        url = "http://dbpedia.org/resource/" + url.replace(/ /g, "_");
        return url;
    }
};
