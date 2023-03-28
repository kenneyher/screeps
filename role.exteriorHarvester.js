var roleExteriorHarvester = {
    run: function(creep){
        if(creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.harvesting = false;
            creep.say('🔄');
        }else if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.harvesting = true;
            creep.say('☭🔍');
        }
        
        if(creep.memory.harvesting){
            if(creep.room.name == creep.memory.target){
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                var e = creep.harvest(source);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ba0609', lineStyle: 'dotted'}});
                }
            }else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ba0609', lineStyle: 'dotted'}});
            }
        }else{
            if(creep.room.name == creep.memory.home){
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (s) => (s.structureType == STRUCTURE_SPAWN 
                                 || s.structureType == STRUCTURE_EXTENSION
                                 || s.structureType == STRUCTURE_TOWER)
                                 && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
                if(target){
                    var e = creep.transfer(target, RESOURCE_ENERGY);
                    if(e == ERR_NOT_IN_RANGE){
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#d1ff00', lineStyle: 'dotted'}});
                    }
                }
            }else {
                let exit = creep.room.findExitTo(creep.memory.home);
                creep.say(creep.room.name);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#d1ff00', lineStyle: 'dotted'}});
            }
        }
    }
};
module.exports = roleExteriorHarvester;
