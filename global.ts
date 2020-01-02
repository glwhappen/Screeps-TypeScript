import {Config} from './memory-config'
import {Tools} from './tools'
import {Visual} from './visual'

/**
 * 全局功能调度
 */
export class Global {
    static updateOnceFlag:boolean = true; // 加载配置标记
    static config:Config; // 所有的配置

    /**
     * 刷新全局变量
     * @param time 游戏时钟Game.time
     */
    static update() {
        if(Global.updateOnceFlag) {
            console.log("初始化全局变量")
            Global.updateOnce();
            Global.updateOnceFlag = false;
        }
        Global.updateSlow();
        Memory['config'] = Global.config;
        Global.config.update(); // 更新配置config

        Visual.update();
    }
    // 外部不需要调用
    static updateOnce() {
        Global.config = new Config; // 创建config对象，并获取地址
        // 如果游戏的Memory中有config，那么用游戏中的把现在创建的存在的key覆盖。
        if(Memory['config'] != undefined) {
            (new Tools).copyObjWhenKeyEqual(Memory['config'], Global.config);
        }
    }
    // 外部不需要调用
    static updateSlow() {
        if(Game.time % 1500 == 0) {
            Tools.cleanCreepsMemory();
        }
    }
}