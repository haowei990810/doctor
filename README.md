# 蜱护 · TickGuard

> 蜱虫叮咬后的**症状自查 · 科学处理 · 疾病百科 · 预防指南**移动端 H5 工具。

被蜱虫叮咬后，应尽快用镊子稳定移除，不要火烧、涂油或挤压虫体。本项目面向普通用户，提供叮咬后的行动提示，帮助正确移除蜱虫、识别需要就医或急诊的信号。

> ⚠️ 本站为健康科普信息，主要依据中国疾控中心、国家疾控局和 CDC 的公开指南整理，**不计算患病概率，不能排除疾病或替代专业医疗诊断**。出现发热、扩大皮疹等请尽快就医；呼吸困难、意识改变等急症请拨打 120。

## 功能模块

- **首页**：应急三步走直给、功能导航、常见蜱媒疾病速览、蜱虫小知识。
- **症状自查**：按明确规则给出行动分级（继续观察 / 尽快就医 / 急诊），不展示未经验证的“风险百分比”；仅急症信号直达 120。
- **正确处理**：六步科学移除时间线、禁止操作清单、就医指征。
- **疾病百科**：六大蜱媒疾病（SFTS、莱姆病、森林脑炎、巴贝斯虫病、蜱传回归热、蜱麻痹）分级科普与详情。
- **预防指南**：四步防护、回家重点自检部位、出行装备清单。

## 医疗内容依据

- [中国疾控中心：发热伴血小板减少综合征防控知识问答（2026）](https://www.chinacdc.cn/jkkp/crb/ycr/202603/t20260325_315906.html)
- [中国疾控中心：2024 年初夏健康防护提示](https://www.chinacdc.cn/jkkp/ggws/ydjk/202408/t20240825_295559.html)
- [CDC：What to Do After a Tick Bite](https://www.cdc.gov/ticks/after-a-tick-bite/index.html)
- [CDC：Signs and Symptoms of Untreated Lyme Disease](https://www.cdc.gov/lyme/signs-symptoms/index.html)
- [CDC：Preventing Tick Bites](https://www.cdc.gov/ticks/prevention/index.html)
- [WHO：Tick-borne encephalitis](https://www.who.int/health-topics/tick-borne-encephalitis)
- [CDC：Clinical Overview of Babesiosis](https://www.cdc.gov/babesiosis/hcp/clinical-overview/)
- [CDC：About Soft Tick Relapsing Fever](https://www.cdc.gov/relapsing-fever/about/about-strf.html)
- [CDC：About Ticks and Tickborne Disease](https://www.cdc.gov/ticks/about/index.html)

## 技术栈

- [Vue 3](https://vuejs.org/)（`<script setup>`）
- [Vue Router 4](https://router.vuejs.org/)（Hash 路由）
- [Vant 4](https://vant-ui.github.io/vant/)（按需自动引入，轻量化）
- [Vite 6](https://vitejs.dev/) 构建
- `postcss-px-to-viewport` 以 375 设计稿为基准转 `vw`，适配多机型分辨率

## 本地开发

```bash
# 安装依赖（推荐 pnpm）
pnpm install

# 启动开发服务器
pnpm dev

# 生产构建
pnpm build

# 本地预览构建产物
pnpm preview
```

## 目录结构

```
src/
├── views/          # 页面：首页 / 自查 / 处理 / 百科 / 详情 / 预防
├── components/      # 通用组件（AppHeader 等）
├── data/           # knowledge.js —— 症状、疾病、处理、预防等知识库（单一数据源）
├── router/         # 路由配置
└── styles/         # 主题变量与全局样式
```

所有科普内容集中在 [`src/data/knowledge.js`](src/data/knowledge.js)，便于统一维护与校对。
