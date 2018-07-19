module.exports = {
    run: function(tower){
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        var repairTargets = tower.pos.findInRange(FIND_STRUCTURES, 30, {
            filter: function(structure){
                if(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART){
                    return (structure.hits < 50000)
                }else{
                    return (structure.hits < structure.hitsMax)
                }
            }
        });
        if(closestHostile != undefined) {
            tower.attack(closestHostile);
        }
        else if(repairTargets != undefined){

            if(repairTargets.length){
                repairTargets.sort(function(a, b){
                    return a.hits - b.hits
                })
    
                tower.repair(repairTargets[0])
            }
        }
    }
}