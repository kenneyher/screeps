var builder = require('role.builder');
var roleTManager = {
    run: function(creep){
        if (creep.memory.charging && creep.store[RESOURCE_ENERGY] == 0) { 
            creep.memory.charging = false;
            creep.say('⛏');
        }
        if(!creep.memory.charging && creep.store.getFreeCapacity() == 0) {
            creep.memory.charging = true;
            creep.say('⛽️');
        }
        
        if(creep.memory.charging){
            var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER)
                && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            
            if(tower){
                if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tower, {visualizePathStyle: {stroke: '#f3ff00', lineStyle: 'dotted', opacity: 0.4}})
                }
            }else {
                builder.run(creep);
            }
            
        }else if(!creep.memory.charging){
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source != undefined){
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};
module.exports = roleTManager;
