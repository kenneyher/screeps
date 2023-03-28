let guardian = {
    run: function(creep){
        let invader = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        let targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3)
        if(invader){
            creep.say('⚔️🛡️');
            let e = creep.attack(invader);
            if(e == ERR_NOT_IN_RANGE){
                creep.moveTo(invader, {visualizePathStyle: {stroke: '#e54b4a', opacity: 0.7, lineStyle: 'dotted'}});
            }
            if(creep.rangedAttack(invader) == ERR_NOT_IN_RANGE){
                creep.moveTo(invader, {visualizePathStyle: {stroke: '#e54b4a', opacity: 0.7, lineStyle: 'dotted'}});
            }
            if(targets.length > 0){
                creep.rangedMassAttack();
            }
        }else {
            creep.say("💤");
        }
    },
};
module.exports = guardian;
