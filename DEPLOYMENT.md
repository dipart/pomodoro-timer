# 🚀 番茄时钟部署指南

本文档详细介绍如何将番茄时钟应用部署到线上，提供多种免费和付费的部署选项。

## 🎯 部署前准备

### 文件结构确认
确保您的项目包含以下文件：
```
pomodoro-timer/
├── index.html
├── style.css
├── script.js
├── README.md
└── DEPLOYMENT.md
```

### 本地测试
在部署前，请确保在本地浏览器中测试所有功能正常。

## 🆓 免费部署方案

### 1. GitHub Pages (推荐)

**优点**：完全免费、自动HTTPS、支持自定义域名
**缺点**：需要GitHub账号

#### 部署步骤：
1. **创建GitHub仓库**
   ```bash
   # 在项目根目录执行
   git init
   git add .
   git commit -m "Initial commit: Pomodoro Timer"
   ```

2. **推送到GitHub**
   - 在GitHub上创建新仓库 `pomodoro-timer`
   - 按照GitHub提示推送代码
   ```bash
   git remote add origin https://github.com/你的用户名/pomodoro-timer.git
   git branch -M main
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库设置 → Pages
   - Source选择 "Deploy from a branch"
   - Branch选择 "main"，文件夹选择 "/ (root)"
   - 点击Save

4. **访问网站**
   - 几分钟后访问：`https://你的用户名.github.io/pomodoro-timer/`

### 2. Netlify

**优点**：简单易用、自动部署、免费SSL
**缺点**：免费版有带宽限制

#### 部署方法A：拖拽部署
1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录账号
3. 将整个 `pomodoro-timer` 文件夹拖拽到部署区域
4. 获得类似 `https://随机名称.netlify.app` 的网址

#### 部署方法B：Git集成
1. 将代码推送到GitHub（参考上面步骤）
2. 在Netlify中连接GitHub仓库
3. 设置构建命令为空（静态网站无需构建）
4. 发布目录设置为根目录 `/`

### 3. Vercel

**优点**：性能优秀、全球CDN、免费SSL
**缺点**：免费版有使用限制

#### 部署步骤：
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择您的 `pomodoro-timer` 仓库
5. 保持默认设置，点击 "Deploy"

### 4. Firebase Hosting

**优点**：Google提供、高性能、免费SSL
**缺点**：需要配置Firebase CLI

#### 部署步骤：
1. 安装Firebase CLI
   ```bash
   npm install -g firebase-tools
   ```

2. 登录Firebase
   ```bash
   firebase login
   ```

3. 在项目目录初始化
   ```bash
   firebase init hosting
   ```

4. 配置选项：
   - 选择或创建Firebase项目
   - 设置public目录为当前目录 `.`
   - 配置为单页应用：No
   - 不覆盖index.html

5. 部署
   ```bash
   firebase deploy
   ```

## 💰 付费部署方案

### 1. 阿里云OSS + CDN

**优点**：国内访问速度快、价格便宜
**费用**：约5-20元/月

#### 部署步骤：
1. 开通阿里云OSS服务
2. 创建Bucket，设置为公共读
3. 上传所有文件到Bucket
4. 开启静态网站功能
5. 配置CDN加速（可选）

### 2. 腾讯云COS + CDN

**优点**：国内访问速度快、与微信生态集成好
**费用**：约5-20元/月

#### 部署步骤：
1. 开通腾讯云COS服务
2. 创建存储桶，设置公有读私有写
3. 上传文件并开启静态网站
4. 配置CDN加速域名

### 3. 传统虚拟主机

**优点**：稳定可靠、支持自定义域名
**费用**：约50-200元/年

#### 部署步骤：
1. 购买支持静态网站的虚拟主机
2. 通过FTP上传所有文件到网站根目录
3. 绑定域名并配置DNS

## 🌐 自定义域名配置

### GitHub Pages
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容写入您的域名：`pomodoro.yourdomain.com`
3. 在域名DNS设置中添加CNAME记录指向 `你的用户名.github.io`

### Netlify/Vercel
1. 在平台控制面板中添加自定义域名
2. 按照提示配置DNS记录
3. 等待SSL证书自动生成

## 🔧 部署优化建议

### 1. 启用HTTPS
- 所有推荐的免费平台都自动提供HTTPS
- HTTPS是浏览器通知功能的必要条件

### 2. 配置缓存
在根目录创建 `.htaccess` 文件（Apache服务器）：
```apache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

### 3. 压缩文件
- 启用Gzip压缩减少传输大小
- 大多数现代托管平台默认开启

### 4. PWA支持（可选）
如需离线使用，可以添加Service Worker和Web App Manifest。

## 📱 移动端优化

### 添加Web App Manifest
创建 `manifest.json` 文件：
```json
{
  "name": "番茄时钟",
  "short_name": "番茄钟",
  "description": "专注工作，高效休息",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#667eea",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

在 `index.html` 中添加：
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#667eea">
```

## 🚀 快速开始推荐

**新手推荐**：GitHub Pages
- 免费、稳定、简单
- 适合个人项目和学习

**商业推荐**：Netlify 或 Vercel
- 专业的静态网站托管
- 优秀的性能和用户体验

**国内推荐**：阿里云OSS 或 腾讯云COS
- 国内访问速度更快
- 成本较低

## ❓ 常见问题

### Q: 部署后通知功能不工作？
A: 确保网站使用HTTPS协议，HTTP协议不支持浏览器通知API。

### Q: 如何更新网站内容？
A: 
- GitHub Pages：推送新代码到仓库即可
- Netlify/Vercel：连接Git后自动部署
- 其他平台：重新上传文件

### Q: 可以使用免费域名吗？
A: 可以，推荐使用 Freenom 等服务申请免费域名，但稳定性不如付费域名。

---

选择适合您的部署方案，开始您的番茄时钟线上之旅吧！🍅