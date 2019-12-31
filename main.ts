import {Config} from './config'
import {Global} from './global'

module.exports.loop = function() {
    Global.start();
    if(Global.configFlag) {
        console.log("初始化一次");
        Global.config= new Config; 
        Global.configFlag = false;
    }
    Global.memory['config'] = Global.config;
    
    var config = Global.config;
    config.update(Game.time);
    Global.end();
}