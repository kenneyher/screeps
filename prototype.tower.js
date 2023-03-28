// var profiler = require('profiler');
const tower = {
    play: function() 
    {
        var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
        for (let i = 0; i < towers.length; i++)
        {
            this.run(towers[i]);
        }
    },
    run: function(tower)
    {
        var enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemy && enemy.owner.username != ('orangecatboy')){
            tower.attack(enemy);
        }
        else if (tower.energy >= 400 && !enemy)
        {
            var priority = 1;
            var targets = [];
            while (targets.length == 0 && priority <= 3)
            {
                var targets = this.getRepairTargets(tower, priority);
                var target = targets[0];
                if (target) {
                    tower.repair(target);
                }
                priority++;
            }
        }
    },
    getRepairTargets: function(tower, priority)
    {
        switch (priority)
        {
            case 1: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && s.hitsMax - s.hits >= 1500);
            case 2: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_RAMPART && s.hits < 300000);
            case 3: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_WALL && s.hits < 100000);
            default: return null;
        }
    }
};
// profiler.wrapMethods('prototype.tower', tower);
module.exports = tower;
