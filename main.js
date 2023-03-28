var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var repairer = require('role.repairer');
var wallRepairer = require('role.wallRepairer');
var mySpawns = require('prototype.spawn');
var walker = require('role.walker');
var towerManager = require('role.towerManager');
var miner = require('role.miner');
var lorry = require('role.lorry');
var ramRepairer = require('role.rampartRepairer');
var carrier = require('role.carrier');
var exteriorHarvester = require('role.exteriorHarvester');
var eBuilder = require('role.exteriorBuilder');
var depHar = require('role.depositHarvester');
var extractor = require('role.extractor');
var terManager = require('role.terminalManager');
var myTerminals = require('prototype.terminal');
var myTowers = require('prototype.tower')
var myFactories = require('prototype.factory');
var claimer = require('role.claimer')
var signer = require('role.signer')
var attacker = require('role.attacker')
var downgrader = require('role.downgrader')
var guardian = require('role.guardian')
var healer = require('role.healer')
var transferor = require('role.transferor');
var labGuy = require('role.labGuy');
// var profiler = require('profiler');

const mainFunction = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Game.spawns.Bannana.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], 'trns_2', {memory: {role: 'transferor', pointA: '60b27c1234b6e15c4e3f35a9', pointB: '60b0203cd45963535c343818', resource: RESOURCE_OXYGEN}}) 
    
    var lab1 = Game.getObjectById('63854570af834e1b35e24a88');
    var lab2 = Game.getObjectById('62970e95134ab66c964ce8fa');
    var lab3 = Game.getObjectById('62989673cf93b944b5cdfc50');
    // var lab4 = Game.getObjectById('60c0b07089d41b8a2cb82092');
    // var lab5 = Game.getObjectById('60e6d81554e7e781335a798d');
    // var lab6 = Game.getObjectById('60e4da18e2379833e15a29c8');
    
    if(lab3.store.getUsedCapacity(RESOURCE_UTRIUM_OXIDE) < 3000){
        lab3.runReaction(lab1, lab2);
    }
    
    mySpawns.play();
    // myTerminals.play();
    myTowers.play();
    // myFactories.play();

    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            harvester.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
            upgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            builder.run(creep);
        }
        if(creep.memory.role == 'repairer'){
            repairer.run(creep);
        }
        if(creep.memory.role == 'walker'){
            walker.run(creep);
        }
        if(creep.memory.role == 'wallRepairer'){
            wallRepairer.run(creep);
        }
        if(creep.memory.role == 'towerManager'){
            towerManager.run(creep);
        }
        if(creep.memory.role == 'miner'){
            miner.run(creep);
        }
        if(creep.memory.role == 'lorry'){
            lorry.run(creep);
        }
        if(creep.memory.role == 'rampartRepairer'){
            ramRepairer.run(creep);
        }
        if(creep.memory.role == 'carrier'){
            carrier.run(creep);
        }
        if(creep.memory.role == 'eHarvester'){
            exteriorHarvester.run(creep);
        }
        if(creep.memory.role == 'depHarvester'){
            depHar.run(creep);
        }
        if(creep.memory.role == 'eBuilder'){
            eBuilder.run(creep);
        }
        if(creep.memory.role == 'extractor'){
            extractor.run(creep);
        }
        if(creep.memory.role == 'terManager'){
            terManager.run(creep);
        }
        if(creep.memory.role == 'claimer'){
            claimer.run(creep);
        }
        if(creep.memory.role == 'signer'){
            signer.run(creep);
        }
        if(creep.memory.role == 'attacker'){
            attacker.run(creep);
        }
        if(creep.memory.role == 'downgrader'){
            downgrader.run(creep);
        }
        if(creep.memory.role == 'guardian'){
            guardian.run(creep);
        }
        if(creep.memory.role == 'healer'){
            healer.run(creep);
        }
        if(creep.memory.role == 'transferor'){
            transferor.run(creep);
        }
        if(creep.memory.role == 'labGuy'){
            labGuy.run(creep);
        }
    }

    if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
        console.log('🎊' + ' +1 Pixel Generated!!');
    }
}
module.exports.loop = mainFunction();
// module.exports.loop = profiler.gameLoop(mainFunction);
