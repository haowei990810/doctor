import { readFile } from 'node:fs/promises'
import { symptomChecklist, evaluate } from '../src/data/knowledge.js'

const verificationFile = '32c2e0ca829f059965ca3a15324c993a.txt'
const verificationContent = '5bf32cf9311f5c395bbbcbdd9b5b279212b7ffd4'
const items = symptomChecklist.flatMap((group) => group.items)
const failures = []

// 固定核对域名验证文件，避免误带逗号、换行或错误编码。
for (const path of [`public/${verificationFile}`, `dist/${verificationFile}`]) {
  try {
    const content = await readFile(path, 'utf8')
    if (content !== verificationContent) failures.push(`${path} 内容不正确`)
  } catch {
    failures.push(`${path} 不存在，请先执行 pnpm build`)
  }
}

if (new Set(items.map((item) => item.id)).size !== items.length) {
  failures.push('症状 id 不唯一')
}

if (items.some((item) => !['observe', 'urgent', 'emergency'].includes(item.triage))) {
  failures.push('存在无效的行动分级')
}

// 穷举全部症状组合，验证最高紧急级别优先，且 120 只出现在急症结果。
const combinations = 2 ** items.length
for (let mask = 0; mask < combinations; mask += 1) {
  const selected = items.filter((_, index) => mask & (1 << index))
  const selectedIds = selected.map((item) => item.id)
  const expected = selected.some((item) => item.triage === 'emergency')
    ? 'emergency'
    : selected.some((item) => item.triage === 'urgent')
      ? 'urgent'
      : 'observe'
  const result = evaluate(selectedIds)
  const mentions120 = [result.desc, ...result.advice].some((text) => text.includes('120'))

  if (result.level !== expected) {
    failures.push(`组合 ${mask} 分级错误：期望 ${expected}，实际 ${result.level}`)
    break
  }
  if (mentions120 !== (expected === 'emergency')) {
    failures.push(`组合 ${mask} 的 120 提示与 ${expected} 分级不一致`)
    break
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`内容验证通过：${items.length} 项症状，${combinations} 种组合`)
