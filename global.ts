import {Config} from './config'
/**
 * 将一个对象中存在的属性和方法，覆盖另一个对象
 * @param copyFrom 要复制的对象
 * @param copyTo 目标对象
 */
function copyObjWhenKeyEqual(copyFrom: Object, copyTo: Object): void {
    const keysTo = Object.keys(copyFrom);
    //console.log("keysToLength:",keysTo.length);
    //console.log("keysTo", keysTo);
    if(keysTo[0] == '0') {
        return ;
    }
    for (const key of keysTo) {
        //console.log(key);
        if(copyFrom[key] !== undefined) {
            copyObjWhenKeyEqual(copyFrom[key], copyTo[key]);
            if(typeof copyTo[key] != 'object') {
                copyTo[key] = copyFrom[key];
                //console.log("copy",typeof copyTo[key], typeof copyFrom[key] )
            }
        }
        
        //     if (copyFrom[key] !== undefined) {
    //         copyTo[key] = copyFrom[key];
    //     }
     }
    //return copyTo;
}

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
        // Global.config = Global.memory['config'];
        Global.config = new Config; // 创建config对象，并获取地址
        console.log('创建',Global.config);
        // 这里有一个很严重的问题，就是会把所有的配置文件的内容清空
        copyObjWhenKeyEqual(Global.memory['config'], Global.config);
        
        // console.log('复制');

        //Global.config.creep = Global.memory['config'].creep;

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