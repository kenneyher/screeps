let downgrader = {
    run: function(creep){
        let target = creep.memory.targets[0];
        if(creep.room.name !== target){
            creep.say('✈️');
            var exit = creep.room.findExitTo(target);
            var e = creep.pos.findClosestByPath(exit);
            creep.moveTo(e, {visualizePathStyle: {stroke: '#b092fa', opacity: 0.5}});
        }else{
            if(creep.memory.targets.length > 1){
                creep.memory.targets.splice(0, 1);
            }
            creep.say('⇣');
            var controller = creep.room.controller;
            console.log(controller.owner.username);
            if(controller){
                var e = creep.attackController(controller);
                if(e == ERR_NOT_IN_RANGE){
                    creep.moveTo(controller, {visualizePathStyle: {stroke: '#e54b4a', opacity: 0.5}});
                }
            }
        }
    }
}
module.exports = downgrader;
