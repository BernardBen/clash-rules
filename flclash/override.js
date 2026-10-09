// FlClash 覆写脚本 (由 clash-rules 仓库 scripts/generate.py 自动生成)
// ============================================================
// 用法: FlClash → 工具 → 覆写 → 新建/导入, 粘贴本文件内容,
//       然后将该覆写应用到全部订阅(全局)或指定订阅。
// 等价于 Clash Verge 的「全局扩展配置」, 修改规则请编辑
// clash-verge/global-merge.yaml 后重新运行生成脚本。
// ============================================================

const BASE = {
  "mode": "rule",
  "ipv6": false,
  "unified-delay": true,
  "tcp-concurrent": true,
  "log-level": "info",
  "profile": {
    "store-selected": true
  },
  "geodata-mode": true,
  "geo-auto-update": true,
  "geo-update-interval": 24
};

const DNS = {
  "enable": true,
  "use-hosts": true,
  "ipv6": false,
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "respect-rules": true,
  "default-nameserver": [
    "223.5.5.5",
    "119.29.29.29"
  ],
  "nameserver": [
    "https://dns.alidns.com/dns-query",
    "https://doh.pub/dns-query"
  ],
  "proxy-server-nameserver": [
    "https://dns.alidns.com/dns-query",
    "https://doh.pub/dns-query"
  ],
  "fallback": [
    "https://dns.cloudflare.com/dns-query",
    "https://dns.google/dns-query"
  ],
  "fallback-filter": {
    "geoip": true,
    "geoip-code": "CN",
    "ipcidr": [
      "240.0.0.0/4",
      "0.0.0.0/32"
    ]
  },
  "fake-ip-filter": [
    "*.lan",
    "*.local",
    "*.localhost",
    "localhost",
    "time.*.com",
    "time.*.gov",
    "time.*.edu.cn",
    "time.*.apple.com",
    "+.ntp.org.cn",
    "+.pool.ntp.org",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "localhost.ptlogin2.qq.com"
  ]
};

const SNIFFER = {
  "enable": true,
  "sniff": {
    "HTTP": {
      "ports": [
        80,
        "8080-8880"
      ],
      "override-destination": true
    },
    "TLS": {
      "ports": [
        443,
        8443
      ]
    },
    "QUIC": {
      "ports": [
        443,
        8443
      ]
    }
  }
};

const RULE_PROVIDERS = {
  "category-ads-all": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/category-ads-all.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.mrs",
    "interval": 86400
  },
  "private": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/private.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/private.mrs",
    "interval": 86400
  },
  "private-ip": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "ipcidr",
    "path": "./ruleset/private-ip.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/private.mrs",
    "interval": 86400
  },
  "geolocation-cn": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/geolocation-cn.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-cn.mrs",
    "interval": 86400
  },
  "cn-ip": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "ipcidr",
    "path": "./ruleset/cn-ip.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/cn.mrs",
    "interval": 86400
  },
  "geolocation-!cn": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/geolocation-!cn.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-!cn.mrs",
    "interval": 86400
  },
  "openai": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/openai.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/openai.mrs",
    "interval": 86400
  },
  "anthropic": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/anthropic.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/anthropic.mrs",
    "interval": 86400
  },
  "category-ai-chat-!cn": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/category-ai-chat-!cn.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-chat-!cn.mrs",
    "interval": 86400
  },
  "youtube": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/youtube.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.mrs",
    "interval": 86400
  },
  "google": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/google.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google.mrs",
    "interval": 86400
  },
  "google-ip": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "ipcidr",
    "path": "./ruleset/google-ip.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/google.mrs",
    "interval": 86400
  },
  "microsoft": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/microsoft.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft.mrs",
    "interval": 86400
  },
  "onedrive": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/onedrive.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/onedrive.mrs",
    "interval": 86400
  },
  "apple": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/apple.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.mrs",
    "interval": 86400
  },
  "icloud": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/icloud.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/icloud.mrs",
    "interval": 86400
  },
  "telegram": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/telegram.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/telegram.mrs",
    "interval": 86400
  },
  "telegram-ip": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "ipcidr",
    "path": "./ruleset/telegram-ip.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/telegram.mrs",
    "interval": 86400
  },
  "github": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/github.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/github.mrs",
    "interval": 86400
  },
  "gitlab": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/gitlab.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gitlab.mrs",
    "interval": 86400
  },
  "atlassian": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/atlassian.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/atlassian.mrs",
    "interval": 86400
  },
  "cn": {
    "type": "http",
    "proxy": "底座 · ♻️ 自动最优",
    "behavior": "domain",
    "path": "./ruleset/cn.mrs",
    "format": "mrs",
    "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/cn.mrs",
    "interval": 86400
  }
};

const PROXY_GROUPS = [
  {
    "name": "底座 · ♻️ 自动最优",
    "type": "url-test",
    "include-all-proxies": true,
    "exclude-filter": "(?i)官网|剩余|到期|套餐|流量|重置|无法连接|请切换|海外用户专用|纯ipv6|ipv6|备用|较慢|测试|test|维护|故障|失效",
    "url": "https://www.gstatic.com/generate_204",
    "interval": 600,
    "tolerance": 50
  },
  {
    "name": "底座 · 🎚️ 手动切换",
    "type": "select",
    "include-all-proxies": true,
    "exclude-filter": "(?i)官网|剩余|到期|套餐|流量|重置|无法连接|请切换|海外用户专用|纯ipv6|ipv6|备用|较慢|测试|test|维护|故障|失效",
    "proxies": [
      "底座 · ♻️ 自动最优",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "底座 · 🔌 国内直连",
    "type": "select",
    "proxies": [
      "DIRECT"
    ]
  },
  {
    "name": "地区 · 🇺🇸 美国节点",
    "type": "url-test",
    "include-all-proxies": true,
    "exclude-filter": "(?i)官网|剩余|到期|套餐|流量|重置|无法连接|请切换|海外用户专用|纯ipv6|ipv6|备用|较慢|测试|test|维护|故障|失效",
    "filter": "(美国|US|USA|United States|洛杉矶|纽约)",
    "url": "https://www.gstatic.com/generate_204",
    "interval": 600,
    "tolerance": 50
  },
  {
    "name": "地区 · 🇭🇰 香港节点",
    "type": "url-test",
    "include-all-proxies": true,
    "exclude-filter": "(?i)官网|剩余|到期|套餐|流量|重置|无法连接|请切换|海外用户专用|纯ipv6|ipv6|备用|较慢|测试|test|维护|故障|失效",
    "filter": "(香港|HK|Hong Kong)",
    "url": "https://www.gstatic.com/generate_204",
    "interval": 600,
    "tolerance": 50
  },
  {
    "name": "地区 · 🇯🇵 日本节点",
    "type": "url-test",
    "include-all-proxies": true,
    "exclude-filter": "(?i)官网|剩余|到期|套餐|流量|重置|无法连接|请切换|海外用户专用|纯ipv6|ipv6|备用|较慢|测试|test|维护|故障|失效",
    "filter": "(日本|JP|Japan)",
    "url": "https://www.gstatic.com/generate_204",
    "interval": 600,
    "tolerance": 50
  },
  {
    "name": "地区 · 🇸🇬 新加坡节点",
    "type": "url-test",
    "include-all-proxies": true,
    "exclude-filter": "(?i)官网|剩余|到期|套餐|流量|重置|无法连接|请切换|海外用户专用|纯ipv6|ipv6|备用|较慢|测试|test|维护|故障|失效",
    "filter": "(新加坡|SG|Singapore)",
    "url": "https://www.gstatic.com/generate_204",
    "interval": 600,
    "tolerance": 50
  },
  {
    "name": "地区 · 🇹🇼 台湾节点",
    "type": "url-test",
    "include-all-proxies": true,
    "exclude-filter": "(?i)官网|剩余|到期|套餐|流量|重置|无法连接|请切换|海外用户专用|纯ipv6|ipv6|备用|较慢|测试|test|维护|故障|失效",
    "filter": "(台湾|TW|Taiwan)",
    "url": "https://www.gstatic.com/generate_204",
    "interval": 600,
    "tolerance": 50
  },
  {
    "name": "地区 · 🌍 全部节点",
    "type": "url-test",
    "include-all-proxies": true,
    "exclude-filter": "(?i)官网|剩余|到期|套餐|流量|重置|无法连接|请切换|海外用户专用|纯ipv6|ipv6|备用|较慢|测试|test|维护|故障|失效",
    "url": "https://www.gstatic.com/generate_204",
    "interval": 600,
    "tolerance": 50
  },
  {
    "name": "场景 · 🧠 境外 AI",
    "type": "select",
    "proxies": [
      "地区 · 🇺🇸 美国节点",
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "地区 · 🇯🇵 日本节点",
      "地区 · 🇸🇬 新加坡节点",
      "地区 · 🇭🇰 香港节点",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "场景 · 💬 即时通讯",
    "type": "select",
    "proxies": [
      "地区 · 🇭🇰 香港节点",
      "地区 · 🇸🇬 新加坡节点",
      "底座 · ♻️ 自动最优",
      "底座 · 🎚️ 手动切换",
      "地区 · 🇯🇵 日本节点",
      "地区 · 🇺🇸 美国节点",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "场景 · 📢 谷歌推送",
    "type": "select",
    "proxies": [
      "底座 · ♻️ 自动最优",
      "底座 · 🎚️ 手动切换",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "场景 · 🎬 海外音影社",
    "type": "select",
    "proxies": [
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "地区 · 🇭🇰 香港节点",
      "地区 · 🇯🇵 日本节点",
      "地区 · 🇸🇬 新加坡节点",
      "地区 · 🇺🇸 美国节点",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "场景 · 📱 TikTok",
    "type": "select",
    "proxies": [
      "地区 · 🇺🇸 美国节点",
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "场景 · 🐙 开发源站",
    "type": "select",
    "proxies": [
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "地区 · 🇺🇸 美国节点",
      "地区 · 🇭🇰 香港节点",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "场景 · 📚 学术与数据",
    "type": "select",
    "proxies": [
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "地区 · 🇺🇸 美国节点",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "场景 · 🎮 游戏平台",
    "type": "select",
    "proxies": [
      "底座 · ♻️ 自动最优",
      "底座 · 🎚️ 手动切换",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "大厂 · 🔍 谷歌",
    "type": "select",
    "proxies": [
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "地区 · 🇺🇸 美国节点",
      "地区 · 🇯🇵 日本节点",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "大厂 · 🍎 苹果",
    "type": "select",
    "proxies": [
      "底座 · 🔌 国内直连",
      "底座 · ♻️ 自动最优",
      "底座 · 🎚️ 手动切换"
    ]
  },
  {
    "name": "大厂 · 🪟 微软",
    "type": "select",
    "proxies": [
      "底座 · 🔌 国内直连",
      "底座 · ♻️ 自动最优",
      "底座 · 🎚️ 手动切换"
    ]
  },
  {
    "name": "大厂 · 💠 微软跨境",
    "type": "select",
    "proxies": [
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "地区 · 🇺🇸 美国节点",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "大厂 · 👥 脸书系",
    "type": "select",
    "proxies": [
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "地区 · 🇺🇸 美国节点",
      "底座 · 🔌 国内直连"
    ]
  },
  {
    "name": "系统 · 🚫 广告拦截",
    "type": "select",
    "proxies": [
      "REJECT",
      "底座 · 🔌 国内直连",
      "底座 · 🎚️ 手动切换"
    ]
  },
  {
    "name": "系统 · 🐟 漏网之鱼",
    "type": "select",
    "proxies": [
      "底座 · 🎚️ 手动切换",
      "底座 · ♻️ 自动最优",
      "底座 · 🔌 国内直连"
    ]
  }
];

const RULES = [
  "RULE-SET,private,DIRECT",
  "RULE-SET,private-ip,DIRECT,no-resolve",
  "GEOSITE,private,DIRECT",
  "GEOIP,private,DIRECT,no-resolve",
  "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
  "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
  "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
  "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
  "IP-CIDR,100.64.0.0/10,DIRECT,no-resolve",
  "IP-CIDR,224.0.0.0/4,DIRECT,no-resolve",
  "IP-CIDR,fe80::/10,DIRECT,no-resolve",
  "IP-CIDR,fc00::/7,DIRECT,no-resolve",
  "DOMAIN-SUFFIX,e.qq.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,kuaishou.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,adkwai.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,adbkwai.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,kuaishouzt.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,kwaixiaodian.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,oceanengine.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,e.baidu.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,xiaohongshu.com,底座 · 🔌 国内直连",
  "RULE-SET,geolocation-cn,底座 · 🔌 国内直连",
  "RULE-SET,cn-ip,底座 · 🔌 国内直连,no-resolve",
  "RULE-SET,cn,底座 · 🔌 国内直连",
  "GEOSITE,cn,底座 · 🔌 国内直连",
  "GEOIP,CN,底座 · 🔌 国内直连,no-resolve",
  "GEOSITE,tencent,DIRECT",
  "GEOSITE,bilibili,底座 · 🔌 国内直连",
  "GEOSITE,youku,底座 · 🔌 国内直连",
  "GEOSITE,iqiyi,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,xiaolutg.com,底座 · 🔌 国内直连",
  "DOMAIN-SUFFIX,ujumedia.com,底座 · 🔌 国内直连",
  "RULE-SET,category-ads-all,系统 · 🚫 广告拦截",
  "RULE-SET,openai,场景 · 🧠 境外 AI",
  "RULE-SET,anthropic,场景 · 🧠 境外 AI",
  "RULE-SET,category-ai-chat-!cn,场景 · 🧠 境外 AI",
  "RULE-SET,youtube,大厂 · 🔍 谷歌",
  "RULE-SET,google,大厂 · 🔍 谷歌",
  "RULE-SET,google-ip,大厂 · 🔍 谷歌,no-resolve",
  "RULE-SET,telegram,场景 · 💬 即时通讯",
  "RULE-SET,telegram-ip,场景 · 💬 即时通讯,no-resolve",
  "RULE-SET,github,场景 · 🐙 开发源站",
  "RULE-SET,gitlab,场景 · 🐙 开发源站",
  "RULE-SET,atlassian,场景 · 🐙 开发源站",
  "RULE-SET,microsoft,大厂 · 🪟 微软",
  "RULE-SET,onedrive,大厂 · 🪟 微软",
  "RULE-SET,apple,大厂 · 🍎 苹果",
  "RULE-SET,icloud,大厂 · 🍎 苹果",
  "PROCESS-NAME,Telegram,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,openai.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,chatgpt.com,场景 · 🧠 境外 AI",
  "DOMAIN,chat.openai.com,场景 · 🧠 境外 AI",
  "DOMAIN,desktop.chat.openai.com,场景 · 🧠 境外 AI",
  "DOMAIN,ios.chat.openai.com,场景 · 🧠 境外 AI",
  "DOMAIN,android.chat.openai.com,场景 · 🧠 境外 AI",
  "DOMAIN,tcr9i.chat.openai.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,auth.openai.com,场景 · 🧠 境外 AI",
  "DOMAIN,auth0.openai.com,场景 · 🧠 境外 AI",
  "DOMAIN,setup.auth.openai.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,oaistatic.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,oaiusercontent.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,openaimerge.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,statsig.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,statsigapi.net,场景 · 🧠 境外 AI",
  "DOMAIN,events.statsigapi.net,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,featuregates.org,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,featureassets.org,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,prodregistryv2.org,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,intercom.io,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,intercomcdn.com,场景 · 🧠 境外 AI",
  "DOMAIN,js.intercomcdn.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,ct.sendgrid.net,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,workos.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,workoscdn.com,场景 · 🧠 境外 AI",
  "DOMAIN,workos.imgix.net,场景 · 🧠 境外 AI",
  "DOMAIN,forwarder.workos.com,场景 · 🧠 境外 AI",
  "DOMAIN,setup.workos.com,场景 · 🧠 境外 AI",
  "DOMAIN,js.stripe.com,场景 · 🧠 境外 AI",
  "DOMAIN,challenges.cloudflare.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,ingest.sentry.io,场景 · 🧠 境外 AI",
  "DOMAIN,o207216.ingest.sentry.io,场景 · 🧠 境外 AI",
  "DOMAIN,o33249.ingest.sentry.io,场景 · 🧠 境外 AI",
  "DOMAIN,rum.browser-intake-datadoghq.com,场景 · 🧠 境外 AI",
  "DOMAIN,humb.apple.com,场景 · 🧠 境外 AI",
  "GEOSITE,openai,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,anthropic.com,场景 · 🧠 境外 AI",
  "DOMAIN,api.anthropic.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,claude.ai,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,claude.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,platform.claude.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,downloads.claude.ai,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,claudeusercontent.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,bridge.claudeusercontent.com,场景 · 🧠 境外 AI",
  "GEOSITE,anthropic,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,aistudio.google.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,ai.google.dev,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,generativelanguage.googleapis.com,场景 · 🧠 境外 AI",
  "DOMAIN,makersuite.google.com,场景 · 🧠 境外 AI",
  "DOMAIN-SUFFIX,t.me,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,tdesktop.com,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,telegra.ph,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,telegram.me,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,telegram.org,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,telesco.pe,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,telegram.dog,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,telegram-cdn.org,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,comments.app,场景 · 💬 即时通讯",
  "IP-CIDR,91.108.56.0/22,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR,91.108.4.0/22,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR,91.108.8.0/22,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR,91.108.16.0/22,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR,91.108.12.0/22,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR,149.154.160.0/20,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR,91.105.192.0/23,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR,91.108.20.0/22,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR,185.76.151.0/24,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR6,2001:b28:f23d::/48,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR6,2001:b28:f23f::/48,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR6,2001:67c:4e8::/48,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR6,2001:b28:f23c::/48,场景 · 💬 即时通讯,no-resolve",
  "IP-CIDR6,2a0a:f280::/32,场景 · 💬 即时通讯,no-resolve",
  "DOMAIN-SUFFIX,whatsapp.com,场景 · 💬 即时通讯",
  "DOMAIN-SUFFIX,whatsapp.net,场景 · 💬 即时通讯",
  "GEOSITE,whatsapp,场景 · 💬 即时通讯",
  "DOMAIN,mtalk.google.com,场景 · 📢 谷歌推送",
  "DOMAIN,alt1-mtalk.google.com,场景 · 📢 谷歌推送",
  "DOMAIN,alt2-mtalk.google.com,场景 · 📢 谷歌推送",
  "DOMAIN,alt3-mtalk.google.com,场景 · 📢 谷歌推送",
  "DOMAIN,alt4-mtalk.google.com,场景 · 📢 谷歌推送",
  "DOMAIN,alt5-mtalk.google.com,场景 · 📢 谷歌推送",
  "DOMAIN,alt6-mtalk.google.com,场景 · 📢 谷歌推送",
  "DOMAIN,alt7-mtalk.google.com,场景 · 📢 谷歌推送",
  "DOMAIN,alt8-mtalk.google.com,场景 · 📢 谷歌推送",
  "GEOSITE,docker,场景 · 🐙 开发源站",
  "GEOSITE,npmjs,场景 · 🐙 开发源站",
  "GEOSITE,github,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,github.com,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,githubusercontent.com,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,githubassets.com,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,github.io,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,ghcr.io,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,npm.pkg.github.com,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,registry.npmjs.org,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,npmjs.org,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,pypi.org,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,pythonhosted.org,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,files.pythonhosted.org,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,crates.io,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,api.githubcopilot.com,场景 · 🐙 开发源站",
  "DOMAIN-SUFFIX,githubcopilot.com,场景 · 🐙 开发源站",
  "DOMAIN,copilot-proxy.githubusercontent.com,场景 · 🐙 开发源站",
  "GEOSITE,netflix,场景 · 🎬 海外音影社",
  "GEOSITE,disney,场景 · 🎬 海外音影社",
  "GEOSITE,hulu,场景 · 🎬 海外音影社",
  "GEOSITE,primevideo,场景 · 🎬 海外音影社",
  "GEOSITE,hbo,场景 · 🎬 海外音影社",
  "GEOSITE,spotify,场景 · 🎬 海外音影社",
  "GEOSITE,twitch,场景 · 🎬 海外音影社",
  "GEOSITE,pixiv,场景 · 🎬 海外音影社",
  "GEOSITE,reddit,场景 · 🎬 海外音影社",
  "GEOSITE,discord,场景 · 🎬 海外音影社",
  "GEOSITE,twitter,场景 · 🎬 海外音影社",
  "DOMAIN-SUFFIX,x.com,场景 · 🎬 海外音影社",
  "DOMAIN-SUFFIX,gamer.com.tw,场景 · 🎬 海外音影社",
  "DOMAIN-SUFFIX,bahamut.com.tw,场景 · 🎬 海外音影社",
  "GEOSITE,tiktok,场景 · 📱 TikTok",
  "GEOSITE,google,大厂 · 🔍 谷歌",
  "GEOSITE,youtube,大厂 · 🔍 谷歌",
  "DOMAIN-SUFFIX,gmail.com,大厂 · 🔍 谷歌",
  "DOMAIN-SUFFIX,googlemail.com,大厂 · 🔍 谷歌",
  "DOMAIN,pop.gmail.com,大厂 · 🔍 谷歌",
  "DOMAIN,smtp.gmail.com,大厂 · 🔍 谷歌",
  "DOMAIN,imap.gmail.com,大厂 · 🔍 谷歌",
  "DOMAIN-SUFFIX,copilot.microsoft.com,大厂 · 💠 微软跨境",
  "DOMAIN-SUFFIX,copilotstudio.microsoft.com,大厂 · 💠 微软跨境",
  "DOMAIN,edgeservices.bing.com,大厂 · 💠 微软跨境",
  "DOMAIN-SUFFIX,sydney.bing.com,大厂 · 💠 微软跨境",
  "DOMAIN-SUFFIX,bingapis.com,大厂 · 💠 微软跨境",
  "DOMAIN-SUFFIX,apple-relay.akamaized.net,底座 · ♻️ 自动最优",
  "DOMAIN-SUFFIX,apple-relay.apple.com,底座 · ♻️ 自动最优",
  "DOMAIN-SUFFIX,apple-relay.cloudflare.com,底座 · ♻️ 自动最优",
  "DOMAIN-SUFFIX,apple-relay.fastly-edge.com,底座 · ♻️ 自动最优",
  "DOMAIN-SUFFIX,apple-relay.mask.apple-dns.net,底座 · ♻️ 自动最优",
  "GEOSITE,apple,大厂 · 🍎 苹果",
  "GEOSITE,icloud,大厂 · 🍎 苹果",
  "GEOSITE,apple-dev,大厂 · 🍎 苹果",
  "GEOSITE,itunes,大厂 · 🍎 苹果",
  "GEOSITE,apple-update,大厂 · 🍎 苹果",
  "GEOSITE,microsoft,大厂 · 🪟 微软",
  "GEOSITE,onedrive,大厂 · 🪟 微软",
  "GEOSITE,linkedin,大厂 · 🪟 微软",
  "DOMAIN-SUFFIX,outlook.com,大厂 · 🪟 微软",
  "DOMAIN-SUFFIX,hotmail.com,大厂 · 🪟 微软",
  "DOMAIN-SUFFIX,live.com,大厂 · 🪟 微软",
  "DOMAIN-SUFFIX,office.com,大厂 · 🪟 微软",
  "DOMAIN-SUFFIX,microsoft365.com,大厂 · 🪟 微软",
  "GEOSITE,facebook,大厂 · 👥 脸书系",
  "GEOSITE,meta,大厂 · 👥 脸书系",
  "GEOSITE,category-scholar-!cn,场景 · 📚 学术与数据",
  "GEOSITE,steam,场景 · 🎮 游戏平台",
  "GEOSITE,epicgames,场景 · 🎮 游戏平台",
  "GEOSITE,playstation,场景 · 🎮 游戏平台",
  "GEOSITE,xbox,场景 · 🎮 游戏平台",
  "GEOSITE,nintendo,场景 · 🎮 游戏平台",
  "DOMAIN-SUFFIX,sharedchat.cc,底座 · 🎚️ 手动切换",
  "DOMAIN-SUFFIX,openwrt.ai,底座 · 🎚️ 手动切换",
  "GEOSITE,gfw,底座 · 🎚️ 手动切换",
  "RULE-SET,geolocation-!cn,底座 · 🎚️ 手动切换",
  "GEOSITE,geolocation-!cn,底座 · 🎚️ 手动切换",
  "MATCH,系统 · 🐟 漏网之鱼"
];


function main(config) {
  Object.assign(config, BASE);
  config.dns = DNS;
  config.sniffer = SNIFFER;
  config["rule-providers"] = RULE_PROVIDERS;
  config["proxy-groups"] = PROXY_GROUPS;
  config.rules = RULES;
  return config;
}
