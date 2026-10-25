# Lichenzhen / Lith — 个人主页

一个手写的静态个人主页，把 `F:\web` 下的四个站点收进同一张「作品地图」：
LCZOJ、Lith Tools、LCZOJ 主页，以及 2024 年的 PHP 工具箱。

- 纯 HTML / CSS / JavaScript，无框架、无构建步骤、无外链字体或统计脚本
- 响应式布局，支持深色模式、键盘操作、`prefers-reduced-motion`
- 首屏数据与项目信息取自各仓库的真实说明，不使用占位数字
- 所有资源本地化，直接部署到任意静态服务器即可

## 预览

需要 Node.js 18+（不安装任何依赖）：

```bash
cd F:\web\personal-site
node serve.js
# 打开 http://127.0.0.1:8090/
```

也可以直接双击 `index.html` 查看；`serve.js` 只是为了避免 `file://` 下的路径差异。

自定义端口（Windows）：

```powershell
$env:PORT=9000; node serve.js
```

## 线上站点

| 站点 | 地址 |
| --- | --- |
| 个人主页（GitHub Pages） | <https://lichenzhen0713.github.io/personal-site/> |
| LCZOJ 在线评测系统 | <https://oj.lichenzhen.cn/> |
| OJ 主页 | <https://lichenzhen.cn/oj> |
| Lith Tools 在线工具箱 | <https://tools.lichenzhen.cn/> |

## 文件结构

```
personal-site/
├── index.html            页面内容（单页）
├── css/style.css         设计系统、布局、深色模式、响应式
├── js/main.js            主题切换、移动端菜单、滚动入场、导航高亮
├── assets/
│   ├── lczoj.webp        LCZOJ 首页截图
│   ├── lith-tools.webp   Lith Tools 首页截图
│   ├── og.png            1200×630 分享图
│   └── favicon.svg       站点图标
├── serve.js              零依赖本地预览服务器
└── README.md             本文件
```

## 页面结构

1. **首屏**：身份、主张、GitHub 入口，以及四个站点的索引卡
2. **数据条**：4 个站点 / 70 个工具 / 10 种评测语言 / 15 篇文档
3. **作品**：LCZOJ、Lith Tools 两个长项目，含截图、技术栈与真实指标
4. **站点总览**：四个站点的线上入口、定位、技术、年份与状态
5. **关于**：个人经历、三条产品原则、常用技术与设计信条
6. **现在**：正在做 / 正在磨 / 正在信
7. **联系**：GitHub、Gitee、LCZOJ 仓库

## 站点的原始资料

| 站点 | 本地目录 | 线上地址 | 定位 |
| --- | --- | --- | --- |
| LCZOJ | `F:\web\game` | <https://oj.lichenzhen.cn/> | 零第三方依赖的在线评测系统，v2.9.1，多语言判题、四类题型、三套赛制、OAuth 2.0、Docker 部署 |
| Lith Tools | `F:\web\lith-tools` | <https://tools.lichenzhen.cn/> | 70 个浏览器端工具 + 博客 / 论坛 / 管理后台，React 19 + Fastify 5 + SQLite，v2.0 |
| LCZOJ 主页 | `F:\web\oj-site` | <https://lichenzhen.cn/oj> | OJ 主页与 15 篇文档入口，纯静态、零外链资源 |
| Tools 1.0 | `F:\web\tools` | — | 2024 年的 PHP + MySQL 工具箱，Lith Tools 的起点，已归档 |

页面里还使用这些代码托管地址：

- `https://github.com/lichenzhen0713`
- `https://gitee.com/lichenzhen0713`
- `https://github.com/lichenzhen0713/LCZOJ`

Lith Tools 的源码暂未公开，但工具箱本身已上线，页面中提供了「打开工具箱」入口。

## 修改指南

### 改名字 / 身份

搜索 `index.html` 中的 `Lichenzhen`、`Lith`、`独立开发者`，在以下位置替换：

- `<title>` 与 meta description / Open Graph
- 首屏 `.eyebrow`
- 关于段落 `.about-copy`
- 页脚版权

### 改项目链接

线上地址集中在三个位置：首屏索引卡、作品按钮、站点总览表。搜索以下字符串即可定位并统一替换：

- `oj.lichenzhen.cn`
- `lichenzhen.cn/oj`
- `tools.lichenzhen.cn`

GitHub / Gitee 地址搜索 `github.com/lichenzhen0713` 即可。

### 换截图

直接覆盖 `assets/lczoj.webp`、`assets/lith-tools.webp`，保持 16:10 比例（建议 1400×875）。页面按 `object-fit: cover` 裁切。

### 加邮箱

出于隐私考虑，默认没有放邮箱。需要时在「联系」区复制一行 `.contact-link`：

```html
<a class="contact-link" href="mailto:you@example.com">
  <span class="contact-label">Email</span>
  <span class="contact-value">you@example.com</span>
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8"/></svg>
</a>
```

### 改域名

当前分享地址使用 GitHub Pages：

- 页面：<https://lichenzhen0713.github.io/personal-site/>
- 仓库：<https://github.com/lichenzhen0713/personal-site>

绑定自定义域名后，替换 `index.html` 中的以下位置：

- `<meta property="og:url">`
- `<meta property="og:image">` 与 `<meta name="twitter:image">`
- JSON-LD 中的 `url`
- `assets/og.png` 中的域名文字（可重新截图生成）

## 设计说明

- **配色**：暖纸色 `#f3f0e8` + 墨色 `#111418` + 克莱因蓝 `#1e46ff`，项目截图本身偏蓝紫，正好接得上
- **字体**：只用系统字体（Inter / 苹方 / 微软雅黑 / 思源黑体）与等宽字体，避免外链字体带来的首屏阻塞
- **版式**：12 栏的编辑式布局，大字号中文标题 + 等宽小标签；项目区左右交替，避免长页面单调
- **动效**：只做淡入上移、链接箭头和悬停抬升；尊重 `prefers-reduced-motion`
- **深色模式**：跟随系统首次进入，手动切换后写入 `localStorage`
- **无追踪**：没有分析脚本、Cookie、第三方请求

## 部署

### GitHub Pages（当前）

- 线上地址：<https://lichenzhen0713.github.io/personal-site/>
- 仓库地址：<https://github.com/lichenzhen0713/personal-site>
- 发布方式：`main` 分支根目录；根目录的 `.nojekyll` 关闭 Jekyll 处理

更新内容后执行：

```bash
git add .
git commit -m "Update personal site"
git push origin main
```

GitHub Pages 会自动重新构建，通常 1 分钟内生效。

### 其它静态托管

GitHub Pages / Netlify / Vercel / 对象存储都可以直接上传整个目录。

Nginx 示例：

```nginx
server {
    listen 80;
    server_name lichenzhen.cn;
    root /var/www/personal-site;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(webp|png|svg|css|js)$ {
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

生产环境建议加 HTTPS；本站没有后端，不需要 Node 进程常驻。

## 验证记录

- Chrome 320 / 390 / 768 / 1024 / 1440 五种宽度渲染，均无横向溢出
- 28 个滚动入场元素在滚动后全部显示
- 浅色 / 深色两套主题均截图检查；主题切换后刷新仍保留
- 移动端菜单可开合、Esc 关闭、点击导航后自动收起
- 图片全部加载，无控制台错误
