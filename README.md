# testcafe-browser-provider-android
[![Build Status](https://travis-ci.org/bsmithb2/testcafe-browser-provider-android.svg)](https://travis-ci.org/bsmithb2/testcafe-browser-provider-android)

This is the **android** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

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
Bradley Smith (https://bradley-smith.dev)
