var claimer = {
    run: function(creep){
        if(creep.memory.targets.length > 0){
            let target = creep.memory.targets[0];
            if(creep.room.name !== target){
                var exit = creep.room.findExitTo(target);
                var e = creep.pos.findClosestByPath(exit);
                creep.moveTo(e, {visualizePathStyle: {stroke: '#b092fa', opacity: 0.5}});
            }else{
                if(creep.memory.targets.length > 1){
                    creep.memory.targets.splice(0, 1);
                }
                var controller = creep.room.controller;
                if(controller){
                    var e = creep.claimController(controller);
                    if(e == ERR_NOT_IN_RANGE){
                        creep.moveTo(controller);
                    }
                }
            }
        }
    }
}
module.exports = claimer;
