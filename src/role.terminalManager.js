let towerM = require('role.towerManager');
var terManager = {
    run: function(creep){
        if(creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.harvesting = false;
            creep.say('🔄');
        }else if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.harvesting = true;
            creep.say('☭');
        }
        
        if(creep.memory.harvesting){
            var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            var storage = creep.room.storage;
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER) && s.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity(RESOURCE_ENERGY)
            })
            if(closestSource != undefined){
                var e = creep.harvest(closestSource);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestSource);
                }    
            }else if(container != undefined){
                var e = creep.withdraw(container, RESOURCE_ENERGY);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(container);
                } 
            }else {
                if(storage.store[RESOURCE_ENERGY] > 4000){
                    var e = creep.withdraw(storage, RESOURCE_ENERGY);
                    if(e == ERR_NOT_IN_RANGE){
                        creep.moveTo(storage);
                    } 
                }
            }
        }else{
            var terminal = creep.room.terminal;
            if(terminal && terminal.store[RESOURCE_ENERGY] >= 100000){
                var e = creep.transfer(terminal, RESOURCE_ENERGY);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(terminal);
                }
            }else {
                towerM.run(creep);
            }
        }
    }
};
module.exports = terManager;
