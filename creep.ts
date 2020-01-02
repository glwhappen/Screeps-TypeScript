import "./extension-creep";
import {Role} from './role'
class Builder extends Role {
    role = 'builder';
    work(creep:Creep) {

	    if(creep.memory['building'] && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory['building'] = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory['building'] && creep.store.getFreeCapacity() == 0) {
	        creep.memory['building'] = true;
	        creep.say('🚧 build');
	    }
	    if(creep.memory['building']) {
			// 工作
			if(creep.checkBuild()) {
				creep.toBuild();
			} else {
				if(creep.checkRepair()) {
					creep.toRepair();
				} else {

				}
			}
			
	    }
	    else {
            if(creep.checkSourceEnergy()) { // 直接挖矿
                creep.getSourceEnergy();
            }
	    }
    }
}
class Upgrader extends Role {
    role = 'upgrader';
    work(creep:Creep) {
        if(creep.memory['upgrading'] && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory['upgrading'] = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory['upgrading'] && creep.store.getFreeCapacity() == 0) {
	        creep.memory['upgrading'] = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory['upgrading']) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            if(creep.checkSourceEnergy()) {
                creep.getSourceEnergy();
            }
        }
    }
}
class Harvester extends Role {
    role = 'harvester';
    // 所有harvester将会执行的操作。
    work(creep:Creep) {
        if(creep.memory['harvesting'] && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory['harvesting'] = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory['harvesting'] && creep.store.getFreeCapacity() == 0) {
            creep.memory['harvesting'] = true;
        }
	    if(creep.memory['harvesting']) {
            if(creep.checkSpawnEnergy()) {
                creep.fillSpawnEnergy();
            } else {

            }
            
        } else {
            // 挖矿
            if(creep.checkSourceEnergy()) {
                creep.getSourceEnergy();
            }
            
        }
    }
}
/**
 * 管理所有的creep角色
 */
export class MyCreep {
    harvester = new Harvester;
    upgrader = new Upgrader;
    private updateOneFlag = true;
    /**
     * 更新角色的数据
     * @param time 游戏时间
     */
    public update() {
        this.harvester.update();
        this.upgrader.update();
        this.updateLow();
        if(this.updateOneFlag) {
            this.updateOnce();
            this.updateOneFlag = false;
        }
    }
    /**
     * 只需要加载一次的数据
     */
    private updateOnce() {

    }
    /**
     * 根据游戏时间取模一个值，来缓慢更新一些不是太即时的数据。
     */
    private updateLow():void {
        if(Game.time % 5) { // 缓慢检测数量
        }
    }
}