import * as debug from './debug';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default {
    // Multiple browsers support
    isMultiBrowser: true,


    // Required - must be implemented
    // Browser control
    async openBrowser (/* id, pageUrl, browserName */) {
        debug.log('running openBrowser');
        if (await this.getBrowserList().length === 0) 
            throw new Error('No browsers detected by adb, or fault in adb. check your adb devices command');
        
    },

    async closeBrowser (/* id */) {
        debug.log('running closerBrowser');
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
        
        debug.log('---- Device List ----')
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
