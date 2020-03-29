const eb = require('./index');
const ebinds = require('./binds');

ebinds();

// 触发事件
eb.emit('arson', 'low-end');

eb.on('mp', man => {
    console.log(`mp: ${man}`);
});

eb.emit('mp', 'realign');

eb.on('mqqq', man => {
    console.log(`mpqqqq: ${man}`);
});

eb.emit('mqqq', 'realign');