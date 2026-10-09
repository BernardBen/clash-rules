# clash-rules — 多端分流规则中心

一套分流规则，三端同步使用：**Clash Verge (Rev) / FlClash（mihomo 内核系）+ Shadowrocket（小火箭）**。

规则与订阅完全隔离：仓库里不含任何订阅链接和密钥，随便切换/增删订阅都不影响分流规则。

## 仓库结构

```
clash-rules/
├── clash-verge/global-merge.yaml   # 规则唯一源：Clash Verge 全局扩展配置(Merge)
├── flclash/override.js             # 生成物：FlClash 覆写脚本
├── shadowrocket/shadowrocket.conf  # 生成物：小火箭配置(含订阅占位符)
└── scripts/generate.py             # 从 global-merge.yaml 生成上面两个文件
```

**规则内容**：22 个 MetaCubeX 在线规则集 + 44 类 GEOSITE 分流 + 24 个代理组
（底座/地区/场景/大厂/系统 五层结构），205 条规则。

## 各端接入方法

### Clash Verge (Rev) — macOS / Windows

1. 打开 Verge → 「订阅」页 → 右上角「全局扩展配置」(全局 Merge)
2. 把 `clash-verge/global-merge.yaml` 的全部内容粘贴进去，保存
3. 规则更新后：重新下载仓库里的该文件，再粘贴一次

### FlClash — macOS / Windows / Android

1. FlClash → 工具 → 覆写 → 新建（或导入），粘贴 `flclash/override.js` 全部内容
2. 把该覆写应用到所有订阅（或指定订阅）
3. 规则更新后：重新粘贴一次覆写内容

> 注意：FlClash 界面里的 TUN / 端口 / DNS 开关由 App 自己接管，
> 脚本里保留的 dns/sniffer 配置若与 GUI 设置冲突，以 GUI 为准排查。

### Shadowrocket — iOS

1. 下载 `shadowrocket/shadowrocket.conf`
2. 把文件里 9 处 `https://YOUR_SUBSCRIPTION_URL` 全部替换为你的订阅链接（支持 Clash 格式）
3. 小火箭 → 配置 → + → 从文件导入
4. 规则更新后：重新下载本文件、替换订阅链接后再次导入

## 规则更新工作流（改一处，三端同步）

1. 编辑 `clash-verge/global-merge.yaml`（唯一的规则源）
2. 运行生成器（需要 Python3 + pyyaml）：
   ```bash
   pip3 install pyyaml   # 首次
   python3 scripts/generate.py
   ```
3. 提交并推送：
   ```bash
   git add -A && git commit -m "更新规则" && git push
   ```
4. 各端按上面「接入方法」中的更新步骤拉取最新内容

## 发布到 GitHub（首次）

本仓库尚未关联远端，自己操作即可：

```bash
# 方式一: 已安装 gh CLI
gh repo create clash-rules --public --source=. --push

# 方式二: 网页建仓后
git remote add origin git@github.com:<你的用户名>/clash-rules.git
git push -u origin main
```

推送后，各端的文件 raw 链接形如：
`https://raw.githubusercontent.com/<用户名>/clash-rules/main/...`
（小火箭更新规则时直接访问这个 raw 链接下载即可）

## 转换映射说明（小火箭端）

两端共用同一个规则源（MetaCubeX meta-rules-dat），差异如下：

| mihomo 特性 | 小火箭端处理 |
|---|---|
| RULE-SET (domain, .mrs) | → `DOMAIN-SET, …/geosite/<名>.list`（同一份数据的文本格式） |
| GEOSITE,x | → 同上 DOMAIN-SET |
| RULE-SET (ipcidr: private-ip / cn-ip / telegram-ip / google-ip) | 跳过：私网/Telegram 已有显式 IP-CIDR 规则；cn-ip 由 GEOIP,CN 覆盖；google-ip 由域名集覆盖 |
| GEOIP,private | 跳过（已有显式 IP-CIDR 规则） |
| PROCESS-NAME | 小火箭不支持，已丢弃（仅 1 条：Telegram 进程规则，域名/IP 规则已覆盖） |
| MATCH | → `FINAL` |
| include-all-proxies + filter/exclude-filter | → `policy-path` + `policy-regex-filter`（负向前瞻正则） |

### 已知注意事项

- **raw.githubusercontent.com 在墙内无法直连**：首次拉取规则集需设备本身已有可用代理（或先在能连通的网络下初始化）。mihomo 端规则集每 24h 自动更新，小火箭会在导入/更新配置时下载。
- `cn.list` 约 1.6MB、`geolocation-!cn.list` 约 450KB，小火箭首次下载稍慢，属正常。
- 小火箭若提示 `DOMAIN-SET`/`policy-regex-filter` 不识别（旧版本），把对应行换成 `RULE-SET` + blackmatrix7 的 Shadowrocket 格式规则集即可，映射表：`github.com/blackmatrix7/ios_rule_script`（目录 `rule/Shadowrocket/`）。
- FlClash 的覆写脚本等价于 Verge 全局 Merge：规则/代理组/DNS/SNIFFER 全量替换订阅自带内容。

## 验证记录

- `global-merge.yaml`：已用 mihomo 内核 `-t` 完整校验（205 规则 / 24 组，GEOSITE+GEOIP+RULE-SET 全部加载成功）
- `override.js`：Node.js 语法检查 + `main()` 功能冒烟测试通过
- `shadowrocket.conf`：24 组 / 187 条规则，策略交叉引用检查无悬空引用；50 个 DOMAIN-SET 远程 URL 全部 200 可达
