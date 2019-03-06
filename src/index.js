import * as debug from './debug';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default {
    // Multiple browsers support
    isMultiBrowser: true,


    // Required - must be implemented
    // Browser control
    // eslint-disable-next-line no-unused-vars
    async openBrowser (id, pageUrl, browserName) {
        debug.log('running openBrowser');
        if (await this.getBrowserList().length === 0) 
            throw new Error('No browsers detected by adb, or fault in adb. check your adb devices command');
        
        await this.killChrome();
        const { stdout, stderr } = await exec('adb shell am set-debug-app --persistent com.android.chrome');
        
        await debug.log('result of setting debug chrome: ' + stdout);
        await debug.log('error in setting debug chrome: ' + stderr);

        const { stdout2, stderr2 } = await exec('adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main -d \'' + pageUrl + '\'');

        await debug.log('result of starting chrome: ' + stdout2);
        await debug.log('error in starting chrome: ' + stderr2);
    },

    async closeBrowser (/* id */) {
        await debug.log('running closeBrowser');
        
        await this.killChrome();
    },

    async killChrome (/* id */) {
        const { stdout, stderr } = await exec('adb shell am force-stop com.android.chrome');

        await debug.log('result of killing chrome: ' + stdout);
        await debug.log('error in starting chrome: ' + stderr);
    },

    // Optional - implement methods you need, remove other methods
    // Initialization
    async init () {
        return;
    },

    async dispose () {
        return;
    },

    // Browser names handling
    async getBrowserList () {
        const devices = [];
        const { stdout } = await exec('adb devices');
        
        let skip = true;
        
        await debug.log('---- Device List ----');
        stdout.split(/\r?\n/).forEach(line => {
            if (!skip) {
                const device = line.split(/(\t+)/)[0];  

                if (device.length > 0) {
                    debug.log('device found: ' + device);  
                    devices.push(device);
                }
            }
            else
                skip = false;
        });
       
        return devices;
    },

    async isValidBrowserName (/* browserName */) {
        return true;
    },
    

    // Extra methods
    async resizeWindow (/* id, width, height, currentWidth, currentHeight */) {
        this.reportWarning('The window resize functionality is not supported by the "android" browser provider.');
    },

    async takeScreenshot (/* id, screenshotPath, pageWidth, pageHeight */) {
        this.reportWarning('The screenshot functionality is not supported by the "android" browser provider.');
    }
};
