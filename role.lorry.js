var roleLorry = {
    run: function(creep) {
        if (creep.memory.working && 0 == _.sum(creep.store)) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.store.getCapacity() == _.sum(creep.store)) {
            creep.memory.working = true;
        }

        if(creep.memory.working){
            var mineral = creep.room.find(FIND_MINERALS)[0];
            var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN 
                                || s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_LAB) && s.energy < s.energyCapacity
            });
            let tower = creep.room.find(STRUCTURE_TOWER, {
                filter: (s) => (s.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
            })[0];
            // let energyLimit = Math.floor(creep.store.getCapacity()/2);

            if(target && creep.store[RESOURCE_ENERGY]) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#6c6c6c', lineStyle: 'dotted'}});
                }
            }else if(tower && creep.store[RESOURCE_ENERGY]){
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower, {visualizePathStyle: {stroke: '#6c6c6c', lineStyle: 'dotted'}});
                }
            }else if(creep.store[RESOURCE_ENERGY]){
                var storage = creep.room.storage;
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#6c6c6c', lineStyle: 'dotted'}});
                for(const resourceType in creep.store){
                    creep.transfer(storage, resourceType);
                }
            }else {
                var storage = creep.room.storage;
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#6c6c6c', lineStyle: 'dotted'}});
                for(const resourceType in creep.store){
                    creep.transfer(storage, resourceType);
                }
            }
            
        }
        else {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store.getUsedCapacity() > creep.store.getCapacity()
            });
            let container = containers[0];
            let droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            let tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: (t) => t.store.getUsedCapacity() > 0
            });
            let ruin = creep.pos.findClosestByPath(FIND_RUINS, {
                filter: (t) => t.store.getUsedCapacity() > 0
            });
            if(tombstone){
                for(const resourceType in tombstone.store){
                    var e = creep.withdraw(tombstone, resourceType);
                    if(e == ERR_NOT_IN_RANGE){
                        creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#cdff00', lineStyle: 'dotted'}});
                    }
                }
            }else if (container != undefined) {
                for(const resourceType in container.store){
                    var e = creep.withdraw(container, resourceType);
                    if(e == ERR_NOT_IN_RANGE){
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#cdff00', lineStyle: 'dotted'}});
                    }
                }
            }else if(ruin){
                for(const resourceType in ruin.store){
                    var e = creep.withdraw(ruin, resourceType);
                    if(e == ERR_NOT_IN_RANGE){
                        creep.moveTo(ruin, {visualizePathStyle: {stroke: '#cdff00', lineStyle: 'dotted'}});
                    }
                }
            }else if(droppedResources){
                if(creep.pickup(droppedResources) == ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedResources);
                }
            }
        }
    }
};
module.exports = roleLorry;
