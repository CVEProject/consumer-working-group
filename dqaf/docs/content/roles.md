---
layout: document
title: "CVE Consumer Working Group DQAF — Role Inventory"
document_file: roles.md
status: draft
---

# CVE DQAF Role Inventory

## Purpose

A data quality assessment framework must be grounded in the tasks that real practitioners perform. Tasks cannot be enumerated without first identifying who performs them. This document is a starting inventory of roles that interact with CVE data across the full ecosystem — from vulnerability discovery through disclosure, enrichment, consumption, and analysis.

This is a draft for the CVE Consumer Working Group. It is intentionally expansive. Roles will be consolidated, refined, or cut as task analysis proceeds and working group members validate against their own experience.

**Source inputs:** CVE Program consolidated personas document (internal); working group discussion; independent analysis.

---

## Role Groups

### 1. Software Producers

Organizations and individuals that create, maintain, and ship software. All software producers have at least one role responsible for security. The CVE program's producer-side personas document covers this group reasonably well.

| Role | Description |
|---|---|
| Vulnerability finder / security researcher (internal) | Discovers vulnerabilities in the organization's own products through code review, fuzzing, or internal audit. |
| PSIRT coordinator | Manages the inbound vulnerability report lifecycle: triage, validation, coordination with the reporter, disclosure timing, and patch scheduling. |
| CNA record author | Writes and publishes the CVE record. May be the PSIRT coordinator or a dedicated role depending on org size. Data quality at the source is determined here. |
| Security engineer (producer-side) | Reproduces the vulnerability, confirms the root cause, characterizes the fault, and informs the fix. Provides the technical content the CNA record author needs. |
| Developer / fix author | Writes and validates the patch or configuration fix. Determines what the fixed version is and what the fix changes — information the record should reflect. |
| Technical writer / advisory author | Drafts the customer-facing advisory or security bulletin. Converts technical characterization into audience-appropriate communication. |
| Customer support representative | Fields customer questions post-advisory. Translates CVE records and advisories into actionable answers for customers who may not have technical security background. |
| Sales / account manager | Responds to customer procurement questions about vulnerability history and vendor security posture. Indirect consumer of CVE data. |

---

### 2. Enterprise Vulnerability Management

Organizations that use software and must identify, prioritize, and remediate vulnerabilities affecting their environments. This is the largest and most heterogeneous consumer group. The CVE personas document underspecifies it by collapsing distinct roles into "Infosec Teams."

| Role | Description |
|---|---|
| Vulnerability analyst | Primary consumer of CVE characterization data. Identifies which CVEs affect the org's environment, triages severity and exploitability, and routes to remediation. Distinct from patch manager. |
| Patch manager | Owns the remediation workflow. Tracks which vulnerabilities have been addressed, manages patch scheduling across teams, and measures closure rates. Primarily needs fix identification data, not characterization detail. |
| SOC analyst | Consumes CVE IDs in real time as references in alerts, threat intel feeds, and SIEM rules. Needs rapid characterization lookup, not full triage workflow. Distinct from vulnerability analyst. |
| Threat intelligence analyst | Correlates CVE data with threat actor activity, campaign data, and exploitation telemetry. Assesses which vulnerabilities are actively weaponized and by whom. |
| Detection engineer | Builds detection signatures (Snort, Suricata, YARA, EDR rules) from CVE characterization data. Needs exploitation conditions at high specificity — attack vector, payload pattern, protocol detail. |
| Application security engineer | Focuses on vulnerabilities in software the org develops. Runs SCA tooling against dependency graphs, maps CVE records to internal codebases, and feeds findings into the SDLC. |
| Penetration tester / red teamer | Uses CVE-documented vulnerabilities in authorized offensive engagements to validate defensive controls. Needs characterization and exploit reference data. |
| Risk officer / CISO | Consumes summarized risk posture derived from CVE data. Drives prioritization policy and communicates organizational exposure to the board. Indirect consumer — data arrives pre-processed. |
| Compliance officer | Maps CVEs to regulatory requirements (PCI-DSS, FedRAMP, HIPAA, NIS2). Produces audit evidence and tracks remediation against compliance deadlines. |
| IT operations / system administrator | Deploys patches and implements workarounds. The practitioner who actually executes the remediation step. Needs clear fix identification and workaround instructions. |
| Vulnerability data engineer | Builds and maintains internal data infrastructure: ingesting feeds from multiple sources (NVD, vendor advisories, threat intel, scanner output), normalizing against internal asset inventory schema, deduplicating, and routing to the VM platform. Distinct from security tool vendor pipeline engineer. |
| Asset inventory / CMDB owner | Maintains the technology estate data that CVE records must match against. CVE identification failures are experienced concretely here: the match is only as good as the CMDB and the CVE identifiers jointly allow. |
| Procurement / vendor risk analyst | Evaluates vendor security posture before purchase decisions. Uses CVE history, disclosure patterns, and advisory quality as signals. |

---

### 3. Security Research and Offensive Operations

Individuals and teams whose primary function is discovering, characterizing, or operationalizing vulnerability knowledge. Some are embedded in organizations; many are independent.

| Role | Description |
|---|---|
| Independent security researcher / finder | Discovers vulnerabilities in third-party software and reports them to the vendor or a bug bounty program. May be the first external party to characterize the vulnerability fully. |
| Exploit developer | Produces working exploits or proof-of-concept code from CVE characterization data. May work offensively (red team), defensively (validating detection), or commercially (exploit brokers, vulnerability intelligence firms). |
| Bug bounty participant | Submits vulnerability reports through organized programs. Interacts with CVE data primarily as a reporter and as a reference for scoping and duplicate checking. |

---

### 4. Tool and Data Ecosystem

Organizations and individuals that build, operate, and maintain the infrastructure through which CVE data is transformed, normalized, enriched, and delivered to end consumers. This is the most underspecified group in the CVE personas document and the one where data quality failures are most frequently encountered and least visible.

| Role | Description |
|---|---|
| Security tool vendor / developer | Builds scanners, VM platforms, SIEM integrations, and other tools that consume CVE data as a primary input. Data quality failures in CVE records propagate directly into tool output and become visible to end users as false positives, false negatives, or missing coverage. |
| SBOM tooling developer | Builds tools that generate and consume Software Bills of Materials. Matches package manifests to CVE affected ranges using purl or ecosystem-native identifiers. Faces a distinct set of identification challenges from general scanner vendors. |
| Vulnerability enricher / ADP operator | Adds structured data to existing CVE records as an Authorized Data Provider. Operates within the formal CVE program governance structure. |
| Vulnerability database curator | Makes editorial and scoping decisions: what to include, how to handle disputed or withdrawn records, how to represent ambiguous cases. Distinct from the operator who keeps the infrastructure running. |
| Vulnerability database operator | Maintains the infrastructure of a CVE-derivative or CVE-adjacent database. Keeps data current, manages ingestion pipelines, and ensures availability. |
| Data pipeline engineer | Ingests, normalizes, and deduplicates CVE data at scale. Builds and maintains the ETL infrastructure between primary sources (cve.org, NVD, GHSA, OSV, vendor feeds) and downstream consumers. |
| Disambiguation / identity resolution analyst | Determines whether records across different sources (GHSA, OSV, NVD, vendor advisory, CVE) refer to the same underlying vulnerability. Makes judgment calls on split/merge cases, alias semantics, and scope boundaries. Domain knowledge-intensive; not purely an engineering function. |
| Vulnerability feed aggregator / broker | Aggregates CVE data alongside non-CVE sources (dark web, exploit-db, vendor advisories, threat intel) and produces normalized, weighted feeds for commercial consumption. Performs source conflict resolution and provenance tracking. Commercially significant consumer largely invisible to the CVE program. |
| Threat intelligence platform (TIP) integrator | Maps CVE data to threat actor TTPs, campaign data, MITRE ATT&CK entries, and IOCs. Joins CVE records to external intelligence sources. Data quality problems center on linkage integrity and temporal alignment. |

---

### 5. Governance and Standards

Organizations with formal roles in the CVE program's governance structure or in the broader standards ecosystem that CVE data feeds.

| Role | Description |
|---|---|
| CVE program administrator / Root CNA | Manages CNA onboarding, scope arbitration, quality policy, and program governance. Sets the rules that determine what a valid record looks like. |
| CNA quality reviewer | Reviews CNA-submitted records for quality, accuracy, and completeness. May be a Root CNA function or a dedicated program role. |
| Standards body representative | Participates in CVSS, CWE, CVSS, or other standards governance. Defines the controlled vocabularies and scoring rubrics that CVE records reference. |
| Government / national CERT analyst | Monitors national exposure to published vulnerabilities, publishes national advisories, and may supplement CVE records with local context. Functions similarly to a vulnerability analyst but at population scale with policy implications. |
| Policy maker / regulator | Uses CVE data and CVE-derived metrics to inform legislation, mandate remediation timelines, or define compliance obligations. Indirect consumer; data arrives through analyst intermediaries. |

---

### 6. Research and Analysis

Individuals and organizations that study CVE data at corpus scale to understand vulnerability trends, program dynamics, and ecosystem health.

| Role | Description |
|---|---|
| Academic / industry researcher | Studies vulnerability trends, disclosure ecosystems, scoring reliability, exploitation patterns, and program effectiveness. Treats the CVE corpus as a dataset. Data quality failures become methodological confounds. |
| Data analyst (government or industry) | Produces reports and trend analyses from CVE data for internal stakeholders, regulators, or the public. |
| Journalist | Covers specific high-profile CVEs or broader vulnerability trends for a non-specialist audience. Needs rapid, accurate characterization and context. |

---

## Notes for Working Group Review

**Roles versus job titles.** One person may perform multiple roles; one role may be performed by many people with different job titles. The unit here is the role — the function being performed and the data it requires — not the org chart.

**Automation as a role proxy.** Several tasks in the identification and pipeline layers are performed by automated systems rather than people. The data quality requirements are identical regardless of whether the actor is human or automated. Where a role primarily acts through tooling (e.g., patch manager running a scanner), the human role is still the right unit because the human experiences the quality failure and makes the corrective decision.

**Role consolidation for task analysis.** Not all 40+ roles will generate distinct task requirements. Roles that share data needs can be consolidated for the task matrix. This inventory is intentionally expansive so that consolidation decisions are explicit rather than accidental omissions.

**Missing role signal.** If a working group member's function is not represented here, that is a gap. The first session should include a check: "Does every person in this room see their work in this list?"
