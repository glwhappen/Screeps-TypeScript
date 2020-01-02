import {MyCreep} from './creep'

/**
 * 游戏所有的配置
 * 会将所有的属性存到Memory中
 */
export class Config {
    public creep = new MyCreep;
    /**
     * 随着时间更新所有数据
     */
    public update() {
        this.creep.harvester.body = {work:1, move:1, carry:1};
        this.creep.harvester.max = 1;
        this.creep.upgrader.body = {work:1, move:2, carry:2};
        this.creep.upgrader.max = 2;
        //Prototype.update();
        this.creep.update();
    }
}
