let transferor = {
    run: function(creep){
        if (creep.memory.working && 0 == _.sum(creep.store)) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.store.getCapacity() == _.sum(creep.store)) {
            creep.memory.working = true;
        }
        
        if(creep.memory.working){
            let target = Game.getObjectById(creep.memory.pointB);
            let resource = creep.memory.resource;
            if(target){
                creep.moveTo(target, {visualizePathStyle: {stroke: '#6c6c6c', lineStyle: 'dotted', opacity: 0.4}});
                for(const resourceType in creep.store){
                    creep.transfer(target, resourceType);
                }
            }
        }else {
            let source = Game.getObjectById(creep.memory.pointA);
            let resource = creep.memory.resource;
            if(source){
                let e = creep.withdraw(source, resource);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#6c6c6c', lineStyle: 'dotted', opacity: 0.5}});
                }
            }
        }
    }
};
module.exports = transferor;
