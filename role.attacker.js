let attacker = {
    run: function(creep){
        let target = creep.memory.targets[0];
        if(creep.room.name !== target){
            var exit = creep.room.findExitTo(target);
            var e = creep.pos.findClosestByPath(exit);
            creep.moveTo(e, {visualizePathStyle: {stroke: '#e54b4a', opacity: 0.5}});
        }else{
            if(creep.memory.targets.length > 1){
                creep.memory.targets.splice(0, 1);
            }
            let enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            let spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_SPAWN
            });
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType != STRUCTURE_ROAD && s.structureType != STRUCTURE_WALL
            });
            if(enemy){
                let e = creep.attack(enemy);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(enemy, {visualizePathStyle: {stroke: '#e54b4a', opacity: 0.5, lineStyle: 'dotted'}});
                }
            }else if(spawn){
                let e = creep.attack(spawn);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#e54b4a', opacity: 0.5, lineStyle: 'dotted'}});
                }
            }else if(structure){
                let e = creep.attack(structure);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#e54b4a', opacity: 0.5, lineStyle: 'dotted'}});
                }
            }else {
                creep.say('☠️');
                Game.notify(creep.name + ' has completed his mission, will procred to suicide', 0);
                creep.suicide();
            }
        }
    }
};
module.exports = attacker;
