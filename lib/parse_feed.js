const FeedParser = require('feedparser');
const request = require('request');

module.exports = (options) => {
    return new Promise((resolve, reject) => {
        const items = [];
        const feedparser = new FeedParser();

        feedparser.on('error', (err) => { reject(err); });

        feedparser.on('readable', () => {
            let item;
            while (item = feedparser.read()) { items.push(item); }
            return items;
        });

        request.get(options)
            .on('error', (err) => { reject(err); })
            .pipe(feedparser)
            .on('end', () => { return resolve(items); });
    });
}