const eb = require('./index');

// 监听同一个事件名
const binds = () => {
    eb.on('arson', man => {
        console.log(`expel ${man}`);
    });
    eb.on('arson', man => {
        console.log(`save ${man}`);
    });
    eb.on('arson', man => {
        console.log(`kill ${man}`);
    });
};

module.exports = binds;