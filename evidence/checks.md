# Validation record

Populate this file from actual execution. Do not mark a check as passed from an agent summary alone.

For every checkpoint record:

- Work item and lab:
- Candidate SHA and any dirty source changes:
- Command and working directory:
- Execution time and Node version:
- Pass/fail/selected check totals:
- Relevant actual output or approved output-file path:
- Interpretation and next action:

## Lab 1 source and guard findings

Starting state: fresh extract with no Git repository, branch, or candidate SHA yet. These local checks are observed against the extracted files; they are not evidence for a committed candidate.

- `node --version`: v24.14.1.
- `npm run baseline`: 8 tests, 8 pass, 0 fail.
- `npm test`: 57 tests, 27 pass, 30 fail. The full suite includes deliberate lab failures; CI uses only `ci/accepted-suites.json` so the required check starts green and grows as labs are completed.
- `npm run guard:test`: 9 tests, 9 pass, 0 fail.
- CI has `accepted-checks` and `performance-budget` on pull requests and pushes to `main`; `governance-guard` runs only on pull requests. The `edited` pull-request event reruns the guard when a pass checkbox in the description changes.

### The twelve implementation seams

- `LAB02_CONTEXT_START` in `mcp/tools.mjs`: implement bounded release-context retrieval.
- `LAB02_USAGE_START` in `mcp/usage.mjs`: estimate tokens as the ceiling of result characters divided by four.
- `LAB02_BUDGET_START` in `mcp/usage.mjs`: truncate oversized list results and fail closed for other oversized results.
- `LAB02_RECORD_START` in `mcp/usage.mjs`: record usage metadata without argument values or result text.
- `LAB03_SCORE_START` in `src/domain.mjs`: implement reach times impact times confidence divided by effort.
- `LAB03_READINESS_START` in `src/domain.mjs`: report status, release, dependency, cycle, and capacity blockers.
- `LAB04_SNAPSHOT_START` in `src/proposals.mjs`: recompute readiness and reject stale or altered preview snapshots.
- `LAB04_VIEW_START` in `web/release-view.mjs`: derive the release headline, draft eligibility, and explanatory lines.
- `LAB05_VERSION_START` in `src/concurrency.mjs`: reject missing or stale feature versions before saving.
- `LAB05_RETRY_START` in `src/retry.mjs`: retry transient reads within the configured bounded attempt count.
- `LAB05_PERCENTILE_START` in `src/metrics.mjs`: compute the nearest-rank percentile of sorted durations.
- `LAB05_RECORD_START` in `src/metrics.mjs`: maintain bounded route durations and request/error counts.

### Governance guard review

- `ROLE_SIGNOFF`: requires Build, Evidence, and Review pass checkboxes; only doing the passes and ticking them clears the findings.
- `SUITE_REMOVED` and `SUITES_INVALID`: hard failures; restore every previously accepted suite and repair invalid JSON.
- `TEST_CHANGED`: changing or deleting an existing test needs a `Test change reason:` with at least 10 characters; added test files are allowed.
- `BUDGET_LOOSENED`: a reason with a measurement is required for a valid budget relaxation; `BUDGET_INVALID` is a hard failure.
- `TOKEN_BUDGET_CHANGED`: restore `PMW_TOKEN_BUDGET` to `1500` or provide a `Budget change reason:`; invalid MCP JSON is a hard failure.
- `PROFILE_INVALID`, `PROFILE_UNKNOWN`, `TOOLS_MISSING`, `TOOLS_INVALID`, `TOOL_NOT_ALLOWED`, `WORKER_NOT_ALLOWED`, and `MODEL_MISSING`: hard failures requiring a valid known profile, explicit policy-compliant tools/workers, and a concrete model name.
- `GATE_CHANGED`: changing a policy, ruleset, guard, or workflow needs a `Policy change reason:`.
- Accepted reasons have at least 10 characters, contain no angle brackets, and do not begin with `n/a`, `none`, or `tbd`.
- The guard reads policy from the base commit so a profile cannot authorize itself by changing policy in the same pull request. CI likewise runs the base commit's `scripts/guard.mjs`, preventing a candidate from weakening the guard that judges it.
- CI passes the pull-request description as `PR_BODY` environment data, rather than interpolating free text into a shell script.
- The guard checks only its encoded mechanical subset. It cannot judge product/code correctness or verify that a human actually performed a pass; the fresh-chat Review pass must inspect the complete diff. Shared Copilot instructions, scoped instructions, MCP implementation/config beyond the checked token budget, and other CI files depend on human review.

Separate a subprocess MCP probe from a live client invocation. Record the invoked tool, arguments, returned revision/contract and observed client activity separately. A later source change requires validation against that new candidate.
