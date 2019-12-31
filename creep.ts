class RoleBody {
    work?:number = 0;
    move?:number = 0;
}

class Role {
    max:number = 0; // 角色的最大数量
    now:number = 0; // 角色的当前数量
    body = new RoleBody; // 角色的身体形状
    spawn() { // 孵化一个角色
        if(this.now < this.max) { // 数量太少，孵化一个角色
            console.log(`孵化`);
        }
    }
}
export class MyCreep {
    harvester = new Role;
    builder = new Role;
    private updateOneFlag = true;
    private spawnAll() { // 调用所有角色的spawn
        this.harvester.spawn();
        this.builder.spawn();
    }
    /**
     * 更新角色的数据
     * @param time 游戏时间
     */
    public update(time:number) {
        
        this.updateLow(time);
        if(this.updateOneFlag) {
            this.updateOne();
            this.updateOneFlag = false;
        }
    }
    /**
     * 只需要加载一次的数据
     */
    private updateOne() {

    }
    /**
     * 根据游戏时间取模一个值，来缓慢更新一些不是太即时的数据。
     * @param time 
     */
    private updateLow(time:number):void {
        if(time % 5) { // 缓慢检测数量
            this.spawnAll();
        }
    }
}