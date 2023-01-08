const path=require('path')
// 1 导入插件，得到构造函数
const HtmlPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
// 2 创建插件的实例对象
const htmlPlugin=new HtmlPlugin({
    template:'./src/index.html',
    filename:'./index.html'
})
const cleanPlugin=new CleanWebpackPlugin()
module.exports={
    mode:'development',
    //当产生错误时，具体行数能够正确对应，能够找到源代码，不安全
    // devtool:'eval-source-map',
    //能够定位到行数，但不能找到源代码，具有安全性
    devtool:'nosources-source-map',
    //指定打包的入口
    entry:path.join(__dirname,'./src/index.js'),
    //指定打包的出口
    output:{
        //表示输出文件的存放路径
        path:path.join(__dirname,'./dist'),
        //表示输出文件的名称
        filename:'js/bundle.js'
    },
    // 3 挂载
    plugins:[htmlPlugin,cleanPlugin],
    //自动打开
    devServer:{
        open:true,
        host:'127.0.0.1',
        port:80
    },
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            //只有小于或等于limit大小的图片，才会被转为base64格式的图片
            // {test:/\.jpg|png|gif$/,use:'url-loader?limit=44529'}
            {test:/\.jpg|png|gif$/,use:{
                loader:'url-loader',
                options:{
                    limit:44529,
                    outputPath:'image'
                }
            }},
            {
                test:/\.js$/,
                // 排除
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        plugins:['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }
}