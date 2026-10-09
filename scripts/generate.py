#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
clash-rules 生成器
从 clash-verge/global-merge.yaml (Clash Verge 全局扩展配置) 生成:
  1. flclash/override.js          FlClash 覆写脚本
  2. shadowrocket/shadowrocket.conf  Shadowrocket 配置

用法:
  python3 scripts/generate.py                      # 生成占位符版本
  python3 scripts/generate.py --sub <订阅链接>     # 额外生成已填好链接的本地版小火箭配置

依赖: pyyaml
"""
import argparse
import json
import os

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MERGE_PATH = os.path.join(ROOT, "clash-verge", "global-merge.yaml")
FLCLASH_OUT = os.path.join(ROOT, "flclash", "override.js")
SR_OUT = os.path.join(ROOT, "shadowrocket", "shadowrocket.conf")

META = "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo"

# ---------------------------------------------------------------------------
# 载入 Merge 配置
# ---------------------------------------------------------------------------
with open(MERGE_PATH, "r", encoding="utf-8") as f:
    raw = f.read()
merge = yaml.safe_load(raw)

providers = merge.get("rule-providers", {})
groups = merge.get("proxy-groups", [])
rules = merge.get("rules", [])

report = {"dropped_rules": [], "provider_mapping": [], "skipped_ip_providers": []}


# ---------------------------------------------------------------------------
# FlClash 覆写脚本 (override.js)
# ---------------------------------------------------------------------------
def build_override_js():
    base = {
        k: merge[k]
        for k in [
            "mode",
            "ipv6",
            "unified-delay",
            "tcp-concurrent",
            "log-level",
            "profile",
            "geodata-mode",
            "geo-auto-update",
            "geo-update-interval",
        ]
        if k in merge
    }
    parts = []
    parts.append("""// FlClash 覆写脚本 (由 clash-rules 仓库 scripts/generate.py 自动生成)
// ============================================================
// 用法: FlClash → 工具 → 覆写 → 新建/导入, 粘贴本文件内容,
//       然后将该覆写应用到全部订阅(全局)或指定订阅。
// 等价于 Clash Verge 的「全局扩展配置」, 修改规则请编辑
// clash-verge/global-merge.yaml 后重新运行生成脚本。
// ============================================================
""")
    parts.append("const BASE = %s;\n" % json.dumps(base, ensure_ascii=False, indent=2))
    parts.append("const DNS = %s;\n" % json.dumps(merge.get("dns", {}), ensure_ascii=False, indent=2))
    parts.append("const SNIFFER = %s;\n" % json.dumps(merge.get("sniffer", {}), ensure_ascii=False, indent=2))
    parts.append("const RULE_PROVIDERS = %s;\n" % json.dumps(providers, ensure_ascii=False, indent=2))
    parts.append("const PROXY_GROUPS = %s;\n" % json.dumps(groups, ensure_ascii=False, indent=2))
    parts.append("const RULES = %s;\n" % json.dumps(rules, ensure_ascii=False, indent=2))
    parts.append("""
function main(config) {
  Object.assign(config, BASE);
  config.dns = DNS;
  config.sniffer = SNIFFER;
  config["rule-providers"] = RULE_PROVIDERS;
  config["proxy-groups"] = PROXY_GROUPS;
  config.rules = RULES;
  return config;
}
""")
    return "\n".join(parts)


# ---------------------------------------------------------------------------
# Shadowrocket 配置 (shadowrocket.conf)
# ---------------------------------------------------------------------------
SUB_PLACEHOLDER = "https://YOUR_SUBSCRIPTION_URL"

# ipcidr 类型 provider 的小火箭替代方案(跳过, 原因记录在 report)
IP_PROVIDER_REASON = {
    "private-ip": "已有显式私网 IP-CIDR 规则覆盖",
    "cn-ip": "已有 GEOIP,CN 规则覆盖",
    "google-ip": "域名集已覆盖主要域名, 免去额外下载",
    "telegram-ip": "已有显式 Telegram IP-CIDR 规则覆盖",
}

# mihomo provider / geosite 名称 -> MetaCubeX .list 文件名
# (merge 中 provider 名与 geosite 目录名一致的直接映射)


def geosite_list_url(name):
    return "%s/geosite/%s.list" % (META, name)


def sr_regex_from_exclude(exclude):
    """mihomo exclude-filter '(?i)a|b|c' -> 小火箭可用负向前瞻"""
    body = exclude
    if body.startswith("(?i)"):
        body = body[len("(?i)"):]
    return "(?i)^(?!.*(?:%s)).+$" % body


def sr_regex_exclude_include(exclude, include):
    body = exclude
    if body.startswith("(?i)"):
        body = body[len("(?i)"):]
    inc = include
    if inc.startswith("(?i)"):
        inc = inc[len("(?i)"):]
    inc = inc.strip()
    if inc.startswith("(") and inc.endswith(")"):
        inc = inc[1:-1]
    return "(?i)^(?!.*(?:%s))(?=.*(?:%s)).+$" % (body, inc)


def build_sr_groups():
    lines = []
    for g in groups:
        name = g["name"]
        gtype = g.get("type")
        exc = g.get("exclude-filter")
        filt = g.get("filter")
        if gtype == "select" and "include-all-proxies" not in g:
            members = g.get("proxies", [])
            lines.append("%s = select, %s" % (name, ", ".join(members)))
        elif gtype == "url-test" and "include-all-proxies" in g:
            attrs = ["url-test", "policy-path = %s" % SUB_PLACEHOLDER]
            if filt:
                attrs.append("policy-regex-filter = %s" % sr_regex_exclude_include(exc, filt))
            else:
                attrs.append("policy-regex-filter = %s" % sr_regex_from_exclude(exc))
            attrs.append("url = %s" % g.get("url", "http://www.gstatic.com/generate_204"))
            attrs.append("interval = %d" % g.get("interval", 600))
            lines.append("%s = %s" % (name, ", ".join(attrs)))
        elif gtype == "select" and "include-all-proxies" in g:
            # 手动切换: 订阅节点 + 内置组
            attrs = ["select", "policy-path = %s" % SUB_PLACEHOLDER,
                     "policy-regex-filter = %s" % sr_regex_from_exclude(exc)]
            attrs += g.get("proxies", [])
            lines.append("%s = %s" % (name, ", ".join(attrs)))
        else:
            raise RuntimeError("未处理的代理组类型: %s" % g)
    return lines


def build_sr_rules():
    lines = []
    seen_domain_set = set()

    def add_domain_set(name, policy):
        key = (name, policy)
        if key in seen_domain_set:
            return
        seen_domain_set.add(key)
        lines.append("DOMAIN-SET, %s, %s" % (geosite_list_url(name), policy))
        report["provider_mapping"].append(name)

    for rule in rules:
        fields = [x.strip() for x in rule.split(",")]
        # 处理 IP-CIDR 中含逗号的 CIDR? mihomo 规则不含逗号分隔值, 直接拆分即可
        rtype = fields[0]
        if rtype in ("DOMAIN", "DOMAIN-SUFFIX", "DOMAIN-KEYWORD",
                     "IP-CIDR", "IP-CIDR6", "GEOIP"):
            policy = fields[-1] if fields[-1] not in ("no-resolve",) else fields[-2]
            args = fields[1:-1] if fields[-1] != "no-resolve" else fields[1:-2]
            if rtype == "GEOIP" and fields[1] == "private":
                report["dropped_rules"].append((rule, "小火箭不支持 GEOIP,private, 已由显式 IP-CIDR 规则覆盖"))
                continue
            if fields[-1] == "no-resolve":
                lines.append("%s, %s, %s, no-resolve" % (rtype, ", ".join(args), policy))
            else:
                lines.append("%s, %s, %s" % (rtype, ", ".join(args), policy))
        elif rtype == "PROCESS-NAME":
            report["dropped_rules"].append((rule, "小火箭不支持 PROCESS-NAME, 已丢弃"))
            continue
        elif rtype == "RULE-SET":
            name, policy = fields[1], fields[2]
            noresolve = fields[-1] == "no-resolve"
            behavior = providers.get(name, {}).get("behavior")
            if behavior == "domain":
                add_domain_set(name, policy)
            elif behavior == "ipcidr":
                report["skipped_ip_providers"].append(
                    (name, IP_PROVIDER_REASON.get(name, "跳过")))
            else:
                raise RuntimeError("未知 provider behavior: %s (%s)" % (name, rule))
        elif rtype == "GEOSITE":
            name, policy = fields[1], fields[2]
            add_domain_set(name, policy)
        elif rtype == "MATCH":
            lines.append("FINAL, %s" % fields[1])
        else:
            raise RuntimeError("未处理的规则类型: %s" % rule)
    return lines


def build_sr_conf():
    out = []
    out.append("""# Shadowrocket 配置 (由 clash-rules 仓库 scripts/generate.py 自动生成)
# ============================================================
# 用法:
#   1. 下载本文件到本地
#   2. 将下方所有 YOUR_SUBSCRIPTION_URL 替换为你的订阅链接
#      (支持 Clash 格式订阅)
#   3. Shadowrocket → 配置 → + → 从文件/剪贴板导入
#   4. 规则更新后: 重新下载本文件并再次替换订阅链接后导入
# ============================================================

[General]
dns-server = 223.5.5.5, 119.29.29.29, https://dns.alidns.com/dns-query, https://doh.pub/dns-query
fallback-dns-server = https://dns.cloudflare.com/dns-query, https://dns.google/dns-query
ipv6 = false
""")
    group_lines = build_sr_groups()
    rule_lines = build_sr_rules()
    out.append("[Proxy Group]")
    out.extend(group_lines)
    out.append("")
    out.append("[Rule]")
    out.extend(rule_lines)
    out.append("")
    return "\n".join(out)


# ---------------------------------------------------------------------------
# 主流程
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="从 clash-verge/global-merge.yaml 生成 FlClash 覆写脚本和小火箭配置")
    parser.add_argument(
        "--sub", metavar="URL",
        help="你的订阅链接: 额外生成已填好链接的 shadowrocket/shadowrocket.local.conf (被 .gitignore 忽略, 不入库)")
    args = parser.parse_args()

    js = build_override_js()
    with open(FLCLASH_OUT, "w", encoding="utf-8") as f:
        f.write(js)
    print("✅ 生成 %s (%d bytes)" % (FLCLASH_OUT, len(js.encode("utf-8"))))

    conf = build_sr_conf()
    with open(SR_OUT, "w", encoding="utf-8") as f:
        f.write(conf)
    print("✅ 生成 %s (%d bytes, %d 组, %d 条规则)" % (
        SR_OUT, len(conf.encode("utf-8")), len(groups), len(rules)))

    if args.sub:
        local_path = os.path.join(ROOT, "shadowrocket", "shadowrocket.local.conf")
        with open(local_path, "w", encoding="utf-8") as f:
            f.write(conf.replace(SUB_PLACEHOLDER, args.sub))
        print("✅ 生成 %s (订阅链接已自动填入, 不会提交到仓库)" % local_path)
        print("   小火箭导入这个 local 文件即可, 规则更新后重新运行本命令再导入一次")
    print("\n--- 规则集 -> DOMAIN-SET 映射 (%d 个) ---" % len(report["provider_mapping"]))
    for n in report["provider_mapping"]:
        print("   ", n)
    print("\n--- 跳过的 ipcidr 规则集 ---")
    for n, why in report["skipped_ip_providers"]:
        print("   ", n, "->", why)
    print("\n--- 丢弃的规则 ---")
    for r, why in report["dropped_rules"]:
        print("   ", r, "->", why)
