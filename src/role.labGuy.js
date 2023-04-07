const lorry = require('role.lorry');

let labGuy = {
    run: function(creep){
        if (creep.memory.working && 0 == _.sum(creep.store)) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.store.getCapacity() == _.sum(creep.store)) {
            creep.memory.working = true;
        }
        
        if(creep.memory.working){
            let mineral = creep.memory.mineral;
            let lab = Game.getObjectById(creep.memory.lab);
            
            let e = creep.transfer(lab, mineral);
            if(e == ERR_NOT_IN_RANGE){
                creep.moveTo(lab, {visualizePathStyle: {stroke: '#6c6c6c', opacity: 0.5}});
            }
            if(lab.store.getFreeCapacity() == 0){
                lorry.run(creep);
            }
        }else {
            let source = Game.getObjectById(creep.memory.source)
            let mineral = creep.memory.mineral;
            if(source){
                let e = creep.withdraw(source, mineral);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#6c6c6c', lineStyle: 'dotted', opacity: 0.5}});
                }
            }
        }
    }
};
module.exports = labGuy;
