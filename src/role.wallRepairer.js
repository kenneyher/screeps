var repairer = require('role.repairer');
var wallRepairer = {
    run: function(creep){
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.repairing = false;
            creep.say('🔄');
        }else if(!creep.memory.repairing && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.repairing = true;
            creep.say('🔨');
        }
        
        if(creep.memory.repairing){
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });
            
            var target = this.getRepairTargets(walls);
            
            if(target != undefined){
                var e = creep.repair(target);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }else{
                repairer.run(creep)
            }
        }else{
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source != undefined){
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    },
    
    getRepairTargets: function(walls){
        var target = undefined;
        for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
            for (let wall of walls) {
                if (wall.hits / wall.hitsMax < percentage) {
                    target = wall;
                    break;
                }
            }
            if (target != undefined) {
                break;
            }
        }
        return target;
    }
};
module.exports = wallRepairer;
