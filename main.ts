import {Global} from './global'

module.exports.loop = function() {
    //Global.start();
    Global.update(Game.time);
    Global.config.creep.harvester.max = 6;
    //console.log(Global.config.creep.harvester.getBodyList());
    Global.config.creep.harvester.setBody({move:1,carry:0,work:0});

    //Global.config.creep.harvester.body.work = 3;

    //Global.end();
}