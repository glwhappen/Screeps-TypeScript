export class Tower {
    static TowerSpeed = 1;
    static wallMaxHits = 1;
    static work() {
        var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        });
        for(var i in targets) {
            var tower = <StructureTower>targets[i];
            if(tower) {
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                } else {
                    const target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: function(object) {
                            return object.hits < object.hitsMax;
                        }
                    });
                    if(target) {
                        tower.heal(target);
                    } else {
                        var closestDamagedStructure = tower.pos.findClosestByRange(Game.time % Tower.TowerSpeed != 0 ? FIND_MY_STRUCTURES:FIND_STRUCTURES, {
                            filter: (structure) => structure.structureType == "constructedWall" || structure.structureType == "rampart" ? structure.hits < Tower.wallMaxHits : structure.hits < structure.hitsMax
                        });
                        if(closestDamagedStructure) {
                            tower.repair(closestDamagedStructure);
                        }               
                    }
                }
            }    
        }
    }
    static update() {
        Tower.work();
    }
}