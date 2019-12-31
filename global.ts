import {Config} from './config'

export class Global {
    static configFlag:boolean = true;
    static config:Config;
    static memory;
    static start() {
       Global.memory = JSON.parse(RawMemory.get());
    }
    static end() {
        RawMemory.set(JSON.stringify(Global.memory));
    }
}