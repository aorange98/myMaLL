module.exports = {
    // 配置别名 自动找到这些文件
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'api': '@/api',
                'views': '@/views',
                'utils': '@/utils'
            }
        },
    },
    devServer: {
        proxy: {
            'myapi':{
                target: 'http://localhost:8592',
            }
        }
    },
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 16, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        unitPrecision: 2, // 转换成rem后保留的小数点位数
                        propList: ['*'], // 一个存储哪些将被转换的属性列表
                        // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        // exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        // selectorBlackList: [], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 12 // 意思是所有小于12px的样式都不被转换
                    }),
                ]
            }
        }
    },
    productionSourceMap:false,  // 去掉map文件

    // 网上配置
    // 设置代理是为了防止跨域的，但你上线后就没有跨域这个问题了，就应该在上线前吧代理去掉
    // devServer: {
    //     host: 'localhost',//target host
    //     port: 8080,
    //     //proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
    //     proxy: {
    //         '/api': {
    //             target: 'http://192.168.1.30:8085',//代理地址，这里设置的地址会代替axios中设置的baseURL
    //             changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
    //             //ws: true, // proxy websockets
    //             //pathRewrite方法重写url
    //             pathRewrite: {
    //                 '^/api': '/'
    //                 //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
    //                 //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
    //             }
    //         }
    //     }

    }


/*
    map文件的作用：有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。 
    项目打包后，代码都是经过压缩加密的，如果没有.map文件运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
*/