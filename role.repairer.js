var repairer = require('role.repairer');

var rampartRepairer = {
    run: function(creep){
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.repairing = false;
            creep.say('🔄');
        }else if(!creep.memory.repairing && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.repairing = true;
            creep.say('🔧');
        }
        
        if(creep.memory.repairing){
            var ramparts = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_RAMPART) && s.hits < s.hitsMax
            });

            var target = this.getRepairTargets(ramparts);

            if(target != undefined){
                var e = creep.repair(target);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }else {
                repairer.run(creep);
            }
        }else{
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source != undefined){
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    },
    
    getRepairTargets: function(ramparts){
        var target = undefined;
        var maxHits = Number.POSITIVE_INFINITY;
        for (let i = 0; i < ramparts.length;  i++){
            var rampart = ramparts[i];
            if(rampart.hits < maxHits){
                maxHits = rampart.hits;
                target = rampart;
            }
        }
        return target;
    }
};
module.exports = rampartRepairer;
