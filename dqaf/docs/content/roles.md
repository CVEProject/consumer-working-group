---
layout: document
title: "CVE Consumer Working Group DQAF — Role Inventory"
document_file: roles.md
status: draft
---

# CVE DQAF: Role Inventory

This document is the supporting role and task family inventory for the CVE Data Quality Assessment Framework project. It records the roles, task families, and practitioner questions identified during Phase 1. The consolidated task list derived from this document is in `tasks.md`.

The hierarchy (Sector → Role → Task Family) exists to ensure systematic coverage — that we don't miss a role or a task family because we didn't think to look. Once tasks are identified under each task family, they are promoted to the flat task list in `tasks.md` with role/sector attribution as metadata.

See also: [Task List](tasks).

## How to Read This Document

**Sector** — the broad functional context in which CVE data is used.
**Role** — a function (not a job title) within that sector whose work has a direct or traceable dependency on CVE data.
**Task Family** — a cluster of related tasks performed by that role.
**Task** — a practitioner question: what the practitioner is trying to determine or accomplish. Stated without presupposing what CVE data contributes.

A role qualifies if a CVE record or CVE ID is a direct input to at least one task it performs.
A task qualifies if CVE data is a traceable input and significant degradation in CVE record quality would produce worse outcomes.

Tasks marked `[thin]` need additional work before Phase 2 promotion.

## Sector: Enterprise

Organizations that consume CVE data to manage vulnerability risk across a technology estate.

### Role: Enterprise:Vulnerability Analyst

The primary direct consumer of CVE records in the enterprise. Operates scanner-mediated workflows at scale. Heavy dependency on both CVE ID and record content.

#### Task Family: Enterprise:Vulnerability Analyst:Detection

Identifying which vulnerabilities exist in the environment. Scanner output references CVE IDs. Includes forward lookup, reverse lookup, and full-coverage questions.

- Which assets in my environment are affected by this vulnerability?
- Are there known vulnerabilities affecting this product or library?
- Do I have complete vulnerability coverage across my technology estate?
- A null result from a product search — does it mean no known vulnerabilities exist, or that this product is unknown to the CVE program?
- A null result from an asset search — does it mean we don't have this product, or that our inventory uses a different name for it?

**Supporting references:**
- [How can I see all CVEs that relate to a specific product/build?](https://learn.microsoft.com/en-us/answers/questions/527685/how-can-i-see-all-cves-that-relate-to-a-specific-p) — practitioner asking directly how to do the forward lookup task; also raises the false negative / false positive concern
- [CVE and Patch Management Strategy (EZO)](https://ezo.io/assetsonar/blog/nist-cvss-and-patch-management-strategy/) — describes filtering CVEs against asset inventory; captures the forward-lookup workflow

#### Task Family: Enterprise:Vulnerability Analyst:Triage and Validation

Confirming scanner findings are real and applicable to the specific deployment.

- Is this scanner finding a false positive?
- Does this vulnerability apply to our specific configuration or deployment?
- Is the vulnerable component actually present and reachable in our environment?
- Is this CVE a duplicate of one we are already tracking?
- Has this CVE been disputed, rejected, or withdrawn?

**Supporting references:**
- [snyk vs npm audit — false positives documentation](https://github.com/lirantal/snyk-vs-npm-audit) — documents cases where scanners report CVEs as present in versions that are actually patched; directly illustrates the false positive triage task
- [Software Composition Analysis (Minimus)](https://www.minimus.io/post/software-composition-analysis) — describes "presence-based matching" producing false positives; reachability analysis as the triage mechanism

#### Task Family: Enterprise:Vulnerability Analyst:Risk Assessment

Scoring confirmed findings to understand exposure. Uses CVE record content supplemented by external signals. Distinct from prioritization — this is about the inherent risk of the vulnerability, not the order in which it gets fixed.

- How severe is this vulnerability? (i.e. What is the CVSS Score?)
- How likely is this vulnerability to be exploited?
	- Is this vulnerability being actively exploited in the wild right now?
	- Is public exploit code available for this vulnerability?
	- What are the conditions for successful exploitation of this vulnerability?
	- Does the attack require network access, adjacent access, or local access?
	- Does exploitation require authentication or user interaction?
- What is the potential impact if this vulnerability is exploited in our environment?

**Supporting references:**
- [Need to prioritize security bug patches? Don't forget to scan Twitter as well as use CVSS scores (The Register)](https://www.theregister.com/2022/01/19/twitter_cvss_vulnerabilites/) — CVSS insufficient as a risk signal; practitioners supplementing with exploit availability and exploitation evidence
- [Vulnerability Threat Intelligence (Wiz)](https://www.wiz.io/academy/threat-intel/vulnerability-threat-intelligence) — documents that 28.3% of exploited CVEs were weaponized within one day of publication; contextualizes the urgency of exploitation status as a risk input

#### Task Family: Enterprise:Vulnerability Analyst:Prioritization

Ordering the remediation queue given all constraints: risk score, asset criticality, business impact, resource availability, and regulatory deadlines. Both the Vulnerability Analyst and the Remediation Coordinator contribute to prioritization from different perspectives: the analyst brings risk scoring, the coordinator brings operational and business constraints.

- How does this vulnerability rank relative to others in our current remediation queue?
- Which vulnerabilities must be addressed by a specific regulatory deadline?
- Which vulnerabilities can be deferred with documented risk acceptance?
- Is this vulnerability being exploited in attacks against organizations in our sector?
- Does the business impact of patching this system outweigh the risk of leaving it unpatched until the next maintenance window?

**Supporting references:**
- [Vulnerability Management is Hard! How do you prioritize what to patch? (Medium)](https://medium.com/@jorgeorchilles/vulnerability-management-is-hard-how-do-you-prioritize-what-to-patch-1fc8e163d740) — practitioner account of the prioritization problem; describes CVSS, EPSS, KEV, and threat intel as inputs; explicitly names the business context dimension
- [Risk Scoring in Vulnerability Management (HivePro)](https://hivepro.com/blog/risk-scoring-vulnerability-management-2/) — covers environmental factors, asset criticality, and threat intelligence as required prioritization inputs beyond CVSS

#### Task Family: Enterprise:Vulnerability Analyst:Reporting and Metrics

Producing dashboards, executive summaries, KPI reports, and trend analyses. `[thin]`

- What is our current vulnerability exposure by severity and asset class?
- How has our vulnerability posture changed over time?
- Are we meeting our remediation SLAs?

**Supporting references:** Pending. This task family needs targeted research before Phase 2 promotion.

### Role: Enterprise:Remediation Coordinator

Translates prioritized CVE findings into executable remediation plans and drives them to closure. The function that goes from "this CVE" to "here are the steps we take during the patch window."

#### Task Family: Enterprise:Remediation Coordinator:Prioritization

This task family is shared with Enterprise:Vulnerability Analyst. The Remediation Coordinator's contribution is operational and business context: downtime cost, resource constraints, patch window scheduling, and regulatory deadlines.

- In what order should we remediate our confirmed vulnerabilities given our available resources and windows?
- Which patch windows are available for each affected system?
- What is the operational cost of patching this system now versus deferring?
- Which vulnerabilities require emergency out-of-band patching outside the normal cycle?

**Supporting references:**
- [Vulnerability Management is Hard! (Medium)](https://medium.com/@jorgeorchilles/vulnerability-management-is-hard-how-do-you-prioritize-what-to-patch-1fc8e163d740) — describes Patch Tuesday cadence and emergency out-of-band patching decisions as distinct operational questions
- [Microsoft patches six serious vulnerabilities being actively exploited (TechRadar)](https://www.techradar.com/news/microsoft-patches-six-serious-security-vulnerabilities-that-were-being-actively-exploited) — "a CVE with a score of 5.2 that is being actively exploited must take center stage" — captures the emergency prioritization override

#### Task Family: Enterprise:Remediation Coordinator:Fix Identification

Determining what resolves the vulnerability and how to obtain it.

- What version or patch resolves this vulnerability?
- Where do I obtain the patch or update?
- Are there known issues or prerequisites for applying this patch?
- Is a patch available, or is only a workaround or compensating control possible?
- What does the vendor recommend as the remediation action?

**Supporting references:**
- [How can I see all CVEs that relate to a specific product/build? (Microsoft Q&A)](https://learn.microsoft.com/en-us/answers/questions/527685/how-can-i-see-all-cves-that-relate-to-a-specific-p) — practitioner explicitly trying to map patch releases to CVE coverage; fix identification is the stated goal
- [Responding to Dependency Alerts (UK MoJ runbook)](https://runbooks.operations-engineering.service.justice.gov.uk/documentation/internal/dependency-alerts.html) — operational runbook showing "check to see if a patched version exists" as the first action step after CVE identification

#### Task Family: Enterprise:Remediation Coordinator:Patch Planning and Execution

Building and executing the patch plan. `[thin]`

- What are the steps to apply this patch in our environment?
- What testing is required before deploying to production?
- What is the back-out procedure if the patch causes problems?
- Which systems need to be patched and in what sequence?

**Supporting references:** Pending. This task family needs targeted research before Phase 2 promotion.

#### Task Family: Enterprise:Remediation Coordinator:Remediation Verification

Confirming vulnerabilities are actually closed, not just administratively closed.

- Has the patched asset been rescanned and confirmed clean?
- Is the asset now running a version that resolves the vulnerability?
- Are there any affected assets that were missed in the initial remediation pass?
- What is the difference between a ticket being closed and a vulnerability being fixed?

**Supporting references:**
- [ISO 27001 Management of Technical Vulnerabilities (HightTable)](https://hightable.io/iso-27001-annex-a-8-8-management-of-technical-vulnerabilities/) — auditors look for "Remediation Gap" evidence; rescanning and version confirmation as the standard for demonstrating closure
- [Patch Management Audit Checklist (Action1)](https://www.action1.com/blog/patch-management-audits-what-actually-matters-and-what-doesnt/) — distinguishes patch coverage (administrative) from verified remediation (empirical); "patch failure rate" as a distinct metric

### Role: Enterprise:GRC / Compliance Analyst

Maps CVE data to regulatory obligations, tracks SLA compliance, and generates audit evidence. The question this role answers is not "how bad is this" but "can we prove we addressed it within the required timeframe."

#### Task Family: Enterprise:GRC / Compliance Analyst:Regulatory Mapping

Identifying which CVEs carry mandatory remediation obligations.

- Which of our open CVEs are subject to mandatory remediation deadlines under applicable regulations?
- Is this CVE on the CISA Known Exploited Vulnerabilities catalog, triggering a BOD 22-01 obligation?
- Which regulatory framework governs the remediation timeline for this CVE in our environment?
- What is the required remediation window for this CVE under our applicable frameworks?

**Supporting references:**
- [How to Track and Report Patch Compliance for ISO, SOC 2, HIPAA (Splashtop)](https://www.splashtop.com/blog/how-to-track-and-report-patch-compliance-for-iso-soc-2-hipaa) — documents PCI DSS, HIPAA, SOC 2, GDPR patching requirements; CVE-based reports as the compliance evidence artifact
- [Vulnerability Compliance: What It Is, Key Requirements, and How to Meet Them (AccountableHQ)](https://www.accountablehq.com/post/vulnerability-compliance-what-it-is-key-requirements-and-how-to-meet-them) — maps PCI DSS, HIPAA, NIST, ISO 27001 to specific vulnerability management requirements

#### Task Family: Enterprise:GRC / Compliance Analyst:SLA Tracking and Compliance Monitoring

Monitoring whether the VM program is meeting its commitments.

- Are we meeting our CVE remediation SLAs by severity tier?
- Which CVEs are past their required remediation deadline?
- What is our compliance rate for critical CVEs within the mandated window?
- Which teams or systems are consistently missing remediation deadlines?

**Supporting references:**
- [Maintaining SLA Compliance for CVEs Without Available Fixes (Medium)](https://medium.com/@itsspss/maintaining-sla-compliance-for-cves-without-available-fixes-a9baac533cc6) — practitioner account of SLA tracking when patches don't exist; documents the compliance clock starting from CVE publication
- [How to Set SLA for Vulnerability Management with Lansweeper](https://www.lansweeper.com/blog/itam/how-to-set-sla-for-vulnerability-management-with-lansweeper/) — describes SLA definition, tracking, and evidence requirements; CVE severity as the SLA tier trigger

#### Task Family: Enterprise:GRC / Compliance Analyst:Audit Evidence Generation

Producing documentation that proves the vulnerability management program operated as required.

- Can we demonstrate we identified this CVE within a reasonable time of publication?
- Can we demonstrate we remediated this CVE within the required window?
- What documentation exists for this CVE's full remediation lifecycle — from detection to closure?
- Can we demonstrate that compensating controls were in place for CVEs we could not patch?

**Supporting references:**
- [ISO 27001 Management of Technical Vulnerabilities (HightTable)](https://hightable.io/iso-27001-annex-a-8-8-management-of-technical-vulnerabilities/) — lists specific audit documentation requirements: scan reports, change logs, risk assessments, asset inventory; auditors look for the "remediation gap"
- [Patch Management Audit Checklist (Action1)](https://www.action1.com/blog/patch-management-audits-what-actually-matters-and-what-doesnt/) — specific audit checklist items including SLA adherence, patch failure rate, exception management, and rollback capability

#### Task Family: Enterprise:GRC / Compliance Analyst:Risk Acceptance and Exception Management

Documenting decisions to defer or not patch a CVE.

- Is a patch available for this CVE?
- What compensating controls are in place that reduce the risk of leaving this CVE unpatched?
- Is the residual risk of deferring this CVE acceptable under our risk tolerance?
- What documentation is required to formally accept the risk of not patching this CVE within the normal window?

**Supporting references:**
- [Maintaining SLA Compliance for CVEs Without Available Fixes (Medium)](https://medium.com/@itsspss/maintaining-sla-compliance-for-cves-without-available-fixes-a9baac533cc6) — covers compensating control documentation, PCI DSS compensating control memo requirements, and exception process for unpatched CVEs
- [ISO 27001 Management of Technical Vulnerabilities (HightTable)](https://hightable.io/iso-27001-annex-a-8-8-management-of-technical-vulnerabilities/) — ISO 27001 requires documenting risk acceptance when patch unavailable; compensating controls as the documented alternative

### Role: Enterprise:Application Security Engineer

Manages the application security testing program within the enterprise software development lifecycle. Runs and interprets SAST, DAST, and SCA tooling, triages findings, provides remediation guidance to developers, and tracks the application vulnerability backlog. CVE data dependency is strong for SCA (dependency vulnerabilities) and weak to indirect for SAST/DAST (first-party code weaknesses, which are primarily described by CWE rather than CVE).

#### Task Family: Enterprise:Application Security Engineer:Dependency Vulnerability Detection

Identifying known vulnerabilities in third-party and open-source components used by the application. SCA tooling produces findings keyed to CVE IDs. Strong direct CVE data dependency.

- What known vulnerabilities exist in our application's third-party dependencies?
- Which CVEs affect packages in our direct dependency tree?
- Which CVEs affect packages in our transitive dependency tree that we did not explicitly include?
- Do any of our dependencies have vulnerabilities with no available fix?

**Supporting references:**
- [How to Handle Dependency Vulnerability Scanning (OneUptime)](https://oneuptime.com/blog/post/2026-01-24-dependency-vulnerability-scanning/view) — describes the full SCA workflow; transitive dependency risk and the Log4Shell example (CVE-2021-44228) as the canonical case for why transitive dependency scanning matters
- [Software Composition Analysis (Minimus)](https://www.minimus.io/post/software-composition-analysis) — "95% of vulnerable dependencies in Java applications were never declared by the developer" — directly supports the transitive dependency detection task

#### Task Family: Enterprise:Application Security Engineer:Dependency Vulnerability Triage

Determining whether a CVE present in a dependency is actually exploitable in the application's specific usage. The dominant false positive problem in SCA: a CVE counts as "present" if the package is installed, but the vulnerable code path may never be called. Research consistently shows 60–80% of SCA alerts are unreachable in practice.

- Is the vulnerable code path in this dependency actually reachable from our application code?
- Does our usage of this package invoke the function or behavior described in the CVE?
- Is this SCA finding a false positive due to presence-based matching rather than actual exploitability?
- Does this CVE affect a code path that is only exercised in test or development environments, not production?

**Supporting references:**
- [Top 10 SCA Tools in 2026 (Endor Labs)](https://www.endorlabs.com/learn/best-sca-tools-05b7a) — documents reachability analysis as the mechanism for eliminating 60–80% of SCA false positives; presence-based matching as the source of noise
- [Reachability Analysis for SCA (Pixee)](https://www.pixee.ai/resource-center/software-supply-chain-security/reachability-analysis) — Endor Labs 2024 benchmark: reachability suppresses 60–80% of false positives in Java/Python; explains CVE "present" vs CVE "reachable" distinction directly

#### Task Family: Enterprise:Application Security Engineer:Dependency Vulnerability Remediation

Resolving confirmed dependency vulnerabilities. The primary action is upgrading to a fixed version, but this introduces its own risk — breaking changes, incompatible APIs, cascading upgrades through the dependency tree.

- What version of this package resolves the vulnerability?
- Does upgrading to the fixed version introduce breaking changes to our application?
- If the fixed version is not compatible, is there a workaround that removes the vulnerable code path?
- If no fix exists, what is the risk of continuing to use this dependency?
- Can we replace this dependency with an alternative that is not affected?

**Supporting references:**
- [The Complete Developer's Guide to npm audit (Medium)](https://medium.com/@divyanshu.1810/the-complete-developers-guide-to-npm-audit-securing-your-node-js-projects-7798dd0b0fe4) — practical guide to the upgrade decision; breaking changes, `npm audit fix --force`, and fallback strategies
- [Why npm Audit Is Broken (PkgPulse)](https://www.pkgpulse.com/guides/why-npm-audit-is-broken) — documents ecosystem-wide friction in dependency remediation; Dependabot for automated fix PRs; case for accepting that some CVEs are not actionable

#### Task Family: Enterprise:Application Security Engineer:First-Party Vulnerability Management

Managing security weaknesses found in code the organization wrote itself, through SAST, DAST, code review, or external reports. Note: findings here are primarily described by CWE (weakness type), not CVE. CVE enters this workflow when an external party discovers and reports a vulnerability and a CVE ID is assigned, or when the engineer researches how similar vulnerabilities have been exploited elsewhere. `[thin — CVE dependency indirect]`

- What weakness type is this finding, and what class of vulnerability does it represent?
- Has this weakness pattern been exploited in similar software? (CVE corpus as reference)
- Has an external researcher reported a vulnerability in our software and been assigned a CVE?
- What is the severity of this weakness relative to others in our backlog?

**Supporting references:**
- [Remediation at Scale (Semgrep)](https://semgrep.dev/resources/remediation-at-scale/) — dataset of 50,000+ repos; fix rates by OWASP/CWE category; median SAST fix rate 16.8%; Authentication and Injection findings have the highest average age in backlogs

### Role: Enterprise:Developer

Writes application code and receives security findings from AppSec tooling via IDE alerts, pull request checks, and CI/CD pipeline failures. Primarily acts on findings rather than discovering them. CVE data dependency is strong when remediating dependency alerts, weak when fixing first-party code weaknesses (which arrive as CWE-keyed findings).

#### Task Family: Enterprise:Developer:Dependency Alert Response

Responding to a security alert on a third-party package. The developer's starting point is a CVE ID and a package name surfaced by a scanner or bot (Dependabot, Snyk, npm audit). Their job is to understand the finding and take action.

- What does this CVE actually describe — what is the vulnerable behavior in this package?
- Does this vulnerability affect the way our code uses this package?
- What version should I upgrade to in order to resolve this?
- Will upgrading break anything in our codebase?
- If I cannot upgrade now, is there a way to suppress or mitigate this finding with documentation?

**Supporting references:**
- [How can I fix this security vulnerability flagged by a dependency scanner? (GitHub Community)](https://github.com/orgs/community/discussions/182616) — practitioner asking the exact sequence of questions in this task family; requests CVE number as a starting point; illustrates the gap between "scanner found it" and "I know what to do"
- [Why npm Audit Is Broken (PkgPulse)](https://www.pkgpulse.com/guides/why-npm-audit-is-broken) — describes developer workflow: CI fails on critical CVE, developer must triage whether it's real, find fix, verify it doesn't break tests

#### Task Family: Enterprise:Developer:First-Party Vulnerability Remediation

Fixing a security weakness identified in the developer's own code by SAST, DAST, code review, or a reported CVE. CVE data dependency here is indirect — the primary reference is CWE and OWASP category, but a CVE may be cited when the finding came from an external report or when the developer researches exploitation patterns. `[thin — CVE dependency indirect]`

- What is the correct fix for this weakness in my code?
- Does the CVE or CWE associated with this finding describe how it has been exploited, and does that inform the fix?
- Has this been fixed in similar open-source codebases I can reference?

**Supporting references:**
- [Remediation at Scale (Semgrep)](https://semgrep.dev/resources/remediation-at-scale/) — fix rate data by OWASP/CWE category; shows which weakness types stall in backlog vs get fixed quickly

## Sector: Threat Intelligence and Detection Engineering

Roles that consume CVE data to understand, track, and detect exploitation activity. Distinct from the Enterprise sector in that the primary question is not "are we affected?" but "is this being exploited, by whom, and can we detect it?"

### Role: Threat Intelligence and Detection Engineering:Cyber Threat Intelligence Analyst

Tracks threat actors and campaigns, correlates CVEs to adversary activity, monitors exploitation status, and enriches the VM prioritization process with real-world threat context. Answers the question the CVE record cannot: who is actively using this vulnerability and against whom.

#### Task Family: Threat Intelligence and Detection Engineering:Cyber Threat Intelligence Analyst:Vulnerability Intelligence Monitoring

Continuously tracking the CVE landscape for newly disclosed vulnerabilities relevant to the organization, before the formal VM scanning cycle catches up.

- Is this newly published CVE relevant to software or systems in our environment?
- Is this CVE already being weaponized before a patch is available?
- How quickly after publication is this CVE appearing in exploitation activity?
- Is there credible intelligence about this CVE that predates its formal publication?

**Supporting references:**
- [A Day in the Life of a Senior Threat Intelligence Analyst (Kraven Security)](https://kravensecurity.com/a-day-in-the-life-of-a-senior-threat-intelligence-analyst/) — CTI team identifies new vulnerabilities and determines if they meet a minimum impact threshold requiring immediate patching; describes the pre-VM-cycle monitoring function directly
- [Vulnerability Threat Intelligence (Wiz)](https://www.wiz.io/academy/threat-intel/vulnerability-threat-intelligence) — 28.3% of exploited CVEs weaponized within one day of publication; frames CTI monitoring as a speed-of-response necessity

#### Task Family: Threat Intelligence and Detection Engineering:Cyber Threat Intelligence Analyst:Threat Actor and Campaign Correlation

Linking CVE identifiers to known threat actor behavior, campaign activity, and adversary infrastructure. Answers who is using a vulnerability, not just whether it is being used.

- Which threat actors are known to exploit this CVE?
- Is this CVE associated with ransomware groups or nation-state actors relevant to our sector?
- Does this CVE appear in active campaign reports or dark web chatter?
- What MITRE ATT&CK techniques does exploitation of this CVE map to?
- Is exploitation of this CVE part of a known attack chain with other CVEs?

**Supporting references:**
- [Vulnerability Threat Intelligence: A Guide for Security Leaders (Deepwatch)](https://www.deepwatch.com/glossary/vulnerability-threat-intelligence/) — "Linking vulnerabilities to attacker groups (e.g., FIN7 exploiting Citrix ADC flaws) helps organizations assess their heightened risk based on their industry sector or geopolitical exposure"
- [Real-Time Cyber Threat Intelligence Platform (Bitsight)](https://www.bitsight.com/products/cyber-threat-intelligence) — MITRE ATT&CK auto-mapping to CVEs; dark web chatter correlation as a threat actor signal

#### Task Family: Threat Intelligence and Detection Engineering:Cyber Threat Intelligence Analyst:Exploitation Status Assessment

Determining the real-world exploitation status of a CVE beyond what the CVE record itself states.

- Is this CVE being actively exploited in the wild right now?
- Is public proof-of-concept exploit code available for this CVE?
- How long after publication did active exploitation begin?
- Is this CVE on the CISA KEV catalog?
- Is exploitation observed broadly or only in targeted campaigns against specific sectors?

**Supporting references:**
- [Vulnerability Threat Intelligence (Wiz)](https://www.wiz.io/academy/threat-intel/vulnerability-threat-intelligence) — documents the methodology for determining real-world exploitation status; CISA KEV, EPSS, and attack path analysis as the primary signals
- [XWiki CVE-2025-24893 Exploited in the Wild (VulnCheck)](https://www.vulncheck.com/blog/xwiki-cve-2025-24893-eitw) — concrete example: CVE not in CISA KEV but actively exploited; illustrates the gap between official exploitation status and observed reality

#### Task Family: Threat Intelligence and Detection Engineering:Cyber Threat Intelligence Analyst:Intelligence Production `[thin]`

Translating CVE-based threat intelligence into actionable products for internal consumers — VM teams, SOC, and leadership.

- Which CVEs in our environment are being exploited by actors that target organizations like ours?
- What is the intelligence-adjusted priority order for our open CVE backlog?

**Supporting references:**
- [A Day in the Life of a Senior Threat Intelligence Analyst (Kraven Security)](https://kravensecurity.com/a-day-in-the-life-of-a-senior-threat-intelligence-analyst/) — CTI team produces outputs that feed into VM team remediation decisions; describes the handoff function

### Role: Threat Intelligence and Detection Engineering:SOC Analyst

Reactive, alert-driven. Encounters CVE IDs in SIEM and EDR alerts and looks them up to understand what an alert means and how to respond. CVE dependency is real but relatively narrow — they need rapid characterization, not deep research.

#### Task Family: Threat Intelligence and Detection Engineering:SOC Analyst:Alert Triage

An alert has fired referencing a CVE. The SOC analyst needs to understand what the vulnerability is, whether the alert represents a real exploitation attempt, and how serious it is.

- What vulnerability does the CVE referenced in this alert describe?
- Is this alert likely a true positive exploitation attempt or a false positive?
- How severe is the vulnerability being targeted?
- Does the affected system in this alert actually run the vulnerable software?
- What is the expected behavior of a successful exploit of this CVE?

**Supporting references:**
- [Alert Triage Process: The Complete SOC Analyst's Guide (CyberDefenders)](https://cyberdefenders.org/blog/alert-triage-process/) — describes the full triage workflow including IOC lookup, threat intelligence enrichment, and CVE severity as a triage input
- [Alert Triage — Investigation Workflow for SOC Analysts (NetworkersHome)](https://www.networkershome.com/fundamentals/siem-soc/alert-triage-investigation-workflow/) — step-by-step triage including CVE-referenced alert context; asset criticality as a triage filter

#### Task Family: Threat Intelligence and Detection Engineering:SOC Analyst:Exploitation Investigation

A confirmed or suspected exploitation attempt is being investigated. The CVE record informs what artifacts and behaviors to look for.

- What does successful exploitation of this CVE look like in logs and telemetry?
- What post-exploitation behavior typically follows from this CVE?
- Was this exploitation attempt successful, or was it blocked?

**Supporting references:**
- [Alert Triage — Investigation Workflow for SOC Analysts (NetworkersHome)](https://www.networkershome.com/fundamentals/siem-soc/alert-triage-investigation-workflow/) — investigation phase following triage; describes pivoting on IOCs and correlating log evidence to determine whether exploitation succeeded

### Role: Threat Intelligence and Detection Engineering:Detection Engineer

Builds and maintains detection rules — Sigma, Snort/Suricata, YARA, EDR behavioral rules — that enable the SOC analyst's work. Has the most demanding CVE record content requirements of any role in the scaffold.

**Critical finding:** The standard detection engineering workflow for a new CVE is: (1) locate proof-of-concept exploit code, (2) study the attack mechanism from the PoC, (3) write detection logic, (4) validate. The CVE record is not the primary input to step 2 — the PoC or researcher write-up is. CVE records rarely provide the protocol-level behavioral specifics needed to write a network signature: what request pattern triggers the vulnerability, what the exploit payload looks like, what observable artifacts successful exploitation produces. CVSS vectors give coarse indicators but nothing close to rule-writing specificity. This is a structural data quality failure for this role.

#### Task Family: Threat Intelligence and Detection Engineering:Detection Engineer:Detection Coverage Assessment

Determining whether current detection rules cover a given CVE and identifying gaps.

- Do we currently have detection coverage for exploitation of this CVE?
- Does a community rule (Sigma, Emerging Threats) already exist for this CVE?
- Which high-priority CVEs in our environment have no detection coverage?
- If our current detection for this CVE fired, would it catch real exploitation or only the specific PoC it was written from?

**Supporting references:**
- [Automated detection gap analysis with GitLab Duo (GitLab)](https://about.gitlab.com/blog/automating-detection-gap-analysis-with-gitlab-duo-agent-platform) — describes detection gap analysis as a systematic practice; "a detection gap is exactly what it sounds like: an attacker took an action, and your detections didn't catch it"
- [Automated detection rule generation for cloud CVEs (arxiv)](https://arxiv.org/pdf/2604.01977) — "NVD published over 15 times more high-severity vulnerabilities than an internal team could manually create detection rules for"; directly quantifies the coverage gap problem

#### Task Family: Threat Intelligence and Detection Engineering:Detection Engineer:Detection Rule Development

Writing new detection rules for a CVE. The CVE record is the starting point but frequently insufficient — detection engineers must supplement it with PoC code, vendor advisories, and researcher write-ups to get behavioral specifics.

- What observable network, host, or log behavior does exploitation of this CVE produce?
- What protocol-level payload or request pattern characterizes this exploit?
- What process, file, or registry activity does successful exploitation create?
- At what point in the exploitation chain can we reliably detect this attack?
- What legitimate behavior might produce similar signals and generate false positives?

**Supporting references:**
- [Automated detection rule generation for cloud CVEs (arxiv)](https://arxiv.org/pdf/2604.01977) — describes the manual rule-writing workflow: analyze PoC, write detection logic, validate; frames why CVE records are insufficient as the sole input
- [Threat Detection with Sigma Rules (Loginsoft)](https://www.loginsoft.com/post/threat-detection-with-sigma-rules) — example of writing a Sigma rule from a CVE (CVE-2009-3898); shows what behavioral specifics are needed; illustrates that the CVE record alone does not supply them
- [About Sigma (SigmaHQ)](https://sigmahq.io/docs/guide/about.html) — Sigma rule format; tags include CVE numbers and ATT&CK techniques; illustrates how CVE IDs appear in detection rule metadata

#### Task Family: Threat Intelligence and Detection Engineering:Detection Engineer:Rule Validation and Tuning

Ensuring detection rules work correctly without generating excessive false positives.

- Does this rule correctly fire against known exploitation traffic for this CVE?
- What legitimate traffic pattern is triggering false positives in this rule?
- How do I tune this rule to reduce noise without losing detection fidelity?
- Has the exploitation technique for this CVE evolved in ways that require rule updates?

**Supporting references:**
- [Writing Effective Detection Rules With Sigma, YARA, and Suricata (GBHackers)](https://gbhackers.com/writing-effective-detection-rules-with-sigma-yara-and-suricata/) — describes the false positive / coverage tradeoff in rule writing; tuning methodology; overly broad vs overly narrow rules

## Sector: Generalist IT

IT practitioners who manage vulnerability response without dedicated security specialization. They encounter CVE records directly — often reading cve.org or NVD cold — without the tooling, context, or expertise that enterprise VM roles bring. The CVE record is their primary or only data source. Poor record quality has the highest impact here because there is no analyst expertise or toolchain to fill gaps.

Two variants: the internal IT generalist managing a single organization, and the MSP technician managing multiple SMB client environments simultaneously.

### Role: Generalist IT:IT Generalist

The de facto vulnerability program in organizations without dedicated security staff. Receives CVE IDs from vendor emails, news headlines, basic scanner alerts, or tickets from a manager. Reads the CVE record directly and must determine what it means, whether the organization is affected, and what to do — without a VM platform, security toolchain, or specialized expertise.

#### Task Family: Generalist IT:IT Generalist:CVE Comprehension

Reading a CVE record and understanding it well enough to make a decision. The primary failure mode for this role is a record that requires expertise the generalist doesn't have to interpret — CVSS vector strings, CPE URIs, jargon-heavy descriptions, or descriptions that assume familiarity with the affected technology.

- What software or system does this CVE affect?
- What does this vulnerability actually do if exploited?
- How serious is this? What does the CVSS score mean in plain terms?
- Who would want to exploit this and why?

**Supporting references:**
- [What are and how to read CVEs (DEV Community)](https://dev.to/gpiechnik/what-are-and-how-to-read-cves-common-vulnerabilities-and-exposures-39lc) — the existence of this explainer is itself evidence of the task; written for practitioners who need a CVE record decoded for them
- [CVEs: What You Need to Know (IBM Community)](https://community.ibm.com/community/user/blogs/himanshu-k/2025/05/13/cves-what-you-need-to-know) — plain-language CVE comprehension guide targeting non-specialist IT staff and managers; "whether you are a security professional, a developer, or an IT manager"

#### Task Family: Generalist IT:IT Generalist:Applicability Determination

Determining whether the organization is affected, without a VM platform to automate the matching.

- Do we use the affected software?
- Are we running a version that is affected?
- Does our configuration or deployment match the conditions described in the CVE?
- If the record says we might be affected, how do we verify?

**Supporting references:**
- [How can I see all CVEs that relate to a specific product/build? (Microsoft Q&A)](https://learn.microsoft.com/en-us/answers/questions/527685/how-can-i-see-all-cves-that-relate-to-a-specific-p) — practitioner explicitly trying to determine applicability for a specific build of Windows 10; no VM platform; manual lookup against Microsoft patch notes
- [CVE and Patch Management Strategy (EZO)](https://ezo.io/assetsonar/blog/nist-cvss-and-patch-management-strategy/) — "if CVE-2025-12345 is a Firefox browser bug and none of your company machines use Firefox, you can safely ignore it" — describes applicability determination as the first manual filter step

#### Task Family: Generalist IT:IT Generalist:Fix Identification and Action

Finding out what to do and doing it.

- Is there a patch available?
- Where do we get the patch and how do we apply it?
- If there is no patch yet, is there a workaround?
- How urgent is this — can we wait for the next maintenance window, or do we need to act now?
- How do we verify that the fix worked?

**Supporting references:**
- [Windows Defender Vulnerability: What MSPs Need to Know (Guardz)](https://guardz.com/blog/windows-defender-vulnerability-what-msps-need-to-know-to-protect-small-businesses/) — illustrates the fix identification task from the generalist perspective: "no customer action required" vs "manual patch required" as the key determination; vendor recommendation as the primary source
- [Responding to Dependency Alerts (UK MoJ runbook)](https://runbooks.operations-engineering.service.justice.gov.uk/documentation/internal/dependency-alerts.html) — operational runbook showing the full fix identification and action sequence for a non-specialist context

### Role: Generalist IT:MSP Technician

Manages vulnerability response across multiple SMB client environments simultaneously. Same core tasks as the IT Generalist, multiplied across a client book of business, with the additional requirement to communicate CVE risk to non-technical business owners. Also faces the MSP-as-target problem: the MSP's own tooling (RMM platforms, remote access tools) can itself be the CVE target, with client environments as downstream victims.

#### Task Family: Generalist IT:MSP Technician:Multi-Client Exposure Assessment

Determining which clients are affected by a given CVE across a heterogeneous client estate.

- Which of my clients are running the affected software?
- Which clients are running affected versions?
- Which clients represent the highest risk and should be prioritized?
- Are any of my own management tools or RMM platforms affected by this CVE?

**Supporting references:**
- [The MSP Vulnerability Management Playbook (ConnectSecure)](https://connectsecure.com/msp-vulnerability-management-playbook) — describes multi-client CVE exposure assessment as the core MSP vulnerability management function; automated scanning across client tenancies
- [ConnectWise ScreenConnect CVEs: MSP Security Risk Guide (ITECS)](https://itecsonline.com/post/connectwise-screenconnect-cve-vulnerabilities-msp-security-risk) — concrete example of MSP-as-target: MSP's own tooling carries the CVE; clients need to verify their MSP is patched; documents the MSP self-assessment task

#### Task Family: Generalist IT:MSP Technician:Client Communication

Translating CVE technical content into client-appropriate language for non-technical business owners.

- How do I explain what this vulnerability means to a client with no technical background?
- Do I need to contact this client about this CVE, or is it low enough risk to handle silently?
- What do I tell the client they need to do, if anything?
- How do I document what we did in response to this CVE for the client's records?

**Supporting references:**
- [Windows Defender Vulnerability: What MSPs Need to Know (Guardz)](https://guardz.com/blog/windows-defender-vulnerability-what-msps-need-to-know-to-protect-small-businesses/) — "small businesses often lack the expertise to understand the nuances of cybersecurity; MSPs must fill this gap"; documents the MSP client communication function directly

#### Task Family: Generalist IT:MSP Technician:Remediation Coordination

Scheduling and executing patching across multiple client environments. Similar to Enterprise:Remediation Coordinator but without the organizational infrastructure of a formal change management process. `[thin]`

- Which clients need an emergency patch window versus a standard maintenance window?
- How do we patch across clients without disrupting their business operations?

**Supporting references:**
- [Key Vulnerability Remediation Steps MSPs Should Follow (ConnectSecure)](https://connectsecure.com/blog/vulnerability-remediation-key-steps-for-msps-to-strengthen-client-security) — prioritize → patch → verify → document workflow across multiple client environments
- [MSP Patch Management Best Practices (Syncro)](https://syncrosecure.com/blog/msp-patch-management-best-practices/) — documents MSP-specific patch scheduling constraints; "29% of vulnerabilities show exploitation activity on or before the day they are publicly disclosed"

## Sector: Software Producers

Organizations and individuals who produce software and bear responsibility for publishing CVE records when vulnerabilities are found in their products. This sector is the source of CVE data — the decisions made here directly determine the quality of data all other sectors consume.

CVE records are primarily an **output** for this sector. However, CVE data is also an input in two specific tasks: checking for duplicate CVEs before publishing a new one, and assessing whether a known CVE in a third-party dependency affects their own product.

**Critical structural finding:** The CVE schema's `affected` array — the field that specifies which product versions are vulnerable — is explicitly documented as a quality problem at the source. CVEProject/cve-schema issue #364 states: "the format is very flexible... data consumers may have trouble... we don't have detailed guidance on how to define and use products and versions." The product identification and version matching failures experienced by downstream consumers are rooted in decisions made in this sector.

**Update volume finding:** In 2024, CVE records received 108,933 updates against 40,274 new publications — a 2.7:1 ratio. Updates represent advancing knowledge: better characterization, corrected version ranges, updated exploitation status, and improved references. The update volume is a sign the ecosystem is maturing. The quality concern is downstream: whether consumer pipelines reliably detect and propagate those updates.

### Role: Software Producers:PSIRT / Security Response Coordinator

Manages the full lifecycle of vulnerability response at a software vendor: receives inbound reports, triages, coordinates with engineering teams, manages disclosure timelines and embargoes, notifies downstream parties, assigns or reserves CVE IDs, and publishes CVE records and customer advisories. For large vendors this is a dedicated team; for smaller organizations it may be a single person or shared responsibility.

#### Task Family: Software Producers:PSIRT / Security Response Coordinator:Vulnerability Intake and Triage

Receiving a vulnerability report and determining what it is: whether it is real, whether it is in scope, whether it duplicates an existing CVE, and how serious it is.

- Is this report describing a genuine security vulnerability in our product?
- Is this vulnerability already covered by an existing CVE record?
- Is this vulnerability in our product or in a dependency we ship?
- How severe is this vulnerability — what is the risk to our customers?
- Has this vulnerability already been publicly disclosed?

**Supporting references:**
- [PSIRT Maturity Document (FIRST)](https://www.first.org/standards/frameworks/psirts/psirt_maturity_document) — industry framework for PSIRT functions; triage and intake as foundational PSIRT capability
- [Synopsys PSIRT and Vulnerability Disclosure Policy](https://www.synopsys.com/company/legal/vulnerability-disclosure-policy.html) — documents intake, triage, and internal coordination as the core PSIRT workflow

#### Task Family: Software Producers:PSIRT / Security Response Coordinator:Vulnerability Characterization

Reproducing and fully characterizing the vulnerability: what it is, how it works, what the affected scope is, and what the fix needs to address. This is the analytical work that feeds everything downstream — the CVE record, the advisory, and the fix.

- Can we reproduce this vulnerability?
- What is the root cause and what code or design decision causes it?
- Which versions of our product are affected?
- Which configurations or deployments are affected?
- What are the conditions under which the vulnerability is exploitable?
- What is the security impact?

**Supporting references:**
- [CVE FAQ — Description requirements (CVE.org)](https://www.cve.org/Resources/Media/Archives/OldWebsite/about/faqs.html) — lists what a CVE description should contain: product name, affected versions, vulnerability type, impact, access required — all outputs of characterization
- [GCVE Best Practices for Vulnerability Handling (GCVE)](https://gcve.eu/bcp/gcve-bcp-02/) — documents vendor responsibilities: assess and prioritize reports, fix based on risk, communicate updates

#### Task Family: Software Producers:PSIRT / Security Response Coordinator:CVE ID Management

Reserving, assigning, and managing CVE IDs throughout the disclosure lifecycle.

- Should this vulnerability receive a CVE ID?
- Which CNA is responsible for assigning the CVE ID — us, the upstream project, or a coordination body?
- When do we reserve the CVE ID relative to the disclosure timeline?
- Does this report describe one vulnerability or multiple distinct vulnerabilities requiring separate CVE IDs?
- What do we do with a reserved CVE ID if the vulnerability turns out not to be valid?

**Supporting references:**
- [CNAs and CVE Counting (NIST NVD)](https://nvd.nist.gov/general/cna-counting) — describes the CNA vetting process, counting rules, and what happens after ID assignment
- [CVE Numbering Authority — Python Software Foundation](https://policies.python.org/python.org/CVE-Numbering-Authority/) — concrete operational policy for CVE ID reservation, publication timing, and dispute handling from a real CNA

#### Task Family: Software Producers:PSIRT / Security Response Coordinator:Disclosure Coordination

Managing the timeline and communication of the disclosure: coordinating with the reporter, managing embargoes, notifying downstream OEM partners and integrators before public disclosure, and synchronizing patch availability with public knowledge.

- What disclosure timeline has the reporter requested, and is it realistic?
- Which downstream vendors or integrators need to be notified before public disclosure?
- Is there a coordinating body (CERT/CC, CISA) involved in this disclosure?
- Is the fix ready before the embargo deadline?
- Have all parties with a need to act before disclosure been given sufficient time?

**Supporting references:**
- [Guidelines and Practices for Multi-Party Vulnerability Coordination (FIRST)](https://www.first.org/global/sigs/vulnerability-coordination/multiparty/guidelines-v1.0) — multi-party coordination framework; documents downstream vendor notification, embargo management, and coordination body roles
- [CISA Coordinated Vulnerability Disclosure Program](https://www.cisa.gov/resources-tools/programs/coordinated-vulnerability-disclosure-program) — CISA's CVD program; simultaneous dissemination to all stakeholders as the goal

#### Task Family: Software Producers:PSIRT / Security Response Coordinator:Third-Party Dependency Vulnerability Response

When a CVE is published in a third-party library or component that the vendor ships as part of their product, the vendor must assess whether their product is affected, determine the fix, and notify customers. This task has CVE data as a direct input — the vendor is consuming a third-party CVE to assess their own product's exposure.

- Does our product ship the affected version of this third-party component?
- Is our product's use of this component affected by this CVE?
- What is the fix — upgrade the dependency, backport a patch, or fork?
- Do our customers need to take action, or can we resolve this transparently?
- Do we need to publish our own advisory or CVE for this third-party vulnerability as it affects our product?

**Supporting references:**
- [Guidelines and Practices for Multi-Party Vulnerability Coordination (FIRST)](https://www.first.org/global/sigs/vulnerability-coordination/multiparty/guidelines-v1.0) — "vendor should consider tracking the use of third-party components to develop better inventory and understanding of upstream and downstream dependencies"
- [How to handle upstream security patches (GitLab handbook)](https://handbook.gitlab.com/handbook/security/product-security/psirt/runbooks/upstream-security-patches) — concrete operational runbook for handling third-party CVEs in shipped dependencies; documents the monkey-patch and forking decisions

### Role: Software Producers:CNA Record Author

Writes the actual CVE record fields: description, affected product and version ranges, CVSS vector, CWE assignment, and references. May be the PSIRT coordinator or a dedicated role. This is the function whose output quality directly determines what every other sector in this framework receives. Decisions made here — about how to describe the vulnerability, how to express the affected version range, whether to include exploitation conditions — propagate through the entire ecosystem.

#### Task Family: Software Producers:CNA Record Author:CVE Record Authoring

Writing a CVE record that is accurate, complete, and useful to downstream consumers. The CVE schema specifies required fields but provides limited guidance on how to populate them well — particularly the affected product/version array.

- Does the description accurately capture what the vulnerability is, where it is, and what its impact is?
- Are the affected product and version ranges expressed in a way that tools and consumers can parse and match?
- Is the CVSS vector an accurate representation of the vulnerability's characteristics?
- Is the CWE assignment correct and specific enough to be useful?
- Are the references sufficient for downstream consumers to find the fix and additional context?
- Is the description comprehensible to a practitioner who does not have deep expertise in the affected product?

**Supporting references:**
- [CVE FAQ — Description requirements (CVE.org)](https://www.cve.org/Resources/Media/Archives/OldWebsite/about/faqs.html) — official guidance on what CVE descriptions should contain; also notes "if this information is not available to the submitter, not all descriptions will include all these details" — acknowledging the quality gap
- [CVE schema issue #364 — Guidance on defining products and versions (CVEProject GitHub)](https://github.com/CVEProject/cve-schema/issues/364) — documents the affected array complexity problem directly: "data consumers interpreting the information may have trouble... we don't have detailed guidance"

#### Task Family: Software Producers:CNA Record Author:CVE Record Maintenance

Updating a published CVE record when new information becomes available — additional affected versions, corrected CVSS, updated fix reference, dispute resolution, or new references. In 2024, CVE records received 2.7 updates per new publication, indicating that maintenance is a substantial ongoing function.

- Has new information emerged that makes the current record inaccurate or incomplete?
- Are there additional affected versions that should be added?
- Is the CVSS vector still accurate given new understanding of the vulnerability?
- Has a third party disputed the record, and is the dispute valid?
- Have downstream consumers or researchers identified errors in the record that need correction?

**Supporting references:**
- [CVE Numbering Authorities Guide (RadicalNotion)](https://radicalnotion.ai/cna-data-sources) — 108,933 CVE updates vs 40,274 new publications in 2024; documents the update volume and the categories of changes being made
- [CVEs and the NVD Process (NVD)](https://nvd.nist.gov/general/cve-process) — documents RESERVED, REJECTED, DISPUTED states and the conditions under which records are updated or corrected

### Role: Software Producers:Open Source Maintainer

An individual or small team that maintains open source software used by others, without a formal security function. Receives vulnerability reports through GitHub security advisories, email, or public disclosure, and must triage, fix, coordinate, and publish — often with no dedicated security staff, limited time, and volunteer capacity. The GitHub blog published a full step-by-step guide for this role because it is so frequently underprepared.

#### Task Family: Software Producers:Open Source Maintainer:Vulnerability Report Handling

Receiving a report and deciding what to do with it. The open source maintainer often lacks the security expertise to immediately evaluate severity or determine scope, and may be the first time they have encountered a formal vulnerability disclosure.

- Is this report describing a genuine security vulnerability or a bug?
- How do I triage this report without security expertise?
- Should I engage with the reporter, and what do I tell them while I investigate?
- Is this vulnerability already known and documented elsewhere?
- Do I need to involve other maintainers or a coordination body?

**Supporting references:**
- [What to do when you receive a vulnerability report (GitHub Blog)](https://github.blog/security/vulnerability-research/a-maintainers-guide-to-vulnerability-disclosure-github-tools-to-make-it-simple/) — written specifically for open source maintainers receiving their first security report; step-by-step guidance
- [Coordinated vulnerability disclosure for open source projects (GitHub Blog)](https://github.blog/security/vulnerability-research/coordinated-vulnerability-disclosure-cvd-open-source-projects/) — "often, the security report will be handled by developers who do not have a security background" — directly frames the competency gap

#### Task Family: Software Producers:Open Source Maintainer:CVE Assignment and Advisory Publication

Requesting a CVE ID, writing the advisory, and publishing. For open source projects that are CNAs, this is done directly; for others, the maintainer works through a platform (GitHub, HackerOne) or MITRE.

- Should this vulnerability receive a CVE ID?
- How do I request a CVE ID — through GitHub, through our CNA, or through MITRE?
- What information should the CVE record and advisory contain?
- When should I publish relative to fixing the vulnerability?
- How do I notify users so they know to update?

**Supporting references:**
- [What to do when you receive a vulnerability report (GitHub Blog)](https://github.blog/security/vulnerability-research/a-maintainers-guide-to-vulnerability-disclosure-github-tools-to-make-it-simple/) — covers CVE ID request as a discrete step in the maintainer workflow
- [Becoming a CNA as an open source org or project (OpenSSF)](https://github.com/ossf/wg-vulnerability-disclosures/blob/main/docs/guides/becoming-a-cna-as-an-open-source-org-or-project.md) — OpenSSF guidance for open source projects on CNA onboarding and CVE record publication workflow

## Sector: Tool and Data Ecosystem Builders

Organizations that build the infrastructure through which CVE data is transformed, normalized, enriched, and delivered to end consumers. This sector sits between the Software Producers who create CVE records and the consuming sectors who act on them. Data quality failures in CVE records are amplified here: a bad record ingested by a tool reaches every user of that tool.

The NVD enrichment collapse (NVD formally reduced to a triage queue as of April 2026, enriching only ~15-20% of new CVEs) has made this sector's function critical and contested. Tools that relied on NVD CPE data for matching are now blind to the majority of the CVE corpus. Large vendors have built independent enrichment pipelines; smaller ones have not.

### Role: Tool and Data Ecosystem Builders:Vulnerability Scanner and VM Platform Developer

Builds the scanning tools and vulnerability management platforms that enterprise consumers use to identify vulnerabilities in their environments. CVE data drives two core platform functions: detection coverage (what vulnerabilities the scanner knows how to find) and product identification (matching what the scanner finds to CVE records for a specific product and version).

The CPE coverage collapse is the most operationally significant current problem: NVD provided CPE identifiers for only 41.35% of 2024 CVEs. Scanners that rely on CPE-based matching are structurally blind to more than half the CVE population.

#### Task Family: Tool and Data Ecosystem Builders:Vulnerability Scanner and VM Platform Developer:CVE Data Ingestion and Coverage

Maintaining a current and complete CVE dataset as the foundation for scanning. This is not a one-time task — new CVEs appear continuously, records are updated frequently, and enrichment sources change.

- Are we ingesting new CVEs promptly enough that customers can detect newly disclosed vulnerabilities?
- Do we have coverage for CVEs that NVD has not enriched with CPE data?
- Are we propagating CVE record updates when characterization, affected versions, or severity changes?
- Which CVEs in our database lack the structured data needed for automated matching?
- Are we sourcing from cve.org directly, NVD, or additional enrichment layers — and what gaps does each source leave?

**Supporting references:**
- [NVD Enrichment Triage: Enterprise Vulnerability Programs Must Adapt (CSA)](https://labs.cloudsecurityalliance.org/research/csa-research-note-nist-nvd-enrichment-policy-change-20260419/) — "A CVE without CPE data is, from the perspective of most vulnerability scanners, effectively invisible"; documents that NVD CPE coverage was 41.35% in 2024
- [NVD Vulnerability Enrichment Crisis: Anchore's Solution](https://anchore.com/blog/nvd-crisis-one-year-later/) — describes what NVD enrichment provided and what its absence means for scanners; "un-enriched CVEs are not labeled with CPEs, so programmatic analysis is off the table"

#### Task Family: Tool and Data Ecosystem Builders:Vulnerability Scanner and VM Platform Developer:Product Identification and Matching

Mapping CVE product identifiers to the software and assets present in a customer's environment. This is the matching problem that produces false positives and false negatives in scanner output — the engineering manifestation of the identification quality failures documented throughout this scaffold.

- How do we map CPE strings in CVE records to the product names in customer asset inventories?
- How do we handle CVEs that lack CPE data entirely and require alternative matching strategies?
- For open source and package ecosystems, how do we match CVE records to purl and ecosystem-native coordinates?
- How do we reduce false positives from overly broad CPE matches without introducing false negatives?
- How do we handle version ranges expressed ambiguously or inconsistently across CNAs?

**Supporting references:**
- [Vulnerability Statistics 2026 (Stingrai)](https://www.stingrai.io/blog/vulnerability-statistics-2026) — "CPE-keyed asset matching against NVD will miss the majority of CVEs, regardless of whether they are Critical, High, or actively exploited"; enterprise programs need commercial enrichment or vendor advisories
- [VulnCPE: Context-Aware Cybersecurity Vulnerability Retrieval (arxiv)](https://arxiv.org/pdf/2505.13895) — academic analysis of CPE data inconsistencies producing false positives; documents naming inconsistencies and structural limitations

#### Task Family: Tool and Data Ecosystem Builders:Vulnerability Scanner and VM Platform Developer:SBOM and Package-Native Matching

For scanners and SBOM tools that match CVE records against software manifests and bills of materials, the product identification challenge requires ecosystem-native identifiers (purl, package coordinates) rather than CPE strings. CVE records that lack these identifiers are structurally unmatchable in this workflow regardless of their accuracy in other respects.

- Do CVE records for this package include purl or ecosystem-native package coordinates?
- How do we map between CPE identifiers and package-native identifiers when both are present?
- How do we handle CVEs that only have CPE data and no package coordinates for open source components?
- How do we keep our purl-to-CVE mapping current as packages release new versions?

**Supporting references:**
- [GCVE: Europe's CVE Alternative (Pixee)](https://www.pixee.ai/blog/europe-gcve-vulnerability-database-cve-alternative) — "security tools built around CVE identifiers now need to normalize data across multiple identifier systems"; GCVE as a concrete new source of identifier fragmentation

### Role: Tool and Data Ecosystem Builders:Vulnerability Database and Feed Aggregator

Builds and operates data infrastructure that aggregates CVE data from multiple sources, normalizes it, resolves cross-source identity, enriches it with additional signals, and redistributes it to downstream consumers. This includes databases like VulnCheck NVD++, OpenCVE, CVEFeed.io, OSV, GHSA, and commercial threat intelligence platforms.

This role is the most structurally exposed to CVE data quality failures: every gap, inconsistency, and naming irregularity in the raw data must be detected, corrected, or worked around before distribution. What is invisible to the database operator passes through uncorrected to every consumer downstream.

#### Task Family: Tool and Data Ecosystem Builders:Vulnerability Database and Feed Aggregator:Multi-Source Normalization

Raw CVE records arrive with inconsistent vendor names, product names, and version expressions. Normalization converts these into a consistent internal representation that enables reliable matching and deduplication.

- Is this vendor/product name in this CVE record the same entity as another name we have seen before?
- How do we normalize version range expressions that use different syntax across CNAs?
- How do we handle CVEs where the description contains product information not expressed in structured fields?
- How do we keep our normalization mapping current as new products and vendors appear?

**Supporting references:**
- [OpenCVE Enrichment: AI-Powered CVE Analysis (OpenCVE)](https://blog.opencve.io/posts/opencve-ai-cve-analysis/) — "the same vendor might appear as 'Foo Bar', 'foobar', or 'Foo Bar Software' across different CVEs"; documents their LLM + fuzzy matching normalization pipeline built to address this

#### Task Family: Tool and Data Ecosystem Builders:Vulnerability Database and Feed Aggregator:Cross-Source Identity Resolution

Determining when records from different sources — CVE, GHSA, OSV, JVN, NVD, vendor advisories, GCVE — describe the same underlying vulnerability, and producing authoritative cross-reference mappings.

- Is this GHSA record describing the same vulnerability as an existing CVE?
- Is this OSV entry for a package the same vulnerability as a CVE for the same software?
- When multiple sources disagree on severity, affected scope, or fix information, which is authoritative?
- How do we handle a vulnerability that has a CVE in one database and a GCVE identifier in another but no explicit cross-reference?

**Supporting references:**
- [Open Source Vulnerability schema (OpenSSF/OSSF)](https://ossf.github.io/osv-schema/) — the OSV `aliases` field is the formal mechanism for cross-source identity: "given two different entries claiming to describe the same id field, the one with the later modification time is considered authoritative"
- [GCVE: Europe's CVE Alternative (Pixee)](https://www.pixee.ai/blog/europe-gcve-vulnerability-database-cve-alternative) — documents the 24-48 hour gap where European vendors publish to GCVE before CVE appears in MITRE's queue; a concrete cross-source identity problem

#### Task Family: Tool and Data Ecosystem Builders:Vulnerability Database and Feed Aggregator:Enrichment and Signal Aggregation

Adding structured signals not present in the raw CVE record: CVSS scores where absent, CPE identifiers, exploit availability, KEV status, EPSS scores, threat actor attribution. This is the function that the NVD collapse has pushed onto commercial and community operators.

- Does this CVE have CVSS data, and if not, can we add it from another source?
- Does this CVE have CPE data, and if not, can we derive it from the description or vendor advisory?
- Is there exploit availability information (PoC, weaponized) that should be associated with this CVE?
- Is this CVE in the CISA KEV catalog, and is that status current?
- Is the EPSS score for this CVE current, and should it be included?

**Supporting references:**
- [VulnCheck Adds CPE Data to NVD++ (VulnCheck)](https://markets.financialcontent.com/woonsocketcall/article/bizwire-2024-3-25-vulncheck-adds-common-platform-enumeration-cpe-data-to-its-nvd-service-to-improve-vulnerability-prioritization) — documents VulnCheck building CPE enrichment to fill the NVD gap; "mapping software components to existing and new vulnerabilities is paramount for every cybersecurity company"
- [Danger is Still Lurking in the NVD Backlog (VulnCheck)](https://www.vulncheck.com/blog/nvd-backlog-exploitation-lurking) — documents how CISA Vulnrichment CVSS data flows into NVD; CVSS coverage improving through ADP contributions

### Role: Tool and Data Ecosystem Builders:ADP / Enrichment Operator

Organizations authorized as Authorized Data Providers (ADPs) that add structured data directly to CVE records on cve.org, making that enrichment part of the authoritative record rather than a separate database. CISA Vulnrichment is the canonical example, adding CVSS, CWE, CPE, and SSVC assessments directly to CVE records. The ADP model was the CVE program's response to the NVD enrichment collapse.

#### Task Family: Tool and Data Ecosystem Builders:ADP / Enrichment Operator:Record Enrichment

Adding structured fields to CVE records that CNAs did not include or included incorrectly. Each enrichment decision is a quality judgment with downstream consequences.

- Does this CVE record have a CVSS score, and if not or if incorrect, what is the accurate score?
- Does this CVE have CPE data sufficient for automated matching?
- Is the CWE assignment correct and specific enough to be analytically useful?
- What SSVC decision points apply to this CVE for our constituency?
- Are the references sufficient for downstream consumers to find vendor guidance?

**Supporting references:**
- [NVD news — CISA Vulnrichment integration (NIST)](https://nist.gov/itl/nvd/nvd-news) — "as of July 3, 2024, the NVD will support inclusion of data from CISA's Vulnrichment CVSS and CWE information"; documents the ADP-to-NVD data flow
- [Do We Need Yet Another Vulnerability Scoring System? (Bitsight)](https://www.bitsight.com/blog/do-we-need-yet-another-vulnerability-scoring-system-ssvc-thats-yass) — documents CISA Vulnrichment ADP scope; every vulnerability in vulnrichment has an SSVC assessment; over 20k CVEs enriched

#### Task Family: Tool and Data Ecosystem Builders:ADP / Enrichment Operator:Coverage Prioritization

Deciding which CVEs to enrich first given that complete coverage is not achievable. Prioritization decisions here directly determine which CVEs downstream tools can act on and which remain invisible.

- Which CVEs are highest priority for enrichment given current exploitation activity?
- Which CNAs are producing the most incomplete records, and should their records be enriched first?
- Is our enrichment coverage sufficient to support the compliance and operational needs of our constituency?
- Are there systematic gaps in our enrichment coverage — product categories, ecosystems, or CNA scopes we are not reaching?

**Supporting references:**
- [Enhancing cybersecurity through effective CVE management (CVE Foundation)](https://www.thecvefoundation.org/initiatives/2025/enhancing-cve) — "only about 20% of active CNAs began adding CVSS and CWE information" when encouraged; "there isn't any built-in support or checks on this enrichment"; documents the coverage and accuracy gaps in the ADP/CNA self-enrichment model
- [The Real Danger Lurking in the NVD Backlog (VulnCheck)](https://www.vulncheck.com/blog/nvd-backlog-exploitation) — "82% of CVEs with a proof-of-concept exploit have not been analyzed by NVD"; frames the prioritization problem: high-risk CVEs are underenriched

## Sector: Independent

Individuals who discover vulnerabilities in software they did not write and do not own, operating outside organizational security programs. CVE data functions as both an input (duplicate checking, target research) and an output (CVE ID as credential and coordination mechanism).

Two sub-populations with meaningfully different CVE data relationships: independent security researchers whose primary function is finding and disclosing vulnerabilities, and bug bounty hunters who work within organized programs and use CVE data more as a research input.

### Role: Independent:Security Researcher

Finds vulnerabilities through independent research in software they don't own — not through a formal bounty program scope. Responsible for coordinating disclosure with the vendor, managing disclosure timelines, and obtaining and publishing a CVE ID. The CVE ID serves both as a professional credential and as the coordination mechanism that ensures defenders can act on the finding.

#### Task Family: Independent:Security Researcher:Prior Art Research

Checking whether a vulnerability is already known and CVE-assigned before investing in disclosure. A zero-day is not a zero-day if it has already been identified. The quality of this check depends directly on CVE record searchability and description clarity. Poor descriptions make duplicate detection unreliable — researchers may unknowingly re-discover and re-disclose already-known vulnerabilities, wasting effort and creating duplicate CVEs.

- Has this vulnerability already been assigned a CVE?
- Is there a related CVE that might cover this vulnerability even if the description doesn't match my terminology?
- Has this been disclosed elsewhere — GitHub, ExploitDB, PacketStorm, vendor advisory — without a CVE?
- Is there a CVE reserved but not yet published that might describe the same issue?

**Supporting references:**
- [How to avoid headaches when publishing a CVE (HelpNetSecurity)](https://www.helpnetsecurity.com/2022/05/12/publishing-cve/) — "a zero-day is not a zero-day if it has been previously identified"; documents the duplicate check as the mandatory first step before disclosure
- [bogus-cves (GitHub)](https://github.com/vin01/bogus-cves) — documents CVE IDs being sought for non-vulnerabilities or disputed issues; illustrates that the CVE corpus has quality problems at the intake stage that affect prior art research reliability

#### Task Family: Independent:Security Researcher:Vendor Reporting and Disclosure Coordination

Reporting the vulnerability to the vendor and managing the disclosure timeline. This is the most conflict-prone part of the researcher workflow — vendors control the disclosure process, and researchers must navigate unresponsive or hostile vendors, disputed severity assessments, and deadline negotiations.

- Who is the correct contact at the vendor for security disclosures?
- Has the vendor acknowledged the report?
- Is the vendor cooperating, and are they working on a fix?
- What is an appropriate disclosure timeline, and what are my options if the vendor is unresponsive or disputes the finding?
- Should I extend the deadline given the vendor's stated progress?

**Supporting references:**
- [The Most Frustrating Vulnerability Disclosure of 2024 (DARKNAVY)](https://www.darknavy.org/darknavy_insight/the_most_frustrating_vulnerability_disclosure_of_2024/) — detailed case study of the Simone Margaritelli / CUPS disclosure; 50 pages of communication, vendor control over the process, CVSS disputes; documents the structural conflict in researcher-vendor disclosure coordination
- [The CVE Program Explained: How to Get a CVE (Bug Bounties)](https://bug-bounties.as93.net/learn/cve-program-explained-for-researchers/) — describes the full researcher disclosure workflow including vendor unresponsiveness and escalation paths (CERT/CC, MITRE)

#### Task Family: Independent:Security Researcher:CVE ID Acquisition

Obtaining a CVE ID assigned to the finding. The CVE ID must be requested from the appropriate CNA — determining which CNA is responsible is itself a task, and the process can be blocked by vendor non-cooperation, CNA response time, or disputes about whether the issue qualifies as a vulnerability.

- Which CNA should I request the CVE ID from — the vendor, a platform, or MITRE as CNA of last resort?
- What information does the CVE record need to contain for publication?
- How do I proceed if the vendor disputes the CVE or delays publication past the disclosure deadline?
- Is this issue being blocked from a CVE because the vendor considers it a feature, not a bug?
- Is the CVE ID stuck in RESERVED state, and what can I do?

**Supporting references:**
- [How to avoid headaches when publishing a CVE (HelpNetSecurity)](https://www.helpnetsecurity.com/2022/05/12/publishing-cve/) — step-by-step CVE request process from a researcher's perspective; covers response timing and what to do if MITRE doesn't respond
- [Found a Vulnerability? 3 Easy Steps to Submitting a CVE (Medium)](https://medium.com/@dub-flow/found-a-vulnerability-3-easy-steps-to-submitting-a-cve-012148533650) — practitioner account of the CVE request process; documents the "intransparent process" and the mandatory public reference requirement

#### Task Family: Independent:Security Researcher:Public Disclosure and Attribution

Publishing the finding after the patch is available, verifying the CVE record is accurate, and receiving credit for the discovery.

- Has sufficient time passed for the vendor to patch and for users to update?
- Does the published CVE record accurately describe my finding — correct severity, affected versions, description?
- Is my name credited in the CVE record?
- If another researcher discovered the same vulnerability independently, how is credit handled?

**Supporting references:**
- [CVE-2021-34193 duplicate issue (OpenSC GitHub)](https://github.com/OpenSC/OpenSC/issues/2841) — real-world case of duplicate CVEs created when multiple parties reported the same vulnerability to different CNAs; documents the coordination failure and resolution process
- [CVE for the new Java exploit? (ysoserial GitHub)](https://github.com/frohoff/ysoserial/issues/6) — practitioner discussion of attribution: "Oracle's policy is that only the researcher who disclosed the vuln to them will be given the CVE, if requested" — documents vendor control over attribution

### Role: Independent:Bug Bounty Hunter

Finds vulnerabilities through organized programs on platforms like HackerOne, Bugcrowd, and Intigriti. CVE data is primarily an input — used to understand a target's vulnerability history, find unpatched instances of known vulnerabilities, and verify that a finding is not a duplicate before submitting. Platform reputation scores matter more than CVE count for this role; CVE IDs are a secondary concern.

#### Task Family: Independent:Bug Bounty Hunter:Target Research Using CVE Data

Using the CVE corpus to understand a target's technology stack vulnerabilities, identify recently published CVEs that the target may not have patched, and find related attack patterns to guide research.

- What known CVEs affect the technologies in this target's stack?
- Are there recently published CVEs for this target's software that I should test for?
- What vulnerability patterns in related software might apply here?
- Has this target been vulnerable to this class of weakness before?

**Supporting references:**
- [Automated CVE scanning of Bug Bounty programs with Nuclei (n8n)](https://n8n.io/workflows/10054-automated-cve-scanning-of-bug-bounty-programs-with-nuclei-and-project-discovery/) — automated pipeline that pulls newly published CVEs and tests them against bug bounty program scopes; documents CVE data as a direct research input for bounty hunters
- [claude-bug-bounty (GitHub)](https://github.com/shuvonsec/claude-bug-bounty) — describes pulling "relevant CVEs in their tech stack, disclosed HackerOne / Bugcrowd reports against them or sibling products" as part of target reconnaissance

#### Task Family: Independent:Bug Bounty Hunter:Duplicate Check Before Submission

Verifying that a finding is not a duplicate before investing time in writing up and submitting a report. Submitting a duplicate is wasted effort and can damage platform reputation.

- Has this vulnerability already been disclosed and assigned a CVE?
- Is there an existing HackerOne or Bugcrowd report for this issue, or an existing CVE?
- If I search the CVE database and find nothing, does that mean it's genuinely new, or just undiscovered?

**Supporting references:**
- [The CVE Program Explained: How to Get a CVE (Bug Bounties)](https://bug-bounties.as93.net/learn/cve-program-explained-for-researchers/) — "platform-based bounty hunting — if you mostly work through HackerOne or Bugcrowd, your signal and reputation scores on those platforms matter more"; explains when CVE matters and when it doesn't for bounty hunters
- [CVE Requests (HackerOne Help Center)](https://docs.hackerone.com/organizations/cve-requests.html) — documents HackerOne's CVE assignment process; platform handles CVE ID request after public advisory publication

### Role: Independent:Open Source Developer

Discovers vulnerabilities while contributing to, auditing, or using open source software — not as a formal security researcher and not through a bounty program. May find a security issue while doing unrelated development work (the XZ Utils backdoor, discovered by Andres Freund while investigating performance anomalies, is the canonical case). Often lacks security disclosure training and must navigate the open source ecosystem's specific reporting infrastructure: project SECURITY.md files, GitHub Private Vulnerability Reporting, GHSA, and OSV.

Distinct from Software Producers:Open Source Maintainer: that role receives vulnerability reports about their own project. This role discovers vulnerabilities in someone else's project and must figure out how to report them. Distinct from Independent:Security Researcher: less formal, typically not seeking a CVE as a credential, and operating within open source community norms rather than professional disclosure frameworks.

#### Task Family: Independent:Open Source Developer:Vulnerability Discovery and Scoping

Determining that what they found is actually a security vulnerability, understanding its scope, and deciding whether and how to report it.

- Is what I found a security vulnerability or just a bug?
- How serious is this — who could exploit it, and under what conditions?
- Does this affect only this project, or are there downstream projects that ship this code?
- Is this already known and reported somewhere?
- Is there a security policy for this project that tells me how to report?

**Supporting references:**
- [Coordinated vulnerability disclosure for open source projects (GitHub Blog)](https://github.blog/security/vulnerability-research/coordinated-vulnerability-disclosure-cvd-open-source-projects/) — "often, the security report will be handled by developers who do not have a security background"; the CVD guide for exactly this audience
- [What to do when you receive a vulnerability report (GitHub Blog)](https://github.blog/security/vulnerability-research/a-maintainers-guide-to-vulnerability-disclosure-github-tools-to-make-it-simple/) — while aimed at maintainers, contains the disclosure workflow that the reporting developer must mirror on their end

#### Task Family: Independent:Open Source Developer:Upstream Disclosure

Reporting the vulnerability to the affected project. The open source ecosystem has its own reporting conventions — GitHub Private Vulnerability Reporting, project security contact emails, security policies in SECURITY.md — that differ from the formal CNA process.

- How do I contact this project's maintainers about a security issue privately?
- Does this project have a SECURITY.md or security policy that defines the process?
- If there is no security contact, how do I report without publicly disclosing the vulnerability prematurely?
- Is the maintainer responsive, and what do I do if they are not?
- Should I involve a coordinating body like GitHub Security or CERT/CC?

**Supporting references:**
- [Open source supply chain security: the essential role of CVEs (GitHub Blog)](https://github.blog/security/supply-chain-security/securing-the-open-source-supply-chain-the-essential-role-of-cves/) — documents the open source vulnerability disclosure ecosystem; GHSA and CVE IDs as the coordination mechanism for the open source supply chain
- [GCVE Best Practices for Vulnerability Handling (GCVE)](https://gcve.eu/bcp/gcve-bcp-02/) — vendor and maintainer responsibilities in the disclosure process; describes what the reporting party should expect from the receiving end

#### Task Family: Independent:Open Source Developer:CVE and Advisory Navigation

Understanding whether a CVE will be assigned, how the advisory process works in the open source ecosystem, and what the published record should contain. Many open source developers have no prior experience with CVE assignment and are navigating this for the first time.

- Will this vulnerability receive a CVE ID, and who assigns it?
- What is the relationship between a GitHub Security Advisory (GHSA) and a CVE?
- What information should the advisory contain so that downstream consumers (other developers, scanner tools, SBOM pipelines) can act on it?
- If the project is not responsive, can I request a CVE directly?

**Supporting references:**
- [What to do when you receive a vulnerability report (GitHub Blog)](https://github.blog/security/vulnerability-research/a-maintainers-guide-to-vulnerability-disclosure-github-tools-to-make-it-simple/) — covers CVE ID request as part of the disclosure workflow; explains GHSA-to-CVE relationship
- [Becoming a CNA as an open source org or project (OpenSSF)](https://github.com/ossf/wg-vulnerability-disclosures/blob/main/docs/guides/becoming-a-cna-as-an-open-source-org-or-project.md) — explains the CNA structure for open source; clarifies who assigns CVE IDs and when

## Sector: Research and Policy

Individuals and organizations that consume CVE data at corpus scale to produce research outputs, policy instruments, or risk models. Distinct from all other sectors: the primary artifact is not a remediation action or a detection rule — it is a finding, a mandate, or a model derived from the vulnerability population. CVE data quality failures here propagate into research conclusions, policy rationales, and quantitative risk frameworks rather than into individual remediation decisions.

Two roles with distinct data dependencies and distinct quality sensitivities:

- The **Academic Researcher** depends on corpus completeness, field consistency, and longitudinal reliability — their outputs are only as valid as the data they train on or analyze.
- The **Policy Analyst** depends on whether CVE population counts and coverage decisions accurately represent the real vulnerability landscape, and on whether CVE field content (CWE assignments, CVSS scores, publication dates) is accurate enough to support the statistics their policy arguments rely on.

### Role: Research and Policy:Academic Researcher

Builds models, conducts empirical studies, and analyzes trends using the CVE corpus as a primary dataset. Uses CVE records both as labeled training data (for ML approaches) and as a population from which to draw statistical inferences. Produces outputs that are used by practitioners, tool builders, policymakers, and other researchers. The academic literature on vulnerability management — EPSS, vulnerability discovery models, severity prediction, exploitation likelihood prediction, NLP-based description analysis — depends almost entirely on CVE/NVD data as its empirical substrate.

**Critical structural finding:** CVE data quality errors propagate into research conclusions. Nguyen and Massacci (2013) verified NVD's affected-version data against ground truth for Chrome and found systematic errors that produced different conclusions depending on whether the clean or dirty data was used. They note: "Vulnerability data sources are used by academics to build models, and by industry and government to assess compliance. Errors in such data sources therefore not only are threats to validity in scientific studies, but also might cause organizations..." This is the academic research version of the quality problem: the downstream harm is a wrong finding published in a peer-reviewed venue, not a missed patch.

**Second structural finding:** The CVE corpus is not a representative sample of the software vulnerability population. Coverage is a function of CNA participation, disclosure incentives, and ecosystem biases — open source and enterprise software are over-represented; embedded systems, proprietary firmware, and ICS/OT software are under-represented. ML models trained on this corpus inherit those biases. A researcher building an exploitation prediction model must decide whether their corpus is the population of interest or a biased sample of it, and CVE record fields provide no direct signal on this question.

#### Task Family: Research and Policy:Academic Researcher:Corpus Construction and Validation

Building a research-grade dataset from CVE records and validating that it is suitable for the intended analysis. The researcher must understand what the corpus contains, what it excludes, and where its quality is sufficient to support valid inferences.

- Which CVEs fall within the scope of my research question (by time range, product class, CNA, severity tier, weakness type)?
- Is the corpus complete enough within my scope to support population-level inferences, or does it systematically exclude relevant vulnerabilities?
- Are the fields I depend on (CVSS, CWE, affected versions, description text) populated and accurate enough to use, or do I need to exclude or supplement records with missing or erroneous data?
- How do I verify that affected-version data is accurate for the products I'm studying, given documented errors in NVD version data?
- Should I supplement the CVE corpus with GHSA, OSV, or vendor advisories, and if so, how do I resolve cross-source identity conflicts?

**Supporting references:**
- [The (Un)Reliability of NVD Vulnerable Versions Data (Nguyen and Massacci, ASIACCS 2013)](https://arxiv.org/abs/1302.4133) — verified NVD-claimed vulnerable Chrome versions against ground truth; found systematic errors that change research conclusions; canonical demonstration that CVE data quality is a research validity problem, not just a practitioner inconvenience
- [CVEfixes: Automated Collection of Vulnerabilities and Their Fixes (Bhandari et al., 2021)](https://arxiv.org/pdf/2107.08760) — describes the corpus construction problem for ML research; notes that NVD records "often lack critical details... which are all required to effectively reproduce a vulnerability and to build ground truth datasets"
- [Data Quality Issues in Vulnerability Detection Datasets (arxiv, 2024)](https://arxiv.org/pdf/2410.06030) — defines three critical dataset issues: data imbalance, low vulnerability coverage, biased vulnerability distribution; documents how these propagate into model failure modes; label inaccuracy rates of 20–71% across surveyed datasets

#### Task Family: Research and Policy:Academic Researcher:Vulnerability Trend Analysis

Studying how the vulnerability population changes over time — counts by category, severity distributions, weakness type prevalence, disclosure rates, patch latency. CVE corpus completeness and field consistency are prerequisites; if coverage changes over the study period (new CNAs added, NVD enrichment practices changed), trend analyses confound real signal with data collection artifacts.

- How has the count of published CVEs changed over time, and how much of the observed trend is real versus an artifact of expanded CNA coverage?
- What is the distribution of vulnerability types (by CWE) over time, and is the trend in CWE assignments stable enough to support longitudinal analysis?
- How does vulnerability severity (by CVSS score) distribute across product categories, and are CVSS scores consistent enough across CNAs and time periods to compare?
- Are changes in observed trends explained by changes in the underlying vulnerability landscape, or by changes in CVE program scope, CNA participation, or enrichment practices?

**Supporting references:**
- [Security Trend Analysis with CVE Topic Models (Neuhaus and Zimmermann, ISSRE 2010)](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/neuhaus-issre-2010.pdf) — applies LDA topic models to 39,393 CVEs to identify vulnerability type trends; one of the canonical examples of corpus-scale CVE trend analysis
- [A novel approach to continuous CVE analysis on enterprise operating systems (ResearchGate, 2022)](https://www.researchgate.net/publication/358482276) — describes research methodology for trend analysis: data preparation, sampling, severity analysis, weakness-type trends; illustrates the standard academic workflow
- [cve-and-cwe-dataset-1999-2025 (HuggingFace, 2025)](https://huggingface.co/datasets/stasvinokur/cve-and-cwe-dataset-1999-2025) — 25-year corpus assembled from NVD; notes intended uses include "exploratory analysis of vulnerability trends over 25 years" and "shifts in average CVSS score"; illustrates the standard corpus-construction approach for trend research

#### Task Family: Research and Policy:Academic Researcher:Predictive Model Development

Building ML models that use CVE record fields as features: severity prediction, exploitation likelihood prediction (EPSS), CWE classification, vulnerability discovery rate modeling. CVE description text, CVSS vectors, CWE assignments, publication dates, and affected product metadata are the primary feature sources. Model validity depends on label quality (are the CVSS and CWE assignments accurate?), description consistency (do descriptions from different CNAs use comparable language?), and corpus representativeness.

- Are the CVSS scores in my training data accurate and consistent enough to use as labels or features, or does inter-CNA and inter-analyst inconsistency introduce noise that will degrade model performance?
- Are the CWE assignments in my training data specific and correct enough for the classification task I'm building, or do I need to clean or remap them before training?
- Is CVE description text consistent enough across CNAs and time periods to train an NLP model that generalizes beyond my training distribution?
- Does the temporal structure of the corpus introduce leakage or confounding — for example, does a model trained on pre-2021 data generalize to the post-NVD-enrichment-collapse era?
- What exploitation labels am I using as ground truth, and how do I handle the Positive-Unlabeled structure of the data — where "not observed as exploited" does not mean "not exploited"?

**Supporting references:**
- [Exploit Prediction Scoring System (Jacobs et al., 2021)](https://dl.acm.org/doi/pdf/10.1145/3436242) — the canonical CVE-based predictive model; describes corpus construction, feature engineering from CVE fields, and the 12-month exploitation window; explicitly notes that model composition should be expected to change as the corpus and data sources evolve
- [Enhancing Vulnerability Prioritization: Data-Driven Exploit Predictions with Community-Driven Insights (Jacobs et al., 2023)](https://arxiv.org/pdf/2302.14172) — describes EPSS v3 development; documents the crowd-sourced feature development process and 82% performance improvement; illustrates how model iteration depends on CVE corpus quality improving over time
- [On Using LLMs for Vulnerability Classification (ACM, 2025)](https://dl.acm.org/doi/10.1145/3733800.3763267) — trains LLM and TF-IDF models on CVE descriptions for CWE and severity prediction; tests both random and temporal train/test splits; illustrates the standard NLP-on-CVE-descriptions workflow and its dependencies on description quality
- [CWE Prediction Using CVE Description (Kota et al., Procedia CS 2024)](https://www.sciencedirect.com/science/article/pii/S1877050924007877) — predicts CWE from CVE description text; notes that a "vast number of CVEs are still unclassified" because CWE assignment is mostly manual; directly illustrates the training data sparsity problem

#### Task Family: Research and Policy:Academic Researcher:Data Quality and Validity Assessment

Studying the CVE corpus itself as a research object — assessing field completeness, accuracy, consistency, and coverage properties. This task family directly produces knowledge that feeds the DQAF project. The researcher's output is an empirical characterization of where the data fails and what the downstream consequences are.

- What fraction of CVE records are missing key fields (CVSS, CWE, affected versions), and does missingness correlate with any measurable corpus attributes?
- How consistent are CVSS scores across CNAs for similar vulnerability types, and what is the inter-rater reliability of the scoring process?
- Are CVE descriptions written consistently enough across CNAs to support automated processing, or do stylistic and content differences introduce systematic noise?
- How does CVE data quality in the corpus affect the validity of downstream empirical findings — can wrong data produce wrong conclusions?
- Is the CVE corpus's coverage of the real vulnerability population measurable, and if so, what is the estimated dark figure?

**Supporting references:**
- [The (Un)Reliability of NVD Vulnerable Versions Data (Nguyen and Massacci, 2013)](https://arxiv.org/abs/1302.4133) — canonical data quality validation study; shows that NVD version errors change research conclusions
- [Half-Day Vulnerabilities: A Study of the First Days of CVE Entries (Khanmohammadi and Khoury, 2023)](https://arxiv.org/pdf/2303.07990) — empirical study of CVE records published with incomplete information; finds that absence of severity scores and affected products creates triage difficulty; documents frequency, nature, and update timing of initially incomplete records
- [Data Quality Issues in Vulnerability Detection Datasets (arxiv, 2024)](https://arxiv.org/pdf/2410.06030) — surveys 54 datasets from 14 papers; finds label inaccuracy rates of 20–71%, extensive duplication, and biased CWE coverage; these datasets are downstream of CVE/NVD quality

#### Task Family: Research and Policy:Academic Researcher:Cross-Source Harmonization for Research `[thin]`

Reconciling CVE records with other vulnerability databases (GHSA, OSV, JVN, vendor advisories) to build a more complete research corpus or to study cross-source agreement and disagreement. Distinct from the operational cross-source identity resolution done by database aggregators: the research question here is about what the differences reveal about data quality and coverage, not just resolving them for operational use.

- How much do CVE records and GHSA records for the same vulnerability agree on severity, affected versions, and weakness type?
- What fraction of vulnerabilities in GHSA or OSV lack a CVE ID, and what does that represent about CVE program coverage?
- How do I build a merged corpus that preserves the provenance of each data element while resolving cross-source conflicts for research purposes?

**Supporting references:**
- [From CVE Entries to Verifiable Exploits (arxiv, 2025)](https://arxiv.org/pdf/2509.01835) — notes that NVD records "often lack critical details... which are all required to effectively reproduce a vulnerability"; describes the supplementation workflow using multiple sources

---

### Role: Research and Policy:Policy Analyst

Uses CVE corpus data to characterize the vulnerability landscape, justify regulatory interventions, measure policy effectiveness, and develop mandates. The CVE ID is a gatekeeping condition for several formal policy mechanisms (KEV requires a CVE ID as a necessary condition for entry). CVE record field content — CWE assignments, CVSS scores, publication dates — feeds the statistics that justify policy arguments. Distinct from the Academic Researcher: the output is an instrument with legal or regulatory force, not a finding that can be subsequently revised.

**Critical structural finding:** The KEV catalog's three inclusion criteria are: (1) a CVE ID must exist, (2) reliable evidence of active exploitation, (3) clear remediation guidance. Criterion 1 means that exploited vulnerabilities without CVE IDs are ineligible for KEV inclusion regardless of exploitation evidence or remediation clarity. CVE program coverage gaps are therefore directly and mechanically translated into policy coverage gaps.

**Second structural finding:** Policy arguments about vulnerability classes depend on CWE assignments in CVE records. The memory-safety policy rationale used by CISA and ONCD — that 70% of vulnerabilities reported to Microsoft and Google are due to memory safety issues — is derived from CWE corpus analysis. If CWE assignments are systematically wrong or incomplete, the empirical basis for that policy argument is wrong.

#### Task Family: Research and Policy:Policy Analyst:Vulnerability Landscape Characterization

Describing the aggregate vulnerability population to justify a policy intervention. Answers questions about what fraction of vulnerabilities belong to a given class, how rapidly the population is growing, how much exploitation activity is associated with which types of vulnerabilities, and whether the current disclosure ecosystem captures the real vulnerability landscape.

- What fraction of known vulnerabilities fall into a given weakness class (memory safety, injection, authentication), and is that fraction stable over time?
- How rapidly is the published CVE population growing, and is the growth rate meaningful or an artifact of CNA expansion?
- What fraction of the published CVE population gets exploited, and how does that fraction vary by weakness type, severity, or ecosystem?
- Does the CVE program's coverage of the real vulnerability population support policy interventions targeting that population, or are there systematic coverage gaps that would undermine the intervention's reach?

**Supporting references:**
- [CISA CSAC TAC Recommendations: Memory Safety (CISA, 2023)](https://www.cisa.gov/sites/default/files/2023-12/CSAC_TAC_Recommendations-Memory-Safety_Final_20231205_508.pdf) — the 70/30 rule (70% of vulnerabilities at Microsoft and Google are memory safety issues) is the direct product of CVE/CWE corpus analysis; this statistic was used to justify federal procurement and secure-by-design recommendations
- [CISA/FBI: Reducing Vulnerabilities in Modern Software Development (DoD, 2025)](https://media.defense.gov/2025/Jun/23/2003742198/-1/-1/0/CSI_MEMORY_SAFE_LANGUAGES_REDUCING_VULNERABILITIES_IN_MODERN_SOFTWARE_DEVELOPMENT.PDF) — cites specific CVEs (CVE-2025-21333, CVE-2025-0282, etc.) as illustrative examples of buffer overflow vulnerabilities to support the memory-safe language policy case; illustrates how individual CVE records are used as policy evidence
- [Enhancing Vulnerability Prioritization: EPSS SIG (Jacobs et al., 2023)](https://arxiv.org/pdf/2302.14172) — documents that only a small fraction of published CVEs are ever exploited; this type of population-level finding is the evidential basis for risk-based remediation mandates

#### Task Family: Research and Policy:Policy Analyst:Policy Instrument Development

Translating vulnerability landscape characterizations into mandates, catalogs, advisories, or requirements. The CVE ID is a required field for most formal policy instruments. CVSS scores drive remediation timeline tiers. CWE assignments drive weakness class mandates. Publication dates set compliance clock start points.

- Which vulnerabilities meet the criteria for inclusion in a mandatory remediation catalog (CVE ID, exploitation evidence, remediation guidance)?
- What remediation timeline is appropriate for this class of vulnerabilities, and what CVE corpus data supports that determination?
- Which weakness types should be targeted by a secure-by-design mandate, and what CVE/CWE data quantifies the prevalence and impact of those types?
- Are CVE publication dates reliable enough to use as the compliance clock start point for remediation mandates, or does late publication create compliance gaps?

**Supporting references:**
- [BOD 22-01: Reducing the Significant Risk of Known Exploited Vulnerabilities (CISA)](https://www.cisa.gov/news-events/directives/bod-22-01-reducing-significant-risk-known-exploited-vulnerabilities) — the three KEV inclusion criteria: CVE ID (required), exploitation evidence, remediation guidance; CVE ID is a necessary condition; documents 2-week remediation window for CVEs published 2021 or later, 6-month window for pre-2021; both windows are anchored to CVE publication date
- [Known Exploited Vulnerabilities Catalog (CISA)](https://www.cisa.gov/known-exploited-vulnerabilities) — operational catalog; CVE ID is the primary identifier in every entry; illustrates CVE ID as the institutional coordination mechanism for federal remediation mandates
- [CISA/FBI Joint Advisory on Buffer Overflow Vulnerabilities (2025)](https://www.ic3.gov/CSA/2025/250212.pdf) — states "CVE records must be complete, accurate, and timely, and be complemented by an appropriate CWE" as a requirement; documents that policy instruments depend on CVE data quality to function

#### Task Family: Research and Policy:Policy Analyst:Policy Effectiveness Measurement

Assessing whether a policy instrument is achieving its intended effect. BOD 22-01 compliance is measured against CVE-keyed remediation deadlines. Memory-safety trend analysis measures whether CWE-119 and related weakness counts are declining. These measurements depend on CVE corpus quality: if the corpus is incomplete or if CWE assignments are wrong, the effectiveness measurement is wrong.

- Are federal agencies remediating KEV-listed CVEs within the required windows, and how is that compliance measured?
- Has the fraction of memory-safety vulnerabilities in the published CVE population changed since secure-by-design policies took effect?
- Is the rate of CVEs with active exploitation evidence changing, and is that change attributable to defensive improvements or to changes in CVE coverage and reporting?
- Is the CVE publication lag short enough that mandated remediation windows are achievable from the time of actual vulnerability discovery?

**Supporting references:**
- [2024 Report on the Cybersecurity Posture of the United States (ONCD, 2024)](https://bidenwhitehouse.archives.gov/wp-content/uploads/2024/05/2024-Report-on-the-Cybersecurity-Posture-of-the-United-States.pdf) — annual report card measuring NCS implementation; uses vulnerability and exploitation statistics derived from CVE corpus to characterize progress; documents 33/36 NCSIP initiatives completed on time
- [CISA Expands KEV Catalog: Active Exploitation Surges 20% in 2025 (CybersecurityNews, 2026)](https://cybersecuritynews.com/cisa-expands-kev-catalog/) — documents KEV growth statistics used to characterize exploitation trends; these trend measurements depend on consistent CVE ID assignment and exploitation evidence criteria

#### Task Family: Research and Policy:Policy Analyst:CVE Program Scope and Coverage Assessment

Assessing whether the CVE program's scope — which CNAs cover which products, which vulnerability types are in scope, how the counting rules work — is adequate for the policy use case. A policy analyst recommending a mandate that relies on KEV must assess whether KEV's CVE-ID requirement means the mandate's reach is limited by CVE program coverage, and whether that coverage gap is policy-relevant.

- Is CVE program coverage sufficient to make KEV a representative sample of actively exploited vulnerabilities, or do coverage gaps mean that exploited vulnerabilities in non-CNA-covered products are systematically absent?
- Do the CVE counting rules (one vulnerability per CVE, counting decisions for multi-component vulnerabilities) produce counts that are meaningful for the policy question at hand?
- Are CNA scopes aligned with the product categories targeted by a proposed policy, or are there systematic gaps that would undermine the policy's reach?
- Is the rate of CVE publication fast enough to support the remediation timelines mandated by the policy?

**Supporting references:**
- [BOD 22-01 FAQ (CISA)](https://www.cisa.gov/known-exploited-vulnerabilities) — the KEV's CVE ID requirement means vulnerabilities in products with no CNA coverage are categorically excluded from BOD 22-01 scope regardless of exploitation evidence; this is the structural coverage gap created by the ID requirement
- [Enhancing cybersecurity through effective CVE management (CVE Foundation, 2025)](https://www.thecvefoundation.org/initiatives/2025/enhancing-cve) — documents that "only about 20% of active CNAs began adding CVSS and CWE information" when encouraged; frames the CNA coverage and participation gap as a structural program limitation

---

## Sectors Now Complete

All seven sectors have been developed:

- **Enterprise** — Vulnerability Analyst, Remediation Coordinator, GRC/Compliance Analyst, Application Security Engineer, Developer
- **Threat Intelligence and Detection Engineering** — CTI Analyst, SOC Analyst, Detection Engineer
- **Generalist IT** — IT Generalist, MSP Technician
- **Software Producers** — PSIRT/Security Response Coordinator, CNA Record Author, Open Source Maintainer
- **Tool and Data Ecosystem Builders** — Vulnerability Scanner and VM Platform Developer, Vulnerability Database and Feed Aggregator, ADP/Enrichment Operator
- **Independent** — Security Researcher, Bug Bounty Hunter, Open Source Developer
- **Research and Policy** — Academic Researcher, Policy Analyst

## Document History

Phase 1 role and task family inventory developed May 2026. Seven sectors, 19 roles, 59 task families. Supporting references provided for all task families except two (Enterprise:Vulnerability Analyst:Reporting and Metrics and Enterprise:Remediation Coordinator:Patch Planning and Execution), which are marked pending and need targeted research before Phase 2 promotion.