## PHPTest
PHPTest helps in running phpunit tests using nodejs.

### What problem does it solve?
Easy integration with build tools like grunt. This can also be integrated with JS based dev tools using very simple API.

### Installation
`npm install --save git+https://github.com:neerajkhandelwal/node-phptest.git`.

[Read this](https://stackoverflow.com/questions/17509669/how-to-install-an-npm-package-from-github-directly) for more information on installing npm packages from hosts other than npmjs.com.

### Using

**Example usage:**
```
const test = require('phptest').test;

const phpunitPath = "/path/to/phpunit";
const globs = "/path/to/test/**/*.php";

test(globs, phpunitPath, options, function(err, stdout, stderr) {});
```

**Arguments:**

* `globs` - Absolute path under which test files exists. Uses `/some/path/**/*.php` format.
* `phpunitPath` - Path to phpunit file which is used to execute test cases.
* `options` - Options is of type Object(`{}`) which takes in parameters to configure the output and restrict function of the test method.
  * `flags` - Array of flags to be passed to phpunit. Eg: `['colors']` will be passed as `--colors`.
  * `suite` - Runs only those test files which are under namespace provided as suite, otherwise will all of them.
* `callback` - Callback function with error, stdout and stderr as parameters.

### LICENSE
[Apache-2.0](https://github.com/neerajkhandelwal/node-phptest/blob/master/LICENSE) licensed.
