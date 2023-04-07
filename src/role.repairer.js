var builder = require('role.builder');
var roleRepairer = {
    run: function(creep){
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.repairing = false;
            creep.say('🔄');
        }else if(!creep.memory.repairing && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.repairing = true;
            creep.say('🛠');
        }
        
        if(creep.memory.repairing){
            var targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType != STRUCTURE_WALL) && s.hits < s.hitsMax
            });
            let target = targets[0];
            if(target){
                var e = creep.repair(target);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }else {
                builder.run(creep);
            }
        }else{
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source != undefined){
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};
module.exports = roleRepairer;
