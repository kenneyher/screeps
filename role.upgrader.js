var roleUpgrader = {
    run: function(creep){
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.upgrading = false;
            creep.say('🔄');
        }else if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0){
            creep.memory.upgrading = true;
            creep.say('⚡︎');
        }
        
        if(creep.memory.upgrading){
            var e = creep.upgradeController(creep.room.controller);
            if(e == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }else{
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            let storage = creep.room.storage;
            if(source != undefined){
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source,);
                }
            }else if(storage && storage.store[RESOURCE_ENERGY] > 200000){
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    }
};
module.exports = roleUpgrader;
