import {MyCreep} from './creep'

class MapClass {
    static update() {
        if(typeof Memory['map'] == 'undefined') {
            Memory['map'] = {};
        }
        for(var roomName in Game.rooms) {
            if(!Memory['map'][roomName]) {
                Memory['map'][roomName] = {};
            }
            for(var x = 0; x < 50; x++) {
                if(Memory['map'][roomName] == null) Memory['map'][roomName] = {};
                if(Memory['map'][roomName][x] == null) {
                    Memory['map'][roomName][x] = {};
                }
                for(var y = 0; y < 50; y++){
                    if(Memory['map'][roomName][x][y] == null) {
                         Memory['map'][roomName][x][y] = {'passTimes':0};
                    }
                }
            }
        }
    }
}
class Structure {
    static update() {
        for(var roomName in Game.rooms) {
            var structures = Game.rooms[roomName].find(FIND_STRUCTURES);
            for (var i in structures) {
                var structure = structures[i];
                Memory['map'][roomName][structure.pos.x][structure.pos.y].type = 'structure';
                Memory['map'][roomName][structure.pos.x][structure.pos.y].subType = structure.structureType;
            }
        }
    }
}
class Source {
    static update() {
        for(var roomName in Game.rooms) {
            const visual = new RoomVisual(roomName);
            var sources = Game.rooms[roomName].find(FIND_SOURCES);
            for(var i in sources) {
                var source = sources[i];
                if(typeof Memory['source'] == 'undefined') {
                    Memory['source'] = {};
                }
                if(typeof Memory['source'][roomName] == 'undefined') {
                    Memory['source'][roomName] = {};
                }
                if(typeof Memory['source'][roomName][source] == 'undefined'){
                    Memory['source'][roomName][source] = {};
                }
                if(source.ticksToRegeneration < 10) {
                    Memory['source'][roomName][source].lastEnergy = source.energy;
                    //console.log("lastEnergy", Memory.source[source].lastEnergy);
                }
                Memory['map'][roomName][source.pos.x][source.pos.y].type = 'source';
                Memory['map'][roomName][source.pos.x][source.pos.y].id = source.id;
                // @ts-ignore 
                visual.text(source.energy, source.pos.x + 0.3, source.pos.y, {align: 'left', size: 0.3, opacity: 0.7});
                // @ts-ignore 
                visual.text(source.ticksToRegeneration, source.pos.x + 0.3, source.pos.y + 0.3, {align: 'left', size: 0.3,opacity: 0.7});
                // @ts-ignore 
                visual.text(Memory['source'][roomName][source].lastEnergy, source.pos.x + 0.3, source.pos.y + 0.6, {align: 'left', size: 0.3,opacity: 0.7});
            }
        }
    }
}

class Container {
    static update() {
        for(var roomName in Game.rooms) {
            const visual = new RoomVisual(roomName);
            var containers = Game.rooms[roomName].find(FIND_STRUCTURES,{
                filter : (structure) => {
                    return structure.structureType == 'container';
                }
            })
            for(var i in containers) {
                var container = containers[i];
                if(!Memory['container']) {
                    Memory['container'] = {};
                }
                if(!Memory['container'][roomName]) {
                    Memory['container'][roomName] = {};
                }
                if(!Memory['container'][roomName][container.id]) {
                    Memory['container'][roomName][container.id] = {};
                }
                for(var j = -2; j < 2; j++) {
                    for(var k = -2; k < 2; k++) {
                        var ans = Memory['map'][roomName][container.pos.x + j][container.pos.y + k].type;
                        if(ans == 'source') {
                            Memory['container'][roomName][container.id].closeSource = true;
                        }
                    }
                }
                for(var j = -4; j < 4; j++) {
                    for(var k = -4; k < 4; k++) {
                        var ans = Memory['map'][roomName][container.pos.x + j][container.pos.y + k].subType;
                        if(ans == 'controller') {
                            Memory['map'][roomName][container.id].closeController = true;
                        }
                    }
                }
            }
        }
    }
}

/**
 * 游戏所有的配置
 * 会将所有的属性存到Memory中
 */
export class Config {
    public creep:MyCreep;
    private updateOnceFlag = true;
    /**
     * 随着时间更新所有数据
     */
    public update() {
        if(this.updateOnceFlag) {
            this.updateOnce();
            this.updateOnceFlag = false;
        }
        MapClass.update();
        Structure.update();
        Source.update();
        // Container.update();
        this.creep.harvester.body = {work:5, move:1, carry:1};
        this.creep.harvester.max = 2;
        this.creep.upgrader.body = {work:2, move:2, carry:4};
        this.creep.upgrader.max = 2;
        this.creep.builder.body = {work:1, move:2, carry:2};
        this.creep.builder.max = 2;
        this.creep.transfer.body = {work:0, move:3, carry:6};
        this.creep.transfer.max = 1;
        //Prototype.update();
        this.creep.update();
    }
    private updateOnce() {
        console.log("加载config的各个类");
        this.creep = new MyCreep;
        this.creep.update();
    }
}
