import postcssPxToViewport8 from 'postcss-px-to-viewport-8-plugin'

export default {
  plugins: [
    postcssPxToViewport8({
      unitToConvert: 'px', // 需要转换的单位，默认为 px
      viewportWidth: file => (file.includes('/node_modules/vant') ? 375 : 750), // UI设计稿的宽度
      unitPrecision: 6, // 单位转换后保留的精度
      propList: ['*'], // 可以从px转换成vw的css属性，'*'代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      minPixelValue: 1, // 最小转换数值，小于该值不进行单位转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', // 横屏时使用的单位
      landscapeWidth: 1134, // 横屏时使用的视口宽度
      include: [],
      exclude: [] // 设置忽略文件，用正则做目录名匹配
    })
  ]
}
