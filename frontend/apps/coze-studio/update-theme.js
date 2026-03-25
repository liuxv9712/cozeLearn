// 修改主题色为 #fc5531 的脚本
const fs = require('fs');
const path = require('path');

const rawJsonPath = path.join(__dirname, 'node_modules/@coze-arch/semi-theme-hand01/raw.json');

if (!fs.existsSync(rawJsonPath)) {
  console.error('错误：找不到 raw.json 文件');
  console.log('请确认 @coze-arch/semi-theme-hand01 包已安装');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(rawJsonPath, 'utf8'));

// 需要修改的品牌色值
const newBrandColor = '#fc5531';

// 递归查找并替换所有包含 brand 的颜色值
function replaceBrandColors(obj, depth = 0) {
  if (depth > 10) return obj; // 防止无限递归
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceBrandColors(item, depth + 1));
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      if (key.toLowerCase().includes('brand')) {
        // 如果是品牌色相关属性，直接设置为新颜色
        if (typeof obj[key] === 'string' && /^#[0-9a-f]{6}$/i.test(obj[key])) {
          newObj[key] = newBrandColor;
        } else {
          newObj[key] = replaceBrandColors(obj[key], depth + 1);
        }
      } else {
        newObj[key] = replaceBrandColors(obj[key], depth + 1);
      }
    }
    return newObj;
  }
  
  return obj;
}

// 特殊处理：直接设置 presetColor.brand
if (data.presetColor && data.presetColor.brand) {
  data.presetColor.brand = newBrandColor;
}

// 递归替换所有 brand 相关的颜色
const updatedData = replaceBrandColors(data);

// 写回文件
fs.writeFileSync(rawJsonPath, JSON.stringify(updatedData, null, 2), 'utf8');

console.log(`✓ 主题色已成功修改为 ${newBrandColor}`);
console.log(`✓ 修改的文件：${rawJsonPath}`);
console.log('\n注意：此修改在 node_modules 中，重新安装依赖会被重置。');
console.log('建议：如需永久保存，可在 src/global.less 中使用 CSS 变量覆盖。');
