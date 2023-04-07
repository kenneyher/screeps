
const spawner = {
    play: function(){
        for(let spawnName in Game.spawns){
            var spawn = Game.spawns[spawnName];
            this.run(spawn);
        }
    },
    run: function(spawn){
        var creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
        var mineral = this.identifyContainersNearMinerals(spawn);
        let invaders = spawn.room.find(FIND_HOSTILE_CREEPS);
        let constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);


        var energy = spawn.room.energyCapacityAvailable;
        
        var energyAvailable = spawn.room.energyAvailable;
        

        // console.log(energyAvaible);
        let harvesters = _.filter(creepsInRoom, (creep) => creep.memory.role == 'harvester');
        let depHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'depHarvester');
        let eHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'eHarvester');
        let upgraders = _.filter(creepsInRoom, (creep) => creep.memory.role == 'upgrader')
        let builders = _.filter(creepsInRoom, (creep) => creep.memory.role == 'builder');
        let repairers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'repairer')
        let miners = _.filter(creepsInRoom, (creep) => creep.memory.role == 'miner');
        let lorries = _.filter(creepsInRoom, (creep) => creep.memory.role == 'lorry');
        let wallRepairers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'wallRepairer');
        let towerManagers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'towerManager');
        let rampartRepairers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'rampartRepairer');
        let claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
        let extractors = _.filter(creepsInRoom, (creep) => creep.memory.role == 'extractor');
        let terManagers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'terManager');
        let guardians = _.filter(creepsInRoom, (c) => c.memory.role == 'guardian')
        let transferors = _.filter(creepsInRoom, (c) => c.memory.role == 'transferor')
        let eBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'eBuilder');
        let labGuys = _.filter(Game.creeps, (creep) => creep.memory.role == 'labGuy');
        
        // const body = [WORK, MOVE, CARRY, MOVE, CARRY];
    
        
        // if(invaders.length > 0){
        //     if(guardians.length < invaders.length){
        //         var creepRole = 'guardian';
        //         var name = 'g' + Math.floor(Math.random()*100);
        //         var body = this.createGuardianBody(energyAvailable);
        //         var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
        //     }
        // }else {
            // if(invaders.length < 1){ 
            if(harvesters.length < spawn.memory.minHarvesters){
                if(creepsInRoom.length < 1){
                    var creepRole = 'harvester';
                    var name = Math.random() < 0.2 ? 'Neo' : 'h' + Math.floor(Math.random()*100);
                    var energyAvaible = spawn.room.energyAvailable;
                    var body = this.createCreepBody(energyAvailable);
                    var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
                    console.log('hi')
                }else{
                    var creepRole = 'harvester';
                    var name = 'h' + Math.floor(Math.random()*100);
                    var body = this.createCreepBody(energy);
                    var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
                }
            // }else if(transferors.length < 1 && spawn.name == 'mandarina'){
            //     var creepRole = 'transferor';
            //     var name = 'tr' + Math.floor(Math.random()*100);
            //     var body = this.createLorryBody(energy);
            //     var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, resource: RESOURCE_ENERGY, pointB: '6265089cd21b284df29dcea6', pointA: '621ac0c753135b09e4d54e23', amount: 10000}});
            // }else if(SPAWN_FEATURES[spawn.name].eH < spawn.memory.minEH){
            //     var creepRole = 'eHarvester';
            //     var name = 'eH' + Math.floor(Math.random()*100);
            //     var body = this.createCreepBody(energy);
            //     var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, target: SPAWN_FEATURES[spawn.name].eHarvesters.target, home: SPAWN_FEATURES[spawn.name].eHarvesters.home, s: SPAWN_FEATURES[spawn.name].eHarvesters.s}});
            // }else if(labGuys.length < spawn.memory.minLabGuy){
            //     var creepRole = 'labGuy';
            //     let name = 'lab' + Math.floor(Math.random()*100);
            //     var body = this.createLorryBody(energy);
            //     var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, mineral: RESOURCE_UTRIUM, source: '627a2eeddb2bec40f121cf85', lab: '63854570af834e1b35e24a88'}});
            }else if(miners.length < spawn.memory.minMiners){
                var source = this.identifyContainersNearSources(spawn);
                var creepRole = 'miner';
                var name = 'm' + Math.floor(Math.random()*100);
                var body = this.createMinerBody(energy);
                if(source !== undefined){
                    var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, sourceId: source.id }});
                }
            }else if(lorries.length < spawn.memory.minLorries){
                var creepRole = 'lorry';
                var name = 'taxi' + Math.floor(Math.random()*100);
                var body = this.createLorryBody(energy);
                var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
            // }else if(depHarvesters.length < spawn.memory.minDH){
            //     var creepRole = 'depHarvester';
            //     let name = 'depH' + Math.floor(Math.random()*100);
            //     var target = 'W20S11';
            //     var body = this.createCreepBody(energy);
                // var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, target: target, home: spawn.room.name}});
            // }else if(eBuilders.length < spawn.memory.minEBuilders){
            //     var creepRole = 'eBuilder';
            //     var name = 'eb' + Math.floor(Math.random()*100);
            //     var body = this.createCreepBody(energy);
            //     if(spawn.name == 'mandarina'){
            //         var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, targets: ['E12N19', 'E11N19', 'E11N18']}});
            //     }else {
            //         var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, targets: ['E14N21', 'E13N21', 'E12N21', 'E11N21', 'E11N20', 'E11N19', 'E11N18']}});
            //     }
            }else if(upgraders.length < spawn.memory.minUpgraders){
                var creepRole = 'upgrader';
                var name = 'u' + Math.floor(Math.random()*100);
                var body = this.createCreepBody(energy);
                var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
            }else if(builders.length < spawn.memory.minBuilders && constructionSites.length > 0){
                var creepRole = 'builder';
                var name = 'b' + Math.floor(Math.random()*100);
                var body = this.createCreepBody(energy);
                var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
            }else if(extractors.length < spawn.memory.minExtractors && mineral && mineral.mineralAmount > 0){
                var name = 'ex' + Math.floor(Math.random()*100)
                var creepRole = 'extractor';
                var body = this.createExtractorBody(energy);
                var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, mineralId: mineral.id }});
            }else if(towerManagers.length < spawn.memory.minTowerMan){
                var creepRole = 'towerManager';
                var name = 'to' + Math.floor(Math.random()*100);
                var body = this.createCreepBody(energy);
                var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
            }else if(repairers.length < spawn.memory.minRepairers){
                var creepRole = 'repairer';
                var name = 'r' + Math.floor(Math.random()*100);
                var body = this.createCreepBody(energy);
                var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
            // }else if(terManagers.length < spawn.memory.minTerminalM){
            //     var name = 'terM' + Math.floor(Math.random()*100);
            //     var creepRole = 'terManager';
            //     var body = this.createCreepBody(energy);
            //     var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
            }else if(rampartRepairers.length < spawn.memory.minRamR){
                var creepRole = 'rampartRepairer';
                var name = 'ramR' + Math.floor(Math.random()*100);
                var body = this.createCreepBody(energy);
                var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
            }else if(wallRepairers.length < spawn.memory.minWallR){
                var creepRole = 'wallRepairer';
                let name = 'wr' + Math.floor(Math.random()*100);
                var body = this.createCreepBody(energy);
                var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}});
            }
            // else {
            //     var creepRole = 'eBuilder';
            //     var name = 'eb' + Math.floor(Math.random()*100);
            //     var body = this.createCreepBody(energy);
            //     if(spawn.name == 'mandarina'){
            //         var s = spawn.spawnCreep(body, name, {memory: {role: creepRole, targets: ['E13N19', 'E13N20', 'E14N20', 'E14N21', 'E15N21']}});
            //     }
            // }
            // }else {
            //     var creepRole = 'guardian';
            //     let name = 'gr' + Math.floor(Math.random()*100);
            //     var body = this.createGuardianBody(energyAvaible);
            //     var s = spawn.spawnCreep(body, name, {memory: {role: creepRole}}); 
            // }
        // }
        
        if(s == OK){
            console.log(spawn + ' is spawning a new ' + creepRole);
        }else {
            // console.warn('spawn getting: ' + s);
        }
        
        if(spawn.spawning){
            spawn.room.visual.text('⚙ ︎'+creepRole, spawn.pos.x+1, spawn.pos.y, {align: 'left', opacity: 0.8, color: '#dcfbff'});
        }
        
        // console.log(mineral)
        
    },
    createCreepBody: function(energyInRoom){
        let numberOfParts = Math.floor(energyInRoom/200);
        numberOfParts = Math.min(numberOfParts, Math.floor(35/3));
        let body = [];
        for(let i=0; i<numberOfParts; i++){
            body.push(WORK, CARRY, MOVE);
        }
        return body;
    },
    createMinerBody: function(energy){
        var numOfParts = Math.floor(energy / 100);
        //Make sure the miner doesn't have more than 10 work parts
        numOfParts = Math.min(numOfParts, Math.floor(14 / 2));
        var body = [];
        for(let i=0; i<numOfParts; i++){
            body.push(WORK);
        }
        for(let i=0; i<1; i++){
            body.push(MOVE);
        }
        return body;
    },
    createLorryBody: function(energy){
        var numOfParts = Math.floor(energy / 100);
        numOfParts = Math.min(numOfParts, Math.floor(40 / 2));
        var body = [];
        for(let i=0; i<numOfParts; i++){
            body.push(CARRY, MOVE);
        }
        return body;
    },
    createClaimerBody: function(energy){
        // let numberOfParts = Math.floor(energy/650);
        //Make sure the claimer doesn't have more than 5 claim parts
        // numberOfParts = Math.min(numberOfParts, Math.floor(10/2));
        let body = [];
        for(let i=0; i<1; i++){
            body.push(CLAIM);
        }
        for(let i=0; i<2; i++){
            body.push(MOVE);
        }
        return body;
    },
    createExtractorBody: function(energy){
        let numberOfParts = Math.floor(energy/150);
        numberOfParts = Math.min(numberOfParts, 15);
        let body = [];
        for(let i=0; i<numberOfParts; i++){
            body.push(WORK);
        }
        body.push(MOVE, MOVE, MOVE);
        return body;
    },
    createGuardianBody: function(energy){
        let numberOfParts = Math.floor(energy/290);
        numberOfParts = Math.min(numberOfParts, Math.floor(50/4));
        let body = [];
        for(let i=0; i<numberOfParts; i++){
            body.push(TOUGH, MOVE, ATTACK, RANGED_ATTACK);
        }
        return body;
    },
    identifyContainersNearSources: function(spawn){
        let sources = spawn.room.find(FIND_SOURCES);
        let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
        for (let i in sources) {
            let source = sources[i];
            if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                if(containers.length > 0) {
                    return source;
                    break;
                }
                if(containers == undefined){
                    return null;
                    break;
                }
            }
        }
    },
    identifyContainersNearMinerals: function(spawn){
        let mineral = spawn.room.find(FIND_MINERALS)[0];
        let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
        if(!_.some(creepsInRoom, c => c.memory.role == 'extractor' && c.memory.mineralId == mineral.id)) {
            let containers = mineral.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });
            if(containers.length > 0) {
                return mineral;
            }
            if(containers == undefined){
                return null;
            }
        }
    },
    identifyNearRoomsToHarvest: function(spawn){
        let flags = Game.flags;
        let roomsArray = [];
        for(let i in flags){
            let flag = flags[i];
            if(flag.color == COLOR_YELLOW){
                roomsArray.push(flag.pos.roomName);
            }
        }
        for (let i in roomsArray) {
            let room = roomsArray[i];
            if (!_.some(Game.creeps, c => c.memory.role == 'exteriorHarvester' && c.memory.target == room)){
                var target = room;
                break;
            }
        }
        return target;
    }
    // identifySourcesInRoom: function(ROOM_NAME){
    //     let sourcesInRoom = Game.rooms[ROOM_NAME].find(FIND_SOURCES);
    //     let target;
    //     for (let i in sourcesInRoom) {
    //         let source = sourcesInRoom[i];
    //         if (!_.some(Game.creeps, c => c.memory.role == 'exteriorHarvester' && c.memory.sourceId == source.id)){
    //             target = source.id;
    //             break;
    //         }
    //     }
    //     return target;
    // }
};
// profiler.wrapMethods('prototype.spawn', spawner);
module.exports = spawner;
