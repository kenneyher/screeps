module.exports = {
    run: function(creep){
        if (!creep.memory.harvesting && 0 == _.sum(creep.store)) {
            creep.memory.harvesting = true;
        }
        else if (creep.memory.harvesting && creep.store.getCapacity() == _.sum(creep.store)) {
            creep.memory.harvesting = false;
        }
        
        if(creep.memory.harvesting){
            if(creep.room.name !== creep.memory.target){
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByPath(exit), {visualizePathStyle: {stroke: '#ff0074'}});
            }else {
                var deposit = creep.pos.findClosestByPath(FIND_DEPOSITS);
                if(deposit && !deposit.cooldown){
                    var e = creep.harvest(deposit);
                    if(e == ERR_NOT_IN_RANGE){
                        creep.moveTo(deposit, {visualizePathStyle: {stroke: '#ff0514'}});
                    }
                }
            }
        }else {
            if(creep.pos.roomName == creep.memory.home){
                var storage = creep.room.storage;
                // creep.say('I am here');
                if(storage){
                    for(const resourceType in creep.store) {
                        creep.transfer(storage, resourceType);
                    }
                }
            }
            else {
                let exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByPath(exit))
            } 
        }
    }
};
