// 移动端适配：以 375 设计稿为基准转换为 vw，适配所有机型/分辨率
export default {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore-vw', '.no-vw'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      // Vant 组件库设计稿宽度为 375，保持一致
      exclude: [],
      landscape: false
    }
  }
}
