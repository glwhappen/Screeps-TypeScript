import "./extension-creep";
import {Role} from './role'

class Transfer extends Role {
    role = 'transfer';
    work(creep:Creep) {
        if(creep.memory['transfing'] && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory['transfing'] = false;
        }
        if(!creep.memory['transfing'] && creep.store.getFreeCapacity() == 0) {
            creep.memory['transfing'] = true;
        }
        //console.log(Creep.prototype.target_id);
        if(!creep.memory['transfing']) {
			// 获取能量
			if(creep.checkCloseSourceContainerEnergy(true)) { // 检查container
				creep.getContainerEnergy();
			} else {
			    
			}
        }
        else {
            if(creep.checkSpawnEnergy()) {
                creep.fillSpawnEnergy();
            } else {
                if(creep.checkTowerEnergy()) {
                    creep.say("tawer");
                    creep.fillTowerEnergy();
                } else {
                    // 填充升级container的能量
                    // if(creep.checkContainerEnergy()) {
                    //     creep.fillContainerEnergy();
                    // }else {

                    // }
                } 
            }

        }
    }
}

class Repairer extends Role {
    role = 'repairer';
    work(creep:Creep) {

    }
}

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
				creep.memory['notBuild'] = false;
			} else {
				if(creep.checkRepair()) {
					creep.toRepair();
					creep.memory['notBuild'] = false;
				} else {
				    if(creep.checkContainerEnergy()) {
                        creep.fillContainerEnergy();
                        creep.memory['notBuild'] = true;
                    }
				}
			}
			
	    }
	    else {
			// 获取能量
			if(!creep.memory['notBuild'] && creep.checkContainerEnergy()) { // 检查container
				creep.getContainerEnergy();
			} else {
				if(creep.checkSourceEnergy()) { // 直接挖矿
					creep.getSourceEnergy();
				}
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
                if(creep.checkContainerEnergy()) {
                    creep.fillContainerEnergy();
                }
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
    harvester:Harvester;
    upgrader:Upgrader;
    builder:Builder;
    transfer:Transfer;
    private updateOneFlag = true;
    /**
     * 只需要加载一次的数据
     */
    private updateOnce() {
        console.log("加载MyCreep的各个类");
        this.harvester = new Harvester;
        this.upgrader = new Upgrader;
        this.builder = new Builder;
        this.transfer = new Transfer;
    }
    /**
     * 更新角色的数据
     * @param time 游戏时间
     */
    public update() {
        if(this.updateOneFlag) {
            this.updateOnce();
            this.updateOneFlag = false;
        }
        this.harvester.update();
        this.upgrader.update();
        this.builder.update();
        this.transfer.update();
        
        this.updateLow();
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            if(!creep) continue;
            if(creep.memory['role'] == 'harvester') {
                this.harvester.work(creep);
            } else if(creep.memory['role'] == 'upgrader') {
                this.upgrader.work(creep);
            } else if(creep.memory['role'] == 'builder') {
                this.builder.work(creep);
            } else if(creep.memory['role'] == 'transfer') {
                this.transfer.work(creep);
            }
            
        }

    }

    /**
     * 根据游戏时间取模一个值，来缓慢更新一些不是太即时的数据。
     */
    private updateLow():void {
        if(Game.time % 5) { // 缓慢检测数量
        }
    }
}