# testcafe-browser-provider-android

[![Build Status](https://dev.azure.com/BradleySmith0287/testcafe-browser-provider-android/_apis/build/status/bsmithb2.testcafe-browser-provider-android?branchName=master)](https://dev.azure.com/BradleySmith0287/testcafe-browser-provider-android/_build/latest?definitionId=1&branchName=master)

This is the **android** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Supported Browsers

### Chrome

NOTE: This plugin resets Chrome to a freshly installed state on each test.

HELP NEEDED: Maybe someone finds a way to start Chrome in private/incognito mode instead. (See [Issue #4](https://github.com/bsmithb2/testcafe-browser-provider-android/issues/4))

### Firefox

Firefox is started in private mode.

## Dependencies: Android Debug Bridge (adb)

In order to communicate with the device, the
[Android Debug Bridge](https://developer.android.com/studio/command-line/adb) is required.
If you dont want to install Android Studio,
the standalone package can be downloaded on
[https://developer.android.com/studio/releases/platform-tools.html](https://developer.android.com/studio/releases/platform-tools.html).

Note that the adb command needs to be available on the commandline.
(You may need to put it in your PATH enviornment variable.)

Googles guide
["Get Started with Remote Debugging Android Devices"](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)
guides through the basics of hardware setup,
and how to use Chromes Developer Tools on remote devices.
(Handy once you found problems that only occur in mobile devices.
See also:
["Debugging Firefox for Android over USB"](https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Debugging_Firefox_for_Android_with_WebIDE)).

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
