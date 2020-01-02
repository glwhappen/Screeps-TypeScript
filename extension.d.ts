declare global {  
    interface Creep {  
        say3(msg:string): void;  
        
        /**
         * 检测周围是否有工地
         */
        checkBuild():boolean;
        // 建造
        toBuild();
        // 检测周围是否有需要修理的结构
        checkRepair();
        // 修理
        toRepair();
        // 检测Spawn中的能量
        checkSpawnEnergy();
        // 填充所有 spawn 和 extension
        fillSpawnEnergy();
        // 检测塔中的能量
        checkTowerEnergy();
        // 向塔中添加能量
        fillTowerEnergy();
        // 检查矿石中的能量
        checkSourceEnergy();
        // 从矿石获取能量
        getSourceEnergy();
        /**
         * 检查挨着矿物的container中的能量
         * @param {当前是判断能否获取吗，默认为否}} get 
         */
        checkCloseSourceContainerEnergy(get);

        /**
         * 检查挨着controller的container中的能量
         * @param {当前是判断能否获取吗，默认为否}} get 
         */
        checkCloseControllerContainerEnergy(get);

        // 填充container
        fillContainerEnergy();
        
        // 从container中获取能量
        getContainerEnergy();
    }
}  
export {}; 