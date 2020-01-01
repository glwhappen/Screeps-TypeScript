export class Mem {
    static memory:any; // 当前的Memory内容
    static refresh() {
        Mem.end();
        Mem.start();
    }
    /**
     * 开始修改Memory,任何进行memory的操作，都需要调用，并且要及时结束。
     */
    static start() {
        Mem.memory = JSON.parse(RawMemory.get());
        let config = RawMemory.segments['config'];
        console.log('config',config);
     }
    /**
     * 保存Memory的修改
     */
    static end() {
        RawMemory.set(JSON.stringify(Mem.memory));
    }
}