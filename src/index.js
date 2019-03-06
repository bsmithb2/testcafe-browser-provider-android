import * as debug from './debug';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default {
    // Multiple browsers support
    isMultiBrowser: true,


    // Required - must be implemented
    // Browser control
    async openBrowser (/* id, pageUrl, browserName */) {
        throw new Error('Not implemented!');
    },

    async closeBrowser (/* id */) {
        throw new Error('Not implemented!');
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
        const { stdout, stderr } = await exec('adb devices');
        
        debug.log('stdout: ' + stdout);
        debug.log('array ');
        let skip = true;

        stdout.split(/\r?\n/).forEach(line => {
            if (!skip) 
                debug.log(line);    
            else
                skip = false;
        });
        debug.log('stderr:' + stderr);
        
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
