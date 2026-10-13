# Usage and performance report

Generated 2026-10-13T03:38:37.825Z from evidence/agent-usage.csv, runtime\telemetry\mcp-usage.jsonl.

Observed usage is what you read from your Copilot usage view before and after a work item, in GitHub AI Credits (current billing) or premium requests (legacy annual plans). It is not estimated: an empty value stays "not observed". AI Credits are computed from input, output and cached tokens at the model's price, so the context you send (instructions, attachments and tool results such as the MCP estimates below) is the part you control. MCP token figures use the ceil(characters / 4) heuristic and are estimates, not tokenizer counts.

## Agent work items

| Lab | Pass | Agent | Model | Prompts | Observed usage | Peak context % | Accepted | Rework cycles |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2 | build | manual | not-observed | 1 | not observed | n/a | no | 0 |
| 2 | evidence | manual | not-observed | 0 | not observed | n/a | no | 0 |

Accepted work items: 0. Prompts per accepted work item: n/a. Rework cycles: 0.
No observed usage recorded; compare prompts, rework and context instead.

| Model | Prompts | Observed usage |
| --- | --- | --- |
| not-observed | 1 | not observed |

## MCP tool results entering model context

| Tool | Calls | Est. tokens total | Est. tokens max | Errors | Truncated | Mean ms |
| --- | --- | --- | --- | --- | --- | --- |
| get_contract | 2 | 41 | 41 | 0 | 0 | 0.69 |
| get_feature | 3 | 154 | 80 | 0 | 0 | 0.62 |
| get_release_context | 2 | 510 | 510 | 0 | 0 | 0.46 |
| list_features | 3 | 1419 | 971 | 0 | 1 | 15.22 |

Estimated tool-result tokens across 10 calls: 2124.

## HTTP performance

Run with --metrics while the server is running to include live route percentiles.
