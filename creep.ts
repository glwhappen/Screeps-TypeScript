class RoleBody {
    work?:number = 0;
    move?:number = 0;
}

class Role {
    id:number = 0; // 当前角色编号
    max:number = 0; // 角色的最大数量
    now:number = 0; // 角色的当前数量
    body = new RoleBody; // 角色的身体形状
    role:string; // 角色类型
    spawn() { // 孵化一个角色
        if(this.now < this.max) { // 数量太少，孵化一个角色
            console.log(`time:${Game.time}孵化${this.role},当前编号${this.id}`);
            this.id++;
            this.now++;
        }
    }
}
class Harvester extends Role {
    role = 'harvester';
}
/**
 * 管理所有的creep角色
 */
export class MyCreep {
    harvester = new Harvester;
    private updateOneFlag = true;
    private spawnAll() { // 调用所有角色的spawn
        this.harvester.spawn();
    }
    /**
     * 更新角色的数据
     * @param time 游戏时间
     */
    public update() {
        
        this.updateLow();
        if(this.updateOneFlag) {
            this.updateOnce();
            this.updateOneFlag = false;
        }
    }
    /**
     * 只需要加载一次的数据
     */
    private updateOnce() {

    }
    /**
     * 根据游戏时间取模一个值，来缓慢更新一些不是太即时的数据。
     */
    private updateLow():void {
        if(Game.time % 5) { // 缓慢检测数量
            this.spawnAll();
        }
    }
}