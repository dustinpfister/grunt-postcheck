var spawn = require('child_process').spawn;
var status = spawn('git', ['status']);

status.stdout.on('data', function () {

    console.log('yeah your mind works okay!');

});

status.on('close', function () {

    console.log('yeah your mind works okay!');

});
