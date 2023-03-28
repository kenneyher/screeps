var u = require('role.upgrader');
var roleHarvester = {
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
            let droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (r) => r.resourceType == RESOURCE_ENERGY
            });
            let storage = creep.room.storage;

            if(droppedResources != undefined){
                if(creep.pickup(droppedResources) == ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedResources, {visualizePathStyle: {stroke: '#ffe000'}, ignoreCreeps: true});
                }
            }
            else if(closestSource != undefined){
                var e = creep.harvest(closestSource);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestSource,  {visualizePathStyle: {stroke: '#ffe000'}});
                }    
            }
            else if(storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 600000){
                let e = creep.withdraw(storage, RESOURCE_ENERGY);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage,  {visualizePathStyle: {stroke: '#ffe000', opacity: 0.4}, ignoreCreeps: true});
                }  
            }
        }else{
            var targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN 
                                 || s.structureType == STRUCTURE_EXTENSION
                                 || s.structureType == STRUCTURE_TOWER 
                                 || s.structureType == STRUCTURE_LAB)
                                 && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            var target = creep.pos.findClosestByPath(targets);
            let tower = creep.room.find(STRUCTURE_TOWER, {
                filter: (s) => (s.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
            })[0];
            if(target){
                var e = creep.transfer(target, RESOURCE_ENERGY);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {ignoreCreeps: true});
                }
            }else if(tower){
                var e = creep.transfer(tower, RESOURCE_ENERGY);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {ignoreCreeps: true});
                }
            }
            else {
                u.run(creep);
            }
        }
    }
};
module.exports = roleHarvester;
