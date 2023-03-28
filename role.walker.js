var walker = {
    run: function(creep){
        var flags = Game.flags;
        var flag = this.getFlag(flags);
        if(flag != undefined){
            if(flag.pos.roomName != creep.room.name){
                var exit = creep.room.findExitTo(flag.pos.roomName);
                creep.moveTo(creep.pos.findClosestByPath(exit), {visualizePathStyle: {stroke: '#ff0027'}});
            }else{
                flag = creep.pos.findClosestByPath(FIND_FLAGS);
                if(flag){
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ff0027'}});
                    if(creep.pos.isEqualTo(flag.pos)){
                        flag.remove();
                    }
                }
            }
        }
    },
    getFlag: function(flags){
        for(let index in flags){
            var flag = flags[index];
            break;
        }
        return flag;
    }
};
module.exports = walker;
