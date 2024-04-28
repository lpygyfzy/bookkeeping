const path = require('path')

module.exports = {
    //webpack配置
    webpack: {
        //配置别名
        alias: {
            //约定使用@表示src的文件路径
            '@': path.resolve(__dirname,'src')
        }
    }
}