import {Config} from './config'
import {Tools} from './tools'

/**
 * 全局变量
 */
export class Global {
    static updateOnceFlag:boolean = true; // 加载配置标记
    static config:Config; // 所有的配置
    static memory:any; // 当前的Memory内容
    static time:number; // 当前的游戏时钟 = Game.time

    /**
     * 刷新全局变量
     * @param time 游戏时钟Game.time
     */
    static update(time:number) {
        if(Global.updateOnceFlag) {
            console.log("初始化全局变量")
            Global.updateOnce();
            Global.updateOnceFlag = false;
        }
        Global.memory['config'] = Global.config; // 刷新Memory中的config
        Global.config.update(); // 更新配置config
        Global.time = time;
    }
    static updateOnce() {
        Global.config = new Config; // 创建config对象，并获取地址
        // 如果游戏的Memory中有config，那么用游戏中的把现在创建的存在的key覆盖。
        if(Global.memory['config'] != undefined) {
            (new Tools).copyObjWhenKeyEqual(Global.memory['config'], Global.config);
        }
    }
    /**
     * 开始修改Memory
     */
    static start() {
        Global.memory = JSON.parse(RawMemory.get());
     }
    /**
     * 保存Memory的修改
     */
    static end() {
        RawMemory.set(JSON.stringify(Global.memory));
    }
}