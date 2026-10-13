# Approved increment plan

**Status:** Manual draft prepared on 2026-10-13; awaiting human acceptance. No planner agent was invoked for this draft.

## Work item and contract version

LAB01_INCREMENT_PLAN; contract version 1.0. The contract and source are authoritative. The outcome is a local draft release proposal with transparent readiness evidence; no tester, MES, production system, or published release is controlled.

## Current SHA and known dirty changes

Base SHA: `56912ba8fbb3291a85c9edf147aa4020442db5b8`. The current branch contains uncommitted Lab 1 findings, readiness evidence, usage row, and five agent profiles. Refresh the SHA and evidence after each subsequent commit.

## Branch name and target pull request

Keep one lab per branch and pull request, merged through the protected default branch. Lab 1 uses `lab1/agents-governance` and targets `main`. Proposed later branches: `lab2/mcp-release-context`, `lab3/domain-readiness`, `lab4/api-snapshot`, `lab4/ui-release-view`, `lab5/concurrency-observability`, and `lab6/approved-change-request`. Lab 4 API and UI work remain separate pull requests.

## User outcome and exclusions

Product managers can compare backlog items and prepare a capacity-constrained local draft with clear blockers and current evidence. Preserve the contract boundary: no publication, production authorization, arbitrary file/shell tools, or writes through MCP. Feature notes are untrusted data. Add no packages or build steps.

## Allowed files and owner

- Lab 1: `.github/agents/*.agent.md` and `evidence/*`; the human owns model selection, evidence, and final acceptance.
- Lab 2: `mcp/tools.mjs` release-context seam and `mcp/usage.mjs` token estimation, result budgeting, and metadata-only usage records. Tool engineer owns MCP changes.
- Lab 3: `src/domain.mjs` score and readiness seams. Implementer owns domain behavior; business rules remain only in this module.
- Lab 4 API: `src/proposals.mjs` snapshot validation, plus the minimum existing server wiring only if a failing acceptance test proves it is needed. API implementer owns this branch.
- Lab 4 UI: `web/release-view.mjs` release headline, draft eligibility, pending state, and blocker lines. UI implementer owns this branch.
- Lab 5: `src/concurrency.mjs`, `src/retry.mjs`, and `src/metrics.mjs` version checks, bounded transient-read retry, nearest-rank percentiles, and bounded request metrics.
- Lab 6: approved change-request and contract-version scope only after the product owner approves the specific change; add new tests rather than changing supplied tests.

## Implementation sequence

1. Complete Lab 1 governance and evidence; verify the five profiles are discoverable and their effective models match the configured values.
2. Lab 2 adds one-release context retrieval and privacy-preserving tool usage accounting. Use `pm-tool-engineer` with Claude Sonnet 5 for implementation and `pm-reviewer` with Claude Sonnet 5 for review.
3. Lab 3 implements the exact score formula and readiness blockers. Use `pm-implementer` with Claude Sonnet 5, then `pm-reviewer` with Claude Sonnet 5.
4. Lab 4 API revalidates previews and idempotency before drafting; the separate UI branch renders usable states and explanations. Use `pm-implementer` with Claude Sonnet 5 on each branch and `pm-reviewer` with Claude Sonnet 5.
5. Lab 5 implements stale-version rejection, bounded read retry, and bounded metrics. Use `pm-implementer` with Claude Sonnet 5 and `pm-reviewer` with Claude Sonnet 5.
6. Lab 6 begins only after a human-approved change request; use `pm-planner` with GPT-5.6 Luna to scope it, then the role-appropriate implementer and reviewer.
7. `pm-coordinator` with GPT-5.6 Luna may route only to `pm-planner` and `pm-reviewer`; record observed worker calls, not narrated calls.

Models are policy-enabled choices and prices are per million tokens from GitHub's current pricing page: GPT-5.6 Luna, $0.20 input / $1.20 output; Claude Sonnet 5, $2.00 input / $10.00 output. Confirm each model resolves in the VS Code picker before relying on it.

## API and UI acceptance

- Preserve the contract response shapes: features retrieval returns `{contractVersion, revision, items}`; preview returns contract version, revision, release, sorted feature IDs, capacity, effort, eligibility, blockers, and snapshot hash; proposal creation returns `{proposal, replayed}`.
- The priority score is `reach * impact * confidence / effort`; sort unrounded scores descending and break ties by ID. Round only the displayed score.
- Release selection must contain 1-12 unique existing IDs, all ready and matching the release. Dependencies must be done or selected; selected dependencies follow the same constraints. Detect cycles and capacity excess using integer hundredths.
- The UI preserves selection across filters, shows explanatory blockers and effort/capacity, disables drafting while pending or blocked, and never represents a draft as published.
- A changed or tampered preview returns `STALE_PREVIEW`/409; a fresh blocked preview returns `BLOCKED_RELEASE`/422. Same-key/same-payload replay returns the existing draft; same-key/different-payload returns `KEY_REUSE`/409.

## Checks and failure scenarios

- Every lab: `npm run preflight`, focused lab command, `npm run guard:test`, `npm run ci:accepted`, and `npm run perf` as applicable; update evidence to the exact tested SHA.
- Lab 2: `npm run lab:02`; test unknown tool/ID, invalid schema arguments, oversized list truncation, fail-closed non-list results, and absence of argument/result text in telemetry.
- Lab 3: `npm run lab:03`; test invalid estimates, status/release mismatch, missing dependencies, cycles, excess capacity, sorting ties, and unchanged inputs.
- Lab 4: `npm run lab:04`; test stale/tampered snapshots, changed workspace revision, blocked draft, idempotent replay, key reuse, pending UI, and explanatory blocker lines.
- Lab 5: `npm run lab:05`; test stale or missing versions, retry bounds and aborts, percentile edge cases, bounded windows, fixed route cardinality, and error counts.
- Lab 6: focused new tests plus the accepted suite and full `npm test` when the capstone is complete. Do not weaken budgets or existing tests to pass.

## Suites to add to ci/accepted-suites.json

Append `tests/lab02.test.mjs` and `tests/usage.test.mjs` for Lab 2; `tests/lab03.test.mjs` for Lab 3; `tests/lab04.test.mjs` for Lab 4; `tests/lab05.test.mjs` and `tests/observability.test.mjs` for Lab 5; add new capstone test files only when their criteria are approved. Never remove an accepted suite or edit/delete a supplied test to make a check pass.

## Rollback and preserved evidence

Revert only the implementation commit through a new pull request if needed; keep source observations, actual check output, and usage records. If a later commit changes a reviewed candidate, repeat focused checks, capture evidence for the new SHA, and review that candidate afresh. Never reset a shared branch or rewrite pushed history.

## Product decisions

The product owner must decide any change to contract rules, scope, dependency policy, release capacity expectations, tool policy, model choice, new dependency, or performance budget. Keep all proposal states local and draft-only. Any deliberate test, budget, or gate change requires its corresponding written reason in the pull request and human review.

## Human approval name and time

Prepared for ArvinRaj2418 on 2026-10-13. Human acceptance is pending review of this draft.