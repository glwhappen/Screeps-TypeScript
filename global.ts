import {Config} from './config'
import {Tools} from './tools'

/**
 * 全局变量
 */
export class Global {
    static updateOnceFlag:boolean = true; // 加载配置标记
    static config:Config; // 所有的配置
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
        this.updateSlow();
        
        //Mem.start();
        //Mem.memory['config'] = Global.config; // 刷新Memory中的config
        Memory['config'] = Global.config;
        Global.config.update(); // 更新配置config
        //Mem.end();
        Global.time = time;
    }
    static updateOnce() {
        Global.config = new Config; // 创建config对象，并获取地址
        // 如果游戏的Memory中有config，那么用游戏中的把现在创建的存在的key覆盖。
        //Mem.start();
        if(Memory['config'] != undefined) {
            (new Tools).copyObjWhenKeyEqual(Memory['config'], Global.config);
        }
        //Mem.end();
    }
    static updateSlow() {
        if(Game.time % 5 == 0) {
            Tools.cleanCreepsMemory();
        }
    }
}