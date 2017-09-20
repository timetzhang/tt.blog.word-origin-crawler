const cheerio = require('cheerio')
const httpClient = require('http')
const readline = require('readline');
const escaper = require("true-html-escape")
const db = require('./db')

//创建readline接口实例
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
input();
// question方法
function input() {
    rl.question("Input a Word: ", async answer => {
        var item = {
            name: answer.toLowerCase(),
            time: (new Date()),
            details: ''
        }
        httpClient.get('http://www.youdict.com/ciyuan/s/' + answer, result => {
            var html = '';
            result.setEncoding('UTF-8');

            result.on('data', function(chunk) {
                html += chunk
            });

            result.on('end', async function() {
                var $ = cheerio.load(html)
                item.details = '<p>';
                for (var i = 0; i < $('#article').children().length; i++) {
                    if ($('#article').children().eq(i).get()[0].name == 'h2') {
                        item.details += '<b>' + $('#article').children().eq(i).text() + '</b>';
                    } else {
                        item.details += '<p>' + $('#article').children().eq(i).text() + '</p>';
                    }
                }
                item.details += '</p>'

                console.log(item)

                var r = await db.insert({
                    collection: 'word_origin',
                    data: item
                })
                console.log(r)
                input();
            })
        });
    });
}