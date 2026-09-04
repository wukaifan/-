# 吴凯帆 · 视觉 / AI / 电商设计师 作品集

一个暗色、克制、带科技感的个人作品集网站，基于 **React + Vite** 搭建，主要为 PC 端展示（版心约 1700px）。

## 运行

```bash
npm install
npm run dev      # 本地预览，默认 http://localhost:5173
npm run build    # 生产构建，输出到 dist/
npm run preview  # 预览构建产物
```

## 页面结构

| 板块 | 锚点 | 说明 |
| --- | --- | --- |
| 首页 Hero | `#home` | 全屏，视频/动态背景 + 大标题 + 导航 + 联系按钮 + 作品翻滚轮播 |
| 关于我 | `#about` | 人像、介绍、联系方式、教育经历、项目数据、从业经历 |
| 精选项目 | `#work` | 大卡片展示作品 |
| 我的优势 | `#skills` | 能力卡片 + 常用工具 |
| 联系我们 | `#contact` | 整屏收尾页 + 页脚 |

## 修改内容

所有文案、经历、项目、能力数据都集中在 **`src/data/portfolio.js`**，改动它即可更新站点内容。

### 换头像
当前头像已从简历中裁剪出，位于 `src/assets/portrait.jpg`。直接替换同名文件即可（建议竖版人像图）。暗色调滤镜在 `global.css` 的 `.portrait-card img` 中，如需真人彩照可去掉 `filter`。

### 加真实视频背景
把 mp4 放到 **`public/videos/ambient.mp4`**，站点会自动用作 Hero / 联系页的视频背景（自动循环、暗化处理）。不提供时使用内置的动态渐变 + 颗粒，同样有“类视频”的动态效果。

### 放作品截图
把作品图放进 `src/assets/`，在 `src/data/portfolio.js` 的 `projects` 里给对应条目加 `cover.src` 即可替换当前的渐变封面。

### 作品轮播（Tumble Carousel）
轮播嵌在首页 Hero 里（`src/components/Hero.jsx`），卡片正片在 `src/assets/work/case-01..10.jpg`，复用通用组件 `src/components/TumbleCarousel.jsx`。当前是一个**忠实复刻** React Bits Pro `tumble-carousel-css` 的本地实现（纯 CSS + React，贴合作品集设计 token），支持自动播放、循环、拖拽、键盘与进度计数。

> 若要用 React Bits Pro **官方包**：需先在 `.env.local` 配置 `REACTBITS_LICENSE_KEY=你的许可证`，再把文档里 `components.json` 的 registry URL 补进本项目的 `components.json`（里面已按官方格式写好 `authorization: "Bearer ${REACTBITS_LICENSE_KEY}"` 占位），然后运行 `npx shadcn@latest add @reactbits-starter/tumble-carousel-css` 替换本地实现。注意本机当前未设置该环境变量，且 registry 需要授权。

## 目录

```
src/
  components/   页面组件（Hero / About / Projects / Strengths / Contact 等）
  data/         站点内容数据
  hooks/        滚动渐显
  styles/       全局样式与设计系统
  assets/       头像、作品图等素材
```
