/**
 * 可视化管理类
 * 包含所有可视化相关的内容。
 */
export class Visual {
    // 孵化器孵化可视化
    static spawning() {
        let spawn = Game.spawns['Spawn1'];
        if(spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory['role'],
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }

    }
    static update() {
        Visual.spawning();
    }
}