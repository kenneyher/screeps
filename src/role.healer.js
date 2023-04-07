let healer = {
    run: function(creep){
        if(creep.memory.targets.length > 0){
            let target = creep.memory.targets[0];
            if(creep.room.name !== target){
                var exit = creep.room.findExitTo(target);
                var e = creep.pos.findClosestByPath(exit);
                creep.moveTo(e, {visualizePathStyle: {stroke: '#57f253', opacity: 0.5}});
                for(let parts in creep.body){
                    let part = creep.body[parts];
                    if(part.hits < part.hitsMax || part.hits < 100){
                        creep.heal(creep);
                        console.log(creep.heal(creep));
                    }
                }
            }else{
                if(creep.memory.targets.length > 1){
                    creep.memory.targets.splice(0, 1);
                }
                for(let parts in creep.body){
                    let part = creep.body[parts];
                    if(part.hits < part.hitsMax || part.hits < 100){
                        creep.heal(creep);
                        console.log(creep.heal(creep));
                    }
                }
                
            }
        }
        for(let parts in creep.body){
            let part = creep.body[parts];
            if(part.hits < part.hitsMax || part.hits < 100){
                creep.heal(creep);
                console.log(creep.heal(creep));
            }
        }
        if(creep.hits < creep.hitsMax){
            creep.heal(creep);
            console.log(creep.heal(creep));
        }
    }
};
module.exports = healer;
