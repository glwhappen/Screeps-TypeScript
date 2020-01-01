export class Tools {
    /**
     * 将一个对象中存在的属性和方法，覆盖另一个对象的属性和方法
     * @param copyFrom 要复制的对象
     * @param copyTo 目标对象
     */
    copyObjWhenKeyEqual(copyFrom: Object, copyTo: Object): void {
        const keysTo = Object.keys(copyFrom);
        if(keysTo[0] == '0') {
            return ;
        }
        for (const key of keysTo) {
            if(copyFrom[key] !== undefined) {
                this. copyObjWhenKeyEqual(copyFrom[key], copyTo[key]);
                if(typeof copyTo[key] != 'object') {
                    if(copyTo[key] == undefined) continue;
                    // console.log("copy",typeof copyTo[key], typeof copyFrom[key] )
                    copyTo[key] = copyFrom[key];
                }
            }
        }
    }
}