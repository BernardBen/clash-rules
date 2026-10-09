# AGENTS.md — AI 会话上下文恢复文件

> 给 AI 编程助手看的项目说明。新会话读本文件即可恢复全部上下文，无需历史对话。

## 项目是什么

多端分流规则中心：**一套规则源，三端消费**（Clash Verge Rev / FlClash / Shadowrocket）。
规则与订阅完全解耦，仓库不含任何订阅链接和密钥。GitHub: `BernardBen/clash-rules`（public）。

## 规则流（改规则只动一个文件）

```
clash-verge/global-merge.yaml   ← 唯一规则源（mihomo 语法，含 dns/sniffer/rule-providers/proxy-groups/rules）
        │ python3 scripts/generate.py
        ├→ flclash/override.js             FlClash 覆写脚本（JS main(config) 全量替换）
        ├→ shadowrocket/shadowrocket.conf  小火箭 policy-path 版（占位符版，兜底用）
        └→ shadowrocket/rules.conf         小火箭订阅引用版（推荐，raw/jsDelivr 链接添加）
```

提交格式：`git add -A && git commit -m "..." && git push`

## 各端接入方式

- **Clash Verge**: 全局扩展配置粘贴 global-merge.yaml 内容
- **FlClash**: 工具→覆写 粘贴 override.js；覆写需挂到订阅（profiles 表 script_id）
- **Shadowrocket**: 配置→+→添加
  `https://fastly.jsdelivr.net/gh/BernardBen/clash-rules@main/shadowrocket/rules.conf`
  前 9 个底座/地区组引用订阅自带分组名（当前取自「赔钱小号」：♻️自动选择/🚀节点选择/🇺🇸美国节点/🇯🇵日本节点/🇸🇬狮城节点），换订阅需改 generate.py 的 SR_SUB_GROUPS

## 本机环境事实（调试入口）

| 项 | 位置/命令 |
|---|---|
| 仓库 | `/Volumes/Mac Data/code/clash-rules` |
| FlClash 数据目录 | `~/Library/Application Support/com.follow.clash/`（config.yaml=运行时合成配置；database.sqlite 的 profiles 表看 script_id 挂载、scripts/ 放覆写脚本） |
| Verge 数据目录 | `~/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/`（profiles/Merge.yaml） |
| 代理端口 | `127.0.0.1:7890`（FlClash mixed-port，行为测试 `-x http://127.0.0.1:7890`） |
| mihomo 校验 | `/Applications/Clash Verge.app/Contents/MacOS/verge-mihomo -t -d <dir> -f <config>`；`-t` 需要 pyyaml（新会话先 pip 装）+ geodata/ruleset 缓存（从 FlClash 或 Verge 数据目录拷） |
| git push 超时 | 直连不稳时：`git -c http.proxy=http://127.0.0.1:7890 -c https.proxy=http://127.0.0.1:7890 push` |

## 重要约束与教训（新会话必读）

1. **raw.githubusercontent.com 墙内 DNS 污染+TLS 阻断**：mihomo 端 rule-providers 可用（本地缓存 + proxy 属性走代理更新）；**小火箭端所有远程 URL 必须用 jsDelivr**（`fastly.jsdelivr.net/gh/...`，约 12h 缓存）
2. FlClash 覆写冷启动需 `com.follow.clash/ruleset/` 里预置 .mrs 缓存（已预置），否则内核下载失败起不来
3. **绝不提交**：订阅链接、token、CA 证书（p12）到仓库；`shadowrocket.local.conf` 已被 .gitignore（`generate.py --sub <链接>` 生成的本地版）
4. url-test 组 exclude-filter 含「晚高峰/避免晚高峰」（排除机场自标不稳定的节点）；select 型手动切换组不含该排除，保留手动选择权
5. 小火箭不支持：GEOSITE / RULE-SET(.mrs) / PROCESS-NAME / GEOIP,private → 转换逻辑全在 generate.py（GEOSITE→DOMAIN-SET、MATCH→FINAL、ipcidr 规则集跳过显式覆盖）
6. mihomo `-t` 对未知字段静默忽略，不能用它验证字段是否真的被支持
7. FlClash 的 TUN/端口/DNS 开关由 App 设置页管理，与覆写脚本各管各的，勿在两处写同一项
8. 小火箭 [MITM]/CA 证书类内容（如 TikTok 换区重写）绝不能进公开仓库，只能做设备本地追加

## 新会话开场白模板

> 读 `/Volumes/Mac Data/code/clash-rules/AGENTS.md` 恢复上下文。我要做的调整是：……
