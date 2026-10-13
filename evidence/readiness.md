# Readiness record

Engineer and date: ArvinRaj2418 (Git identity); 2026-10-13.
Node and VS Code versions: Node v24.14.1; VS Code version not observed.
Git branch and actual SHA: lab1/agents-governance; checked-out baseline SHA 56912ba8fbb3291a85c9edf147aa4020442db5b8. Agent profiles and evidence updates on this branch are not yet committed.
GitHub repository URL, where it lives (organisation or personal, public or private) and your role (must be Admin): https://github.com/ArvinRaj2418/pmw-arvinraj2418; personal account, public, repository owner/Admin. Public fallback confirmed.
Ruleset applied (API or UI route), bypass list (must be empty) and the three required checks listed: Settings > Rules > Rulesets UI; protect-main active on the default branch; bypass list empty; accepted-checks, performance-budget, governance-guard required with strict up-to-date checks.
Direct push rejected (paste the rejection line): `remote: error: GH013: Repository rule violations found for refs/heads/main.` GitHub also reported: `Changes must be made through a pull request.` The temporary empty test commit was reset to origin/main.
Copilot plan, organisation policy and billing model (GitHub AI Credits, or legacy premium requests on an annual Pro or Pro+ plan): Managed by intel-innersource; GitHub Copilot settings show AI Credits. Specific plan tier not observed.
Copilot usage at start of day (credits or percentage of budget, and where you read it): Start-of-day reading not captured. Current observed reading: 204 / 30,000 AI Credits at GitHub Settings > Copilot > Features > Usage on 2026-10-13.
Models available in the picker and their price per million input and output tokens (GitHub models and pricing page): Account policy enables GPT-5.6 Luna ($0.20 input / $1.20 output) and Claude Sonnet 5 ($2.00 input / $10.00 output), per million tokens, per current GitHub pricing page. Model lines use these choices; exact VS Code picker resolution remains unverified.
Context window indicator visible in chat (yes/no): Not observed yet.
Chat debug view available (yes/no): Not observed yet.
Session target and model per agent profile: Target is this VS Code workspace. Configured: pm-planner and pm-coordinator use GPT-5.6 Luna; pm-implementer, pm-tool-engineer and pm-reviewer use Claude Sonnet 5. Agent picker selection/effective model not yet verified.
Loaded agent files and actual tools: Five profiles now exist in .github/agents/. Configured tools match the policy: planner has read/search/productWorkbench reads; implementer and tool engineer have read/search/edit/execute; reviewer has read/search; coordinator has read/search/agent and only pm-planner/pm-reviewer workers. Picker discovery not yet verified.
MCP protocol route and observed call: Not observed yet.
Baseline command exit and counts: `npm run baseline` exit 0, 8/8; `npm run guard:test` exit 0, 9/9; `npm run ci:accepted` exit 0, 8/8; `npm run perf` exit 0, both budgets passed. `npm test` exit 1, 27 pass and 30 intentional starter failures.
Browser observations: GitHub repo is public and contains the pushed baseline on main. Initial `ci` workflow and Dependabot workflow appeared after push.
Live operations not yet demonstrated: Copilot agent discovery/effective model selection, start-of-day usage baseline, context-window/debug-view availability, MCP client invocation, and secret-scanning push protection availability.
