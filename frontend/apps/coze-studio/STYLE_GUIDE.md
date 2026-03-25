# 项目样式修改指南

## 📍 全局样式定义位置

### 1. **核心主题色** - `node_modules/@coze-arch/semi-theme-hand01/raw.json`
   - **用途**: 定义 Semi UI 组件库的主题色，包含所有品牌色 (brand) 相关颜色值
   - **影响范围**: 所有使用 Semi UI 组件的地方
   - **修改方式**: 
     - ✅ 运行脚本：`node update-theme.js` (临时修改，重装依赖会重置)
     - ⚠️ 直接编辑 raw.json 文件 (不推荐，重装依赖会丢失)

### 2. **Tailwind 配置** - `tailwind.config.ts`
   - **用途**: 将 Semi 主题转换为 Tailwind CSS 工具类
   - **关键代码**: `designTokenToTailwindConfig(json)` - 从 raw.json 导入并转换
   - **影响范围**: 所有使用 Tailwind 类名的地方

### 3. **全局基础样式** - `src/global.less`
   - **用途**: 定义全局 CSS 变量、重置样式、通用类
   - **影响范围**: 整个应用
   - **当前配置**: 
     ```less
     :root {
       --brand-color: #fc5531;      // 品牌主色
       --brand-hover: #ff6b4a;      // 悬停色
       --brand-active: #e04a28;     // 激活色
       --brand-light: rgba(252, 85, 49, 0.1);  // 浅色背景
     }
     ```

### 4. **样式入口** - `src/index.less`
   - **用途**: 引入 Tailwind 基础样式
   - **内容**: `@tailwind base/components/utilities`

---

## 🔧 如何修改样式

### 场景 1: 修改主题色（推荐方式）
```bash
# 方法 1: 运行脚本（快速但临时）
node update-theme.js

# 方法 2: 永久修改 - 在 src/global.less 中覆盖 CSS 变量
:root {
  --brand-color: #你的颜色;
}
```

### 场景 2: 修改组件默认样式
```less
// 在 src/global.less 中添加
.semi-button {
  // 你的自定义样式
}
```

### 场景 3: 修改页面特定样式
```less
// 在对应页面的 .less 文件中修改
// 例如：src/pages/explore.less
```

### 场景 4: 使用 Tailwind 工具类
```tsx
// 直接在 JSX 中使用 Tailwind 类名
<div className="bg-brand text-white p-4">
  内容
</div>
```

---

## 🎯 查找样式文件的步骤

### 步骤 1: 确定样式类型
- **全局样式** → `src/global.less`
- **组件样式** → Semi UI 主题 (`raw.json`) 或组件自己的 `.less` 文件
- **页面样式** → `src/pages/xxx/xxx.less`
- **工具类** → Tailwind 配置 (`tailwind.config.ts`)

### 步骤 2: 搜索样式关键词
```bash
# 搜索特定的 CSS 类名
grep -r "your-class-name" src/

# 搜索颜色值
grep -r "#fc5531" src/

# 搜索 LESS 变量
grep -r "@brand" src/
```

### 步骤 3: 检查样式优先级
1. **内联样式** (最高优先级)
2. **ID 选择器** 
3. **类选择器** (`.class`)
4. **标签选择器** (最低优先级)

### 步骤 4: 使用浏览器开发工具
1. 右键点击元素 → "检查"
2. 查看 "Styles" 面板
3. 找到样式定义的文件路径和行号

---

## 📁 样式文件结构

```
src/
├── index.less          # 样式总入口（引入 Tailwind）
├── global.less         # 全局样式（CSS 变量、重置样式）
├── pages/
│   ├── explore/
│   │   ├── page.tsx    # 页面组件
│   │   └── index.less  # 页面样式
│   └── develop/
│       └── index.less
└── components/         # 自定义组件样式
    └── xxx/
        └── index.less
```

---

## ⚠️ 注意事项

1. **不要随意修改 `node_modules` 中的文件**
   - 重装依赖会丢失
   - 使用 `src/global.less` 覆盖

2. **遵循 BEM 命名规范**
   ```less
   .block {}
   .block__element {}
   .block--modifier {}
   ```

3. **避免过深的嵌套**
   ```less
   // ❌ 不推荐（超过 3 层）
   .parent .child .grandchild .great-grandchild {}
   
   // ✅ 推荐
   .parent-child {}
   .parent-grandchild {}
   ```

4. **使用 CSS 变量提高可维护性**
   ```less
   :root {
     --primary-color: #fc5531;
   }
   
   .button {
     background: var(--primary-color);
   }
   ```

---

## 🛠️ 常用工具命令

```bash
# 启动开发服务器（需要先确认是否有此命令）
npm run dev

# 构建项目
npm run build

# 查找样式文件
find src -name "*.less"

# 搜索特定样式
grep -r "background.*#fc5531" src/
```

---

## 📞 需要帮助？

如果找不到样式文件，可以：
1. 使用 VS Code 的全局搜索 (Ctrl+Shift+F)
2. 查看浏览器开发者工具的 Styles 面板
3. 询问团队成员或查看项目文档

---

**最后更新**: 2026-03-25  
**主题色**: #fc5531 (橙红色)
