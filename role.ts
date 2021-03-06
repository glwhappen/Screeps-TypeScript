class RoleBody {
    work?:number = 0;
    move?:number = 0; // 移动
    carry?:number = 0;
    attack?:number = 0;
    ranged_attack?:number = 0;
    heal?:number = 0;
    tough?:number = 0;
    claim?:number = 0;
}

export class Role {
    id:number = 0; // 当前角色编号
    max:number = 0; // 角色的最大数量
    now:number = 0; // 角色的当前数量
    body:RoleBody; // 角色的身体形状
    role:string; // 角色类型
    cost:number; // 当前角色的价值
    spawnSpeed:number = 10; // 检测数量的速度控制
    creeps:Creep[];
    updateOnceFlag = true;
    /**
     * creep工作方式
     */
    work(creep:Creep){}
    update() {
        if(this.updateOnceFlag) {
            this.updateOnce();
            this.updateOnceFlag = false;
        }
        this.updateLow();
        // if(this.creeps) {
        //     for(let creep of this.creeps) {
        //         if(!creep) continue;
        //         this.work(creep);
        //     }
            
        // }
    }
    private updateOnce() {
        this.body = new RoleBody; // 角色的身体形状
    }
    private updateLow():void {
        if(Game.time % this.spawnSpeed == 0) { // 缓慢检测数量
            this.creeps =  _.filter(Game.creeps, (creep) => creep.memory['role'] == this.role);
            this.now = this.creeps.length;
            this.spawn();
        }
    }
    private spawn() { // 孵化一个角色
        if(this.now < this.max) { // 数量太少，孵化一个角色
            // console.log(`time:${Game.time}孵化${this.role},当前编号${this.id},now:${this.now}`);
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
                //console.log('孵化失败',ret,this.getBodyList());
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