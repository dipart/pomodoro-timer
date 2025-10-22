# 🚀 GitHub Pages 部署教程（小白专用）

本教程将手把手教您如何将番茄时钟部署到GitHub Pages，无需任何编程基础！

## 📋 准备工作

### ✅ 确认您已有：
- GitHub账号（已有✓）
- 番茄时钟项目文件（已有✓）
- 电脑浏览器（Chrome、Firefox、Safari等）

### 📁 确认文件结构
确保您的 `pomodoro-timer` 文件夹包含以下文件：
```
pomodoro-timer/
├── index.html          ← 主页面
├── style.css           ← 样式文件
├── script.js           ← 功能脚本
├── README.md           ← 说明文档
└── DEPLOYMENT.md       ← 部署指南
```

## 🎯 第一步：登录GitHub

1. **打开浏览器**，访问 [github.com](https://github.com)
2. **点击右上角 "Sign in"** 按钮
3. **输入您的用户名和密码**，点击 "Sign in"
4. **登录成功后**，您会看到GitHub的主页面

## 🎯 第二步：创建新仓库

1. **点击右上角的 "+" 号**，选择 "New repository"
   
2. **填写仓库信息**：
   - **Repository name**：输入 `pomodoro-timer`
   - **Description**：输入 `一个现代化的番茄时钟应用`
   - **选择 Public**（公开仓库，免费用户必须选择这个）
   - **勾选 "Add a README file"**
   
3. **点击绿色的 "Create repository" 按钮**

4. **创建成功！** 您现在有了一个空的仓库

## 🎯 第三步：上传项目文件

### 方法A：网页直接上传（推荐小白）

1. **在仓库主页**，点击 "uploading an existing file" 链接

2. **准备上传文件**：
   - 打开您电脑上的 `pomodoro-timer` 文件夹
   - 选中所有文件（index.html, style.css, script.js 等）
   - 可以按 Ctrl+A（Windows）或 Cmd+A（Mac）全选

3. **拖拽上传**：
   - 将选中的文件直接拖拽到GitHub页面的上传区域
   - 或者点击 "choose your files" 按钮选择文件

4. **等待上传完成**：
   - 您会看到文件列表显示所有上传的文件
   - 确认所有5个文件都在列表中

5. **提交更改**：
   - 在页面底部的 "Commit changes" 区域
   - **Commit message** 输入：`添加番茄时钟项目文件`
   - 点击绿色的 **"Commit changes"** 按钮

6. **上传完成！** 您会回到仓库主页，看到所有文件

## 🎯 第四步：启用GitHub Pages

1. **进入仓库设置**：
   - 在仓库主页，点击顶部的 **"Settings"** 选项卡
   - 注意：是仓库的Settings，不是您个人账户的设置

2. **找到Pages设置**：
   - 在左侧菜单中，向下滚动找到 **"Pages"** 选项
   - 点击 "Pages"

3. **配置Pages设置**：
   - 在 **"Source"** 部分，选择 **"Deploy from a branch"**
   - 在 **"Branch"** 下拉菜单中，选择 **"main"**
   - 在文件夹选择中，保持默认的 **"/ (root)"**
   - 点击 **"Save"** 按钮

4. **等待部署**：
   - 页面会显示 "GitHub Pages source saved"
   - 几分钟后，页面顶部会出现绿色提示框
   - 显示：**"Your site is published at https://您的用户名.github.io/pomodoro-timer/"**

## 🎯 第五步：访问您的网站

1. **复制网站地址**：
   - 地址格式：`https://您的用户名.github.io/pomodoro-timer/`
   - 例如：如果您的GitHub用户名是 `xiaoming`，那么地址就是：
     `https://xiaoming.github.io/pomodoro-timer/`

2. **打开新标签页**，粘贴地址并访问

3. **🎉 恭喜！** 您的番茄时钟已经成功部署到线上！

## ✅ 验证功能

访问网站后，请测试以下功能：

- ✅ 页面正常显示，界面美观
- ✅ 点击"开始"按钮，计时器开始工作
- ✅ 可以暂停和重置
- ✅ 可以切换工作/休息模式
- ✅ 设置功能正常工作
- ✅ 在手机上访问，界面自适应

## 🔧 常见问题解决

### Q1: 显示404错误页面？
**解决方法**：
- 等待5-10分钟，GitHub需要时间处理
- 确认网址拼写正确
- 确认仓库名是 `pomodoro-timer`
- 确认仓库是Public（公开）状态

### Q2: 页面显示但样式错乱？
**解决方法**：
- 确认所有文件都已上传（特别是style.css）
- 按F5刷新页面
- 清除浏览器缓存后重新访问

### Q3: 功能不工作？
**解决方法**：
- 确认script.js文件已上传
- 按F12打开开发者工具，查看是否有错误信息
- 尝试在不同浏览器中访问

### Q4: 想要更新网站内容？
**解决方法**：
- 回到GitHub仓库页面
- 点击要修改的文件名
- 点击铅笔图标（Edit this file）
- 修改内容后点击 "Commit changes"
- 几分钟后网站会自动更新

## 📱 分享您的网站

您可以将网站地址分享给朋友：
- 微信分享：直接发送链接
- QQ分享：直接发送链接
- 朋友圈：可以截图 + 链接
- 微博：发布链接和截图

## 🎯 下一步优化（可选）

### 自定义域名
如果您有自己的域名，可以：
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容写入您的域名
3. 在域名提供商处配置DNS

### 添加图标
为网站添加收藏夹图标：
1. 准备一个32x32像素的图标文件
2. 命名为 `favicon.ico`
3. 上传到仓库根目录

## 🎉 完成！

恭喜您成功将番茄时钟部署到GitHub Pages！

**您的网站地址**：`https://您的GitHub用户名.github.io/pomodoro-timer/`

现在您可以：
- 在任何设备上访问您的番茄时钟
- 分享给朋友使用
- 继续学习和改进功能

---

**需要帮助？** 如果遇到任何问题，可以：
1. 重新阅读对应步骤
2. 检查GitHub仓库设置
3. 等待几分钟后重试

**开始您的高效工作之旅吧！** 🍅✨