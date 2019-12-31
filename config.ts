import {MyCreep} from './creep'

export class Config { // 游戏所有的配置
    time:number = 0;
    public creep = new MyCreep;
    /**
     * 随着时间更新所有数据
     * @param time 游戏时间
     */
    public update(time:number) {
        console.log(`更新游戏配置${this.time}`);
        this.time++;
        this.creep.update(time);
    }
}
