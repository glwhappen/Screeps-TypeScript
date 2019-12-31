import {Global} from './global'

module.exports.loop = function() {
    Global.start();
    Global.update(Game.time);
    Global.config.creep.harvester.max = 3;
    //Global.config.creep.harvester.body.work = 3;
    
    Global.end();
}