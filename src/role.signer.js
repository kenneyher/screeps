var signer = {
    run: function(creep){
        if(creep.room.name != creep.memory.target){
            let exit = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
            creep.moveTo(exit, {visualizePathStyle: {stroke: '#ff6800', strokeWidth: 0.3, opacity: 0.5}});
        }else {
            let controller = creep.room.controller;
            if(!creep.memory.message){
                creep.memory.message = 'controller signed by: ' + creep.owner.username;
            }
            let e = creep.signController(controller, creep.memory.message);
            if(e == ERR_NOT_IN_RANGE){
                creep.moveTo(controller, {visualizePathStyle: {stroke: '#00ff97', strokeWidth: 0.2, opacity: 0.3}})
            }
        }
    }
};
module.exports = signer;
