const sys = require('sys');
const existsSync = require('fs').existsSync;
const async = require('async');
const globby = require('globby');
const execFile = require('child_process').execFile;
const colors = require('colors/safe');

function iterate (filePaths, phpunit, options, callback) {
    async.eachLimit(
        filePaths,
        options.limit,
        function (filePath, next) {

            // Check if the filePath is under suite/namespace 
            var ret = true;
            if (options.suite !== "") {
                var re = new RegExp(options.suite, 'gi');
                if (re.test(filePath)) {
                    ret = false;
                }
            } else {
                ret = false;
            }

            if (ret) {
                return;
            }

            // Convert option.flags to --flag
            var flags = [];
            if (options.flags) {
                flags = options.flags.map(function(flag) { return '--' + flag; });
            }
            // Pass filePath as a arg along with flags
            var args = flags.concat([filePath]);

            process.stdout.write("Testing: " + filePath + "\n");

            // Run tests
            execFile(phpunit, args, function (err, stdout, stderr) {
                if (options.stderr) process.stderr.write(stderr);
                if (options.stdout) process.stdout.write(stdout);

                next(err);
            });
        },
        function (err) {
            callback(err);
        }
    );
}

module.exports = {
    test: function (files, phpunit, options, callback) {
        if (!phpunit || typeof phpunit !== 'string' || !existsSync(phpunit)) {
            console.log(colors.red.underline("Path to phpunit file is not a valid"));
            return;
        }

        if (typeof options === 'function') {
            callback = options;
            options = {
                flags: ['colors']
            }
        }

        if (!options.limit) options.limit = 10;
        options.stdout = true;
        options.stderr = true;

        globby(files).then(function (files) {
            iterate(files, phpunit, options, callback)
        })
    }
};
