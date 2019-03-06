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
        debug.log('running openBrowser' + browserName);
        const browsers = await this.getBrowserList();

        if (browsers.length === 0) 
            throw new Error('No browsers detected by adb, or fault in adb. Check your adb devices command');
        
        if (browsers.length === 1)
            debug.log('One device found. Running in single device mode... Ignoring Browsername if provided');

        await this.killChrome();
        await this.clearChrome();
        await this.resetChromeWelcome();
        await this.openChromeBrowser(pageUrl);
    },

    async closeBrowser (/* id */) {
        await debug.log('running closeBrowser');
        await this.killChrome();
    },

    async openChromeBrowser (/* id, */ url) {
        await debug.log('running openBrowser with url:' + url);
        let shellCmd = 'adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main ';
        
        if (url && url.length > 0)
            shellCmd += '-d \'' + url + '\'';
        
        shellCmd += ' --activity-clear-task';
        debug.log('start chrome command: ' + shellCmd);
        await exec(shellCmd);

    },

    async resetChromeWelcome (/* id */) {
        await exec('adb shell \'echo "chrome --disable-fre --no-default-browser-check --no-first-run" > /data/local/tmp/chrome-command-line\'');
    },

    async keyPress (/* id, */ keyId) {
        await exec('adb shell input keyevent ' + keyId);
    },

    async clearChrome (/* id */) {
        await exec('adb shell pm clear com.android.chrome');
    },

    async killChrome (/* id */) {
        await exec('adb shell am force-stop com.android.chrome');
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
        
        debug.log('---- Device List ----');
        var lines = stdout.split(/\r?\n/);
        
        for (const lineNum in lines) {
            if (!skip) {
                const line = lines[lineNum];
                const device = line.split(/(\t+)/)[0];  

                if (device.length > 0) {
                    debug.log('device found: ' + device);  
                    devices.push(device);
                }
            }
            else
                skip = false;
        }
        
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
