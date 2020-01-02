import {Global} from './global'

module.exports.loop = function() {
    Global.update(Game.time);
    Global.config.creep.harvester.body = {'work':1, move:1};
    Global.config.creep.harvester.max = 2;
}