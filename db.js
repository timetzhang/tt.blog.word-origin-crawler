const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://www.zhangtt.cn:27017/zhangtt';

module.exports = {
    find: function(query) {
        return new Promise(
            function(resolve) {
                MongoClient.connect(DB_CONN_STR, function(err, db) {
                    //连接到表 site
                    var col = db.collection(query.collection);
                    col.find(query.condition, query.projection).limit(query.limit).skip(query.skip).sort(query.sort).toArray(
                        function(err, result) {
                            if (err) {
                                console.log('Error:' + err);
                                return;
                            }
                            resolve(result);
                            db.close();
                        });
                });
            }
        );
    },
    insert: function(query) {
        return new Promise(
            function(resolve) {
                MongoClient.connect(DB_CONN_STR, function(err, db) {
                    //连接到表 site
                    var col = db.collection(query.collection);
                    col.insert(query.data, function(err, result) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        resolve(result);
                        db.close();
                    });
                });
            }
        )
    },
    update: function(query) {
        return new Promise(
            function(resolve) {
                MongoClient.connect(DB_CONN_STR, function(err, db) {
                    //连接到表 site
                    var col = db.collection(query.collection);
                    col.update(query.condition, { '$set': query.data }, function(err, result) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        resolve(result);
                        db.close();
                    });
                });
            }
        )
    },
}