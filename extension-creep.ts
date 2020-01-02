Creep.prototype.say3 = function(msg:string):void {
    this.say(msg);
}
Creep.prototype.checkBuild = function() {
    var target =this.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if(target) {
        this.memory.target = target;
        return true;
    }
    return false;
}
// 建造
Creep.prototype.toBuild = function() {
    this.say('Build');
    var target = this.memory.target;
    if(this.build(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
}
// 检测周围是否有需要修理的结构
Creep.prototype.checkRepair = function() {
    var target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: object => (object.hits / object.hitsMax) < 0.9
    });
    if(target) {
        this.memory.target = target;
        return true;
    } else {
        return false;
    }
}
// 修理
Creep.prototype.toRepair = function() {
    this.say('Repair');
    var target = this.memory.target;
    if(this.repair(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
}
// 检测Spawn中的能量
Creep.prototype.checkSpawnEnergy = function() {
    var target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if(target) {
        this.memory.target = target;
        return true;
    }
    return false;
}
// 填充所有 spawn 和 extension
Creep.prototype.fillSpawnEnergy = function() {
    var target = this.memory.target;
    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
}
// 检测塔中的能量
Creep.prototype.checkTowerEnergy = function() {
    var target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) >= (this.store.getUsedCapacity() > 500 ? 500 : this.store.getUsedCapacity());
        }
    });
    if(target) {
        this.memory.target = target;
        return true;
    }
    return false;
}
// 向塔中添加能量
Creep.prototype.fillTowerEnergy = function() {
    var target = this.memory.target;
    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
}
// 检查矿石中的能量
Creep.prototype.checkSourceEnergy = function() {
    var target = this.pos.findClosestByPath(FIND_SOURCES, {
        filter:(source) => {
            return source.energy > 0;
        }
    });
    this.say(target.id);
    console.log(target.id);
    if(target) {
        this.memory.target = target;
        return true;
    } else {
        this.say("没有矿可以挖了");
        return false;
    }    
}
// 从矿石获取能量
Creep.prototype.getSourceEnergy = function() {
    var target = this.memory.target;
    console.log("get", target.id);
    if(this.harvest(target) == ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

/**
 * 检查挨着矿物的container中的能量
 * @param {当前是判断能否获取吗，默认为否}} get 
 */
Creep.prototype.checkCloseSourceContainerEnergy = function(get) {
    get = get ? get : false;
    var room = this.room.name;
    var target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter : (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER && 
            // Memory.container[room][structure.id].closeSource &&
            (get ? structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 : 
            structure.store.getFreeCapacity(RESOURCE_ENERGY) >= (this.store.getUsedCapacity() > 500 ? 500 : this.store.getUsedCapacity()) );
        }
    });
    if(target) {
        this.memory.target = target;
        return true;
    }
    return false;
}
// 
/**
 * 检查挨着controller的container中的能量
 * @param {当前是判断能否获取吗，默认为否}} get 
 */
Creep.prototype.checkCloseControllerContainerEnergy = function(get) {
    get = get ? get : false;
    var room = this.room.name;
    var target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter : (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER && 
            // Memory.container[room][structure.id].closeController &&
            (get ? structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 : 
            structure.store.getFreeCapacity(RESOURCE_ENERGY) >= (this.store.getUsedCapacity() > 500 ? 500 : this.store.getUsedCapacity()));
        }
    });
    if(target) {
        this.memory.target = target;
        return true;
    }
    return false;
}
// 填充container
Creep.prototype.fillContainerEnergy = function() {
    var target = this.memory.target;
    if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
}
// 从container中获取能量
Creep.prototype.getContainerEnergy = function() {
    var target = this.memory.target;
    if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

export{}