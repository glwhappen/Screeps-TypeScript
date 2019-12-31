import {MyCreep} from './creep'

/**
 * 游戏所有的配置
 */
export class Config {
    public creep = new MyCreep;
    /**
     * 随着时间更新所有数据
     */
    public update() {
        this.creep.update();
    }
}
