class RoleBody {
    work?:number = 0;
    move?:number = 0;
    carry?:number = 0;
}

class Role {
    id:number = 0; // 当前角色编号
    max:number = 0; // 角色的最大数量
    now:number = 0; // 角色的当前数量
    body = new RoleBody; // 角色的身体形状
    role:string; // 角色类型
    cost:number; // 当前角色的价值
    spawnSpeed:number = 10; // 检测数量的速度控制
    update() {
        this.updateLow();
        
    }
    private updateLow():void {
        if(Game.time % this.spawnSpeed == 0) { // 缓慢检测数量
            this.now = _.filter(Game.creeps, (creep) => creep.memory['role'] == this.role).length;
            this.spawn();
        }
    }
    private spawn() { // 孵化一个角色
        if(this.now < this.max) { // 数量太少，孵化一个角色
            console.log(`time:${Game.time}孵化${this.role},当前编号${this.id},now:${this.now}`);
            if(Game.spawns['Spawn1'].spawning) return ;
            let ret = Game.spawns['Spawn1'].spawnCreep(this.getBodyList(), this.role + "_" + this.id.toString(), {memory: {
                "role": this.role, 
                //value: getCnt(need), 
                beginTime: Game.time,
                "body" : this.body,
                id : this.id
            }});
            if(ret == 0) {
                this.id++;
                this.now++;
            } else {
                console.log('孵化失败',ret,this.getBodyList());
            }
        }
    }
    setBody(body:RoleBody) {
        this.body = body;
    }
    getBodyList():BodyPartConstant[] {
        let bodyList:BodyPartConstant[] = [];
        let keys = Object.keys(this.body);
        let values = Object.values(this.body);
        for(let key in keys) {
            for(let i = 0; i < values[key]; i++) {
                bodyList.push(<BodyPartConstant>keys[key]);
            }
        }
        return bodyList;
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
    /**
     * 更新角色的数据
     * @param time 游戏时间
     */
    public update() {
        this.harvester.update();

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
        }
    }
}