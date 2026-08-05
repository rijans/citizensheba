# Agent discovery and AI usage signals

We want agents to understand and cite the Directory, but we do not want our content used as AI training data by default. We will ship a build-generated `/llms.txt` for curated agent discovery, express `search=yes`, `ai-input=yes`, `ai-train=no` via Cloudflare-oriented `robots.txt` Content Signals plus known AI crawler rules, and mirror that policy in an advisory `/.well-known/ai.txt`. We rejected treating `ai.txt` as the sole control plane because it is not a ratified, widely enforced standard.
