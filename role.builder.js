var h = require('role.harvester');
const structureOrder = [
    STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER, STRUCTURE_STORAGE, STRUCTURE_TERMINAL, STRUCTURE_FACTORY, STRUCTURE_LAB, STRUCTURE_EXTRACTOR,
    STRUCTURE_LINK, STRUCTURE_CONTAINER, STRUCTURE_OBSERVER, STRUCTURE_WALL, STRUCTURE_RAMPART, STRUCTURE_ROAD
];
var roleBuilder = {
    run: function(creep) {
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄');
	    }
	    else if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	         creep.say('🚧');
	    }
	   
	    if(creep.memory.building) {
	        var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
	        var target = this.getMostImportant(constructionSites);
	       // console.log(target);
	       
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffe000'}, ignoreCreeps: true});
            }
            }else {
                h.run(creep);
            }
	    }else {
	        var closestSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
	        if(closestSource != undefined){
	            var e = creep.harvest(closestSource);
	            if(e == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#fffea9'}});
                }
	        }
	    }
    },
    getMostImportant(constructionSites){
        var mostImportantConstructionSite = undefined;
        var mostImportantIndex = 1000;
        for(let i=0; i<constructionSites.length; i++){
            let constructionSite = constructionSites[i];
            if(structureOrder.indexOf(constructionSite.structureType) < mostImportantIndex){
                mostImportantIndex = structureOrder.indexOf(constructionSite.structureType);
                mostImportantConstructionSite = constructionSite;
            }
            // console.log(mostImportantConstructionSite, mostImportantIndex, constructionSite);
        }
        return mostImportantConstructionSite;
    }
};

module.exports = roleBuilder;
