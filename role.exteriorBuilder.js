var h = require('role.harvester');
var eBuilder = {
    run: function(creep){
        var t = creep.memory.targets[0];
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄');
	    }
	    else if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	         creep.memory.building = true;
	         creep.say('🚧');
	    }
	    
	    if(creep.memory.building){
	        if(creep.room.name !== t){
	            var exit = creep.room.findExitTo(target);
                var e = creep.pos.findClosestByPath(exit);
                creep.moveTo(e, {visualizePathStyle: {stroke: '#fbe67f', opacity: 0.5}});
	        }else{
	            if(creep.memory.targets.length > 1){
                    creep.memory.targets.splice(0, 1);
                }
	            var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
	            var cs = constructionSites[0];
	            if(cs){
	                var e = creep.build(cs);
	                if(e == ERR_NOT_IN_RANGE){
	                    creep.moveTo(cs);
	                }
	            }else {
	                h.run(creep);
	            }
	        }
	    }else {
	        if(creep.room.name !== t){
	            var exit = creep.room.findExitTo(t);
                var e = creep.pos.findClosestByPath(exit);
                creep.moveTo(e, {visualizePathStyle: {stroke: '#fbe67f'}});
	        }else{
	            if(creep.memory.targets.length > 1){
                    creep.memory.targets.splice(0, 1);
                }
	            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
	            if(source){
	                var e = creep.harvest(source);
	                if(e == ERR_NOT_IN_RANGE){
	                    creep.moveTo(source);
	                }
	            }
	        }
	    }
    }
};
module.exports = eBuilder;
