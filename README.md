# testcafe-browser-provider-android
[![Build Status](https://dev.azure.com/BradleySmith0287/testcafe-browser-provider-android/_apis/build/status/bsmithb2.testcafe-browser-provider-android?branchName=master)](https://dev.azure.com/BradleySmith0287/testcafe-browser-provider-android/_build/latest?definitionId=1&branchName=master)

This is the **android** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Build

Build has dependencies

```
npm install -g gulp 
npm install -g testcafe
npm install
gulp build
npm link
```

Once that is done - you run it by running a test in testcafe, or commands in testcafe. 

This command lists all android devices locally
```
testcafe -b android
```

This command runs a sample test on an attached android device. 

```
testcafe android exampletests/test.js
```

## Install

```
npm install testcafe-browser-provider-android
```

## Usage


You can determine the available browser aliases by running
```
testcafe -b android
```

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe android:browser1 'path/to/test/file.js'
```


When you use API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('android:browser1')
    .run();
```

## Author
Bradley Smith (https://bradleysmith.dev)
