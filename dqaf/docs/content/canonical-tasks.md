---
layout: document
title: "CVE Consumer Working Group DQAF — Canonical Task List"
document_file: canonical-tasks.md
status: draft
---

# CVE DQAF — Canonical Task List

## Purpose

This document collapses the 273 role-level tasks from the tasks-by-role working document into a canonical set of 45 distinct tasks. Each canonical task represents a discrete practitioner activity with coherent data quality requirements. Tasks that differed only in who performs them — not in what data they require — are merged. Tasks that appear similar but require materially different data are kept separate.

Each task lists **primary roles** (roles for whom this is a core, regular activity) and **secondary roles** (roles that perform this task occasionally or as a downstream consumer of its outputs).

Role numbers reference the role inventory in the Role Inventory document.

---

## Role Reference (abbreviated)

| # | Role |
|---|---|
| 1 | Vulnerability finder / security researcher (internal) |
| 2 | PSIRT coordinator |
| 3 | CNA record author |
| 4 | Security engineer (producer-side) |
| 5 | Developer / fix author |
| 6 | Technical writer / advisory author |
| 7 | Customer support representative |
| 8 | Sales / account manager |
| 9 | Vulnerability analyst |
| 10 | Patch manager |
| 11 | SOC analyst |
| 12 | Threat intelligence analyst |
| 13 | Detection engineer |
| 14 | Application security engineer |
| 15 | Penetration tester / red teamer |
| 16 | Risk officer / CISO |
| 17 | Compliance officer |
| 18 | IT operations / system administrator |
| 19 | Vulnerability data engineer |
| 20 | Asset inventory / CMDB owner |
| 21 | Procurement / vendor risk analyst |
| 22 | Independent security researcher / finder |
| 23 | Exploit developer |
| 24 | Bug bounty participant |
| 25 | Security tool vendor / developer |
| 26 | SBOM tooling developer |
| 27 | Vulnerability enricher / ADP operator |
| 28 | Vulnerability database curator |
| 29 | Vulnerability database operator |
| 30 | Data pipeline engineer |
| 31 | Disambiguation / identity resolution analyst |
| 32 | Vulnerability feed aggregator / broker |
| 33 | Threat intelligence platform integrator |
| 34 | CVE program administrator / Root CNA |
| 35 | CNA quality reviewer |
| 36 | Standards body representative |
| 37 | Government / national CERT analyst |
| 38 | Policy maker / regulator |
| 39 | Academic / industry researcher |
| 40 | Data analyst (government or industry) |
| 41 | Journalist |

---

## Canonical Tasks

### Phase 1: Pipeline and Data Management

---

**T01. Ingest and normalize CVE records from primary sources**

Fetch CVE records from cve.org, NVD, GHSA, OSV, vendor feeds, and other primary sources. Normalize format across schema versions (CVE JSON 4.0, 5.0), source variants, and field naming conventions into a consistent internal representation.

| Role type | Roles |
|---|---|
| Primary | 19, 25, 27, 29, 30, 32 |
| Secondary | 9, 28 |

---

**T02. Detect and propagate record changes and updates**

Monitor upstream sources for changes to existing records. Identify which fields changed, when, and propagate updates to downstream consumers. Distinct from initial ingest — requires delta detection and change tracking.

| Role type | Roles |
|---|---|
| Primary | 19, 25, 30, 32 |
| Secondary | 27, 29 |

---

**T03. Monitor feed health and handle source disruptions**

Track availability and freshness of upstream CVE data sources. Detect feed failures, delays, or unexpected schema changes and respond to maintain data currency downstream.

| Role type | Roles |
|---|---|
| Primary | 19, 29, 30, 32 |
| Secondary | 25 |

---

**T04. Deduplicate CVE records across sources**

Identify and collapse duplicate or near-duplicate records that arrive from multiple sources referencing the same vulnerability. Distinct from identity resolution (T05), which handles cases requiring analytical judgment.

| Role type | Roles |
|---|---|
| Primary | 19, 30, 31, 32 |
| Secondary | 28 |

---

**T05. Resolve cross-source identity**

Determine analytically whether records from different sources (CVE, GHSA, OSV, vendor advisory) describe the same underlying vulnerability. Requires domain knowledge and judgment. Produces crosswalk tables and alias mappings.

| Role type | Roles |
|---|---|
| Primary | 28, 31, 32 |
| Secondary | 27, 30 |

---

**T06. Resolve split and merge cases**

Determine whether a single CVE ID covers multiple distinct vulnerabilities that should be separated (split), or whether multiple CVE IDs cover the same vulnerability and should be unified (merge). Requires program-level judgment and coordination.

| Role type | Roles |
|---|---|
| Primary | 28, 31, 34 |
| Secondary | 27, 32 |

---

### Phase 2: Asset-to-Vulnerability Matching

---

**T07. Match CVE records to assets in an inventory or manifest**

Determine which CVE records apply to software, hardware, or services present in a technology estate. May be automated (scanner, SBOM tool) or manual. The primary identification task — all downstream tasks depend on it.

| Role type | Roles |
|---|---|
| Primary | 9, 14, 25, 26 |
| Secondary | 11, 15, 22 |

---

**T08. Resolve false positives from identifier failures**

Investigate and dismiss scanner findings where the CVE-to-asset match is incorrect — caused by CPE naming inconsistencies, wrong version range encoding, missing platform constraints, or cross-ecosystem identifier collision.

| Role type | Roles |
|---|---|
| Primary | 9, 25 |
| Secondary | 14, 19 |

---

**T09. Confirm match applicability for specific configurations or deployments**

Determine whether a matched CVE actually applies given the organization's specific configuration, deployment context, feature set, or platform. Requires reading the exploitation conditions and comparing them to local state.

| Role type | Roles |
|---|---|
| Primary | 4, 9, 14 |
| Secondary | 1, 15 |

---

### Phase 3: Record Consumption and Interpretation

---

**T10. Look up and interpret a CVE record**

Read a CVE record to understand what vulnerability it describes: what the fault is, what conditions allow exploitation, and what the security consequence is. The baseline task that most other tasks build on. Performed across virtually every role.

| Role type | Roles |
|---|---|
| Primary | 9, 11, 12, 13, 15, 22, 23, 37 |
| Secondary | 7, 8, 16, 17, 21, 24, 38, 41 |

---

### Phase 4: Vulnerability Discovery and Characterization

---

**T11. Discover a vulnerability**

Identify a previously unknown vulnerability through code review, fuzzing, dynamic analysis, or reverse engineering. The starting point of the producer-side lifecycle.

| Role type | Roles |
|---|---|
| Primary | 1, 22, 24 |
| Secondary | 15 |

---

**T12. Reproduce and root-cause a vulnerability**

Confirm that a reported or discovered vulnerability is real and identify the specific code-level or design-level fault that causes it. Required for accurate CVE record authorship and fix development.

| Role type | Roles |
|---|---|
| Primary | 1, 4, 22, 23 |
| Secondary | 13, 15, 27 |

---

**T13. Enumerate exploitation conditions**

Determine the complete set of circumstances that must hold for the vulnerability to be exploitable: authentication requirements, network access, required privileges, configuration dependencies, and preconditions. Higher specificity than CVSS attack metrics.

| Role type | Roles |
|---|---|
| Primary | 1, 4, 13, 22 |
| Secondary | 15, 23 |

---

**T14. Determine affected versions, configurations, and platforms**

Identify exactly which versions of the affected product are vulnerable, which configurations trigger the vulnerability, and which platforms are in scope. Determines what the CVE affected range should contain.

| Role type | Roles |
|---|---|
| Primary | 1, 3, 4, 22 |
| Secondary | 9, 14 |

---

### Phase 5: CVE Record Production and Maintenance

---

**T15. Author and publish a CVE record**

Write and publish a CVE record covering description, CWE assignment, CVSS vector, affected product and version ranges, reference tags, and any optional fields (workarounds, solutions, timeline). The primary data production task.

| Role type | Roles |
|---|---|
| Primary | 3 |
| Secondary | 2, 4, 27, 34 |

---

**T16. Update a CVE record post-publication**

Revise a published CVE record when new information becomes available: additional affected versions discovered, fix availability changes, CVSS corrected, dispute resolved, or enrichment superseded. Distinct from initial authorship.

| Role type | Roles |
|---|---|
| Primary | 3, 27 |
| Secondary | 2, 34, 35 |

---

### Phase 6: Disclosure Coordination

---

**T17. Triage and validate an inbound vulnerability report**

Assess whether a reported vulnerability is valid, in scope, and novel. Determine severity for internal prioritization. First step in the producer-side reactive workflow.

| Role type | Roles |
|---|---|
| Primary | 2, 4 |
| Secondary | 34, 35 |

---

**T18. Coordinate disclosure timeline, embargo, and downstream notification**

Negotiate and manage the disclosure timeline with the reporting researcher, coordinate embargo among notified parties, and notify downstream OEM partners and distributors before public disclosure.

| Role type | Roles |
|---|---|
| Primary | 2 |
| Secondary | 34, 37 |

---

**T19. Reserve or assign a CVE ID**

Request, reserve, or assign a CVE ID for a confirmed vulnerability. May be performed by the vendor CNA, a coordinating CNA, or a researcher working through a CERT.

| Role type | Roles |
|---|---|
| Primary | 2, 3, 34 |
| Secondary | 22, 24 |

---

### Phase 7: Record Enrichment

---

**T20. Add or correct structured fields in an existing CVE record**

Supplement a CNA-published record with missing or incorrect structured data: CVSS vectors, CWE assignments, CPE strings, package URLs, KEV status, EPSS scores, or other third-party signals. The primary ADP function.

| Role type | Roles |
|---|---|
| Primary | 27 |
| Secondary | 34, 35, 37 |

---

### Phase 8: Risk Assessment

---

**T21. Assess the risk an unpublished vulnerability poses to inform response decisions**

Estimate the risk of a vulnerability that has not yet been publicly disclosed. The practitioner owns all information that exists about the vulnerability — no external signals, exploitation telemetry, or third-party characterization are available. Risk estimation is grounded entirely in internal characterization: what the fault is, what conditions allow exploitation, and what the consequence would be. Performed under information scarcity and often under disclosure deadline pressure. The quality of this assessment depends entirely on the depth and accuracy of the practitioner's own analytical work.

| Role type | Roles |
|---|---|
| Primary | 1, 2, 4 |
| Secondary | 34 |

---

**T22. Assess the risk a published vulnerability poses to inform response decisions**

Estimate the risk of a vulnerability that is publicly known. The practitioner is a consumer of externally produced information they did not generate. Risk estimation draws on the published record, enrichment data, exploitation telemetry, threat actor targeting signals, and other ecosystem-produced intelligence. Information is richer but noisier than in T21 — conflicts between sources, stale data, and shallow characterization are the primary failure modes. The quality of this assessment depends on the accuracy, completeness, and currency of external data sources.

| Role type | Roles |
|---|---|
| Primary | 9, 11, 12, 16, 37 |
| Secondary | 17, 38 |

---

### Phase 9: Prioritization

---

**T23. Prioritize vulnerabilities for remediation**

Rank open vulnerabilities by urgency and allocate remediation resources. Combines severity, exploitability, asset criticality, network exposure, and organizational context. Drives the remediation queue.

| Role type | Roles |
|---|---|
| Primary | 9, 10, 16 |
| Secondary | 12, 17, 37 |

---

### Phase 10: Detection Engineering

---

**T24. Develop detection signatures and rules from CVE exploitation conditions**

Write network detection signatures (Snort, Suricata), endpoint detection rules (YARA, EDR behavioral), or WAF rules based on the exploitation conditions and attack behavior described in or derivable from a CVE record. Requires exploitation conditions at high specificity.

| Role type | Roles |
|---|---|
| Primary | 13 |
| Secondary | 25, 37 |

---

### Phase 11: Offensive Operations

---

**T25. Develop or adapt a working exploit or proof-of-concept**

Produce functional exploit or PoC code from CVE characterization data and references. Used for vulnerability validation, red team operations, or public demonstration. Requires fault location and exploitation conditions at high specificity.

| Role type | Roles |
|---|---|
| Primary | 15, 23 |
| Secondary | 13, 22 |

---

### Phase 12: Remediation

---

**T26. Identify the available fix and source the patch**

Determine what version resolves the vulnerability, locate the patch or update package, and confirm the fix is applicable to the affected asset. First step in fix-based remediation.

| Role type | Roles |
|---|---|
| Primary | 9, 10 |
| Secondary | 5, 6, 14, 18 |

---

**T27. Deploy patch or update to affected assets**

Apply the available fix across affected systems. Includes scheduling, deployment execution, and status tracking. The physical remediation act.

| Role type | Roles |
|---|---|
| Primary | 18 |
| Secondary | 10, 14 |

---

**T28. Design and implement a workaround or compensating control**

Produce and apply a control that removes exploitation conditions or reduces security outcome without eliminating the underlying weakness. Used when a patch is unavailable, untested, or cannot be deployed immediately.

| Role type | Roles |
|---|---|
| Primary | 13, 18 |
| Secondary | 4, 6, 9 |

---

**T29. Verify that a vulnerability has been successfully remediated**

Confirm that a patched or mitigated asset no longer registers as vulnerable. May use scanner re-run, version confirmation, or configuration validation. Closes the remediation loop.

| Role type | Roles |
|---|---|
| Primary | 9, 10, 18 |
| Secondary | 14, 17 |

---

### Phase 13: Communication and Advisory

---

**T30. Write a technical or customer-facing advisory or security bulletin**

Produce a document communicating a vulnerability's existence, severity, affected scope, and remediation steps to an external or internal audience. May be a formal advisory, a security bulletin, a national alert, or a customer notification.

| Role type | Roles |
|---|---|
| Primary | 3, 6, 37 |
| Secondary | 2, 7, 22 |

---

**T31. Communicate vulnerability impact to non-technical audiences**

Translate CVE-based technical findings into language appropriate for executives, board members, customers, media, or regulators. Requires stripping technical detail while preserving decision-relevant content.

| Role type | Roles |
|---|---|
| Primary | 6, 7, 16, 41 |
| Secondary | 8, 38, 40 |

---

### Phase 14: Threat Intelligence Correlation

---

**T32. Correlate CVE records with threat actor activity and exploitation telemetry**

Join CVE data to threat actor campaign information, observed exploitation events, and dark web signals. Answers which CVEs are being actively weaponized, by whom, and at what scale.

| Role type | Roles |
|---|---|
| Primary | 12, 32, 33 |
| Secondary | 9, 37 |

---

**T33. Map CVE records to ATT&CK techniques and threat intelligence frameworks**

Establish structured links between CVE IDs and MITRE ATT&CK techniques, CAPEC patterns, and other threat classification frameworks. Enables threat-model-driven prioritization and detection coverage analysis.

| Role type | Roles |
|---|---|
| Primary | 33 |
| Secondary | 12, 37 |

---

### Phase 15: Compliance and Regulatory Tracking

---

**T34. Map CVEs to regulatory requirements and compliance frameworks**

Determine which open CVEs are relevant to applicable regulations (PCI-DSS, FedRAMP, HIPAA, NIS2, CISA KEV mandate). Establishes which vulnerabilities carry mandatory remediation timelines.

| Role type | Roles |
|---|---|
| Primary | 17, 36, 38 |
| Secondary | 34, 37 |

---

**T35. Track CVE remediation against compliance deadlines and produce audit evidence**

Monitor remediation status for compliance-relevant CVEs, escalate overdue items, and document completed remediation with timestamps and method for audit purposes.

| Role type | Roles |
|---|---|
| Primary | 17 |
| Secondary | 9, 10 |

---

### Phase 16: Vendor and Procurement Risk

---

**T36. Assess vendor security posture for procurement or contractual decisions**

Evaluate a vendor's CVE history — volume, severity distribution, time-to-fix, advisory quality, and disclosure responsiveness — as a signal of security maturity before or during a commercial relationship.

| Role type | Roles |
|---|---|
| Primary | 21 |
| Secondary | 8, 17 |

---

### Phase 17: Data Quality Management

---

**T37. Monitor and measure CVE data quality at corpus scale**

Systematically evaluate the quality of CVE records across the corpus — field population rates, CVSS consistency, CWE validity, version evaluability — and produce metrics that identify systemic failures by CNA, product category, or time period.

| Role type | Roles |
|---|---|
| Primary | 27, 35, 39 |
| Secondary | 30, 34, 40 |

---

**T38. Resolve conflicts between sources with different characterizations**

Determine the authoritative characterization when CVE, NVD, GHSA, vendor advisory, and researcher write-up disagree on CVSS, affected scope, CWE, or fix availability. Requires source weighting and provenance tracking.

| Role type | Roles |
|---|---|
| Primary | 28, 31, 32 |
| Secondary | 27, 35 |

---

**T39. Maintain provenance records for data elements across sources**

Track which source made which assertion about a vulnerability, when, and on what basis. Required for conflict resolution, trust assessment, and accountability when enriched data is found to be incorrect.

| Role type | Roles |
|---|---|
| Primary | 27, 31, 32 |
| Secondary | 28, 30 |

---

### Phase 18: Analysis and Reporting

---

**T40. Generate trend reports and aggregate analyses from CVE corpus data**

Produce summary reports on vulnerability patterns: counts by product, vendor, weakness type, severity, or disclosure lag. Supports organizational risk reporting, policy development, and public communication.

| Role type | Roles |
|---|---|
| Primary | 39, 40 |
| Secondary | 34, 37, 38, 41 |

---

**T41. Measure vulnerability program effectiveness**

Calculate metrics that assess how well a vulnerability management program is performing: mean time to remediate (MTTR), patch coverage rates, SLA compliance, critical vulnerability exposure windows.

| Role type | Roles |
|---|---|
| Primary | 9, 16, 40 |
| Secondary | 34, 38, 39 |

---

**T42. Conduct empirical research on the CVE ecosystem**

Study the CVE ecosystem as a subject of inquiry: scoring reliability, disclosure dynamics, exploitation patterns, CNA behavior, data quality characteristics. Produces publishable findings that inform program improvement.

| Role type | Roles |
|---|---|
| Primary | 39 |
| Secondary | 36, 40 |

---

### Phase 19: Governance and Standards

---

**T43. Define and enforce CVE program policies and CNA quality criteria**

Establish and apply the rules that govern what counts as a valid CVE record, how CNAs must behave, and what quality standards apply across the program.

| Role type | Roles |
|---|---|
| Primary | 34 |
| Secondary | 35, 36 |

---

**T44. Participate in standards governance**

Contribute to the development, revision, and maintenance of the controlled vocabularies, scoring rubrics, and schema specifications that CVE records reference: CVSS, CWE, CVE JSON schema.

| Role type | Roles |
|---|---|
| Primary | 36 |
| Secondary | 27, 34, 39 |

---

**T45. Define regulatory mandates using CVE-derived metrics**

Establish legislation, executive orders, or regulatory requirements that reference CVE data — severity thresholds for mandatory patching timelines, KEV membership as a trigger, or CVE-based disclosure obligations.

| Role type | Roles |
|---|---|
| Primary | 38 |
| Secondary | 37, 40 |

---

## Role-to-Task Index

Lookup table: for each role, the canonical tasks they perform.

| Role | Primary tasks | Secondary tasks |
|---|---|---|
| 1. Internal vulnerability finder | T11, T12, T13, T14, T21 | T9 |
| 2. PSIRT coordinator | T17, T18, T19, T21 | T15, T16 |
| 3. CNA record author | T14, T15, T30 | T16, T19 |
| 4. Security engineer (producer) | T9, T12, T13, T14, T17, T21 | T28 |
| 5. Developer / fix author | T26 (fix details) | — |
| 6. Advisory author / technical writer | T28, T30, T31 | T26 |
| 7. Customer support representative | T31 | T10, T30 |
| 8. Sales / account manager | — | T10, T31, T36 |
| 9. Vulnerability analyst | T07, T08, T09, T10, T22, T23, T26, T29, T41 | — |
| 10. Patch manager | T23, T26, T27, T29 | T35 |
| 11. SOC analyst | T10, T22 | — |
| 12. Threat intelligence analyst | T22, T32 | T23, T33 |
| 13. Detection engineer | T13, T24, T28 | T25 |
| 14. Application security engineer | T07, T09 | T08, T26, T27, T29 |
| 15. Penetration tester / red teamer | T10, T25 | T09, T11, T12, T13 |
| 16. Risk officer / CISO | T22, T23, T31, T41 | T38 |
| 17. Compliance officer | T34, T35 | T22, T29, T36 |
| 18. IT operations / system administrator | T27, T28, T29 | T26 |
| 19. Vulnerability data engineer | T01, T02, T03, T04 | T07 (pipeline) |
| 20. Asset inventory / CMDB owner | — (feeds T07) | T07 (enabler) |
| 21. Procurement / vendor risk analyst | T36 | T10 |
| 22. Independent researcher / finder | T10, T11, T12, T13, T14, T30 | T19, T25 |
| 23. Exploit developer | T12, T25 | T10 |
| 24. Bug bounty participant | T11 | T10, T19 |
| 25. Security tool vendor / developer | T01, T02, T07, T08 | T03, T24 |
| 26. SBOM tooling developer | T07 (purl-first) | — |
| 27. Vulnerability enricher / ADP operator | T16, T20, T37, T39 | T05, T12, T38 |
| 28. Vulnerability database curator | T05, T06, T38 | T04, T39 |
| 29. Vulnerability database operator | T01, T03 | T02 |
| 30. Data pipeline engineer | T01, T02, T03, T04 | T05, T39 |
| 31. Disambiguation / identity resolution analyst | T05, T06, T38, T39 | T04 |
| 32. Vulnerability feed aggregator / broker | T01, T02, T04, T05, T32, T38, T39 | T06 |
| 33. TIP integrator | T32, T33 | — |
| 34. CVE program administrator / Root CNA | T06, T19, T43 | T15, T16, T18, T20, T21, T34, T37, T40, T41 |
| 35. CNA quality reviewer | T37 | T16, T17, T20, T38 |
| 36. Standards body representative | T34, T44 | T42, T43 |
| 37. Government / national CERT analyst | T10, T22, T23, T30, T37 | T18, T20, T32, T33, T34, T40 |
| 38. Policy maker / regulator | T22, T34, T45 | T31, T40 |
| 39. Academic / industry researcher | T37, T42 | T40, T41, T44 |
| 40. Data analyst | T40, T41 | T31, T37 |
| 41. Journalist | T10, T31 | T40 |

---

## Task Coverage Summary

**Tasks performed by the most roles (highest normalization value):**

| Task | Primary role count | Total roles |
|---|---|---|
| T10 Look up and interpret a CVE record | 8 | 16 |
| T07 Match CVE records to assets | 4 | 7 |
| T09 Confirm match applicability | 3 | 5 |
| T23 Prioritize vulnerabilities | 3 | 6 |
| T29 Verify remediation | 3 | 5 |
| T37 Monitor and measure data quality | 3 | 6 |
| T38 Resolve cross-source conflicts | 3 | 5 |

**Tasks performed by the fewest roles (highest specialization):**

| Task | Primary roles |
|---|---|
| T15 Author and publish a CVE record | 3 (CNA author only as primary) |
| T18 Coordinate disclosure and embargo | 2 (PSIRT coordinator) |
| T24 Develop detection signatures | 13 |
| T33 Map CVEs to ATT&CK | 33 |
| T35 Track compliance deadlines | 17 |
| T42 Conduct empirical research | 39 |
| T43 Define program policies | 34 |
| T45 Define regulatory mandates | 38 |

**Tasks with the highest data quality sensitivity** (tasks where CVE record quality failures directly produce wrong outputs):

| Task | Primary failure mode from poor CVE data |
|---|---|
| T07 Asset matching | False positives and false negatives from identifier inconsistency |
| T08 Resolve false positives | Entire task exists because of CVE data quality failures |
| T09 Confirm match applicability | Cannot confirm when exploitation conditions are absent from record |
| T10 Look up and interpret | Shallow characterization produces incomplete or incorrect understanding |
| T13 Enumerate exploitation conditions | Record provides coarse CVSS labels, not full condition set |
| T24 Develop detection signatures | Cannot write specific signature when attack vector is underspecified |
| T25 Develop exploit / PoC | Cannot reproduce without fault location and condition specificity |
| T26 Identify fix and source patch | Cannot identify fix when fixed version is not encoded or solutions field absent |
| T28 Design workaround | Cannot design effective control when exploitation conditions are absent |
| T32 Correlate with threat intel | Temporal misalignment from unreliable datePublic undermines correlation |
| T38 Resolve cross-source conflicts | Conflict exists because CVE record and enrichment source disagree |

---

## Notes for Working Group

**On the 45-task count.** This can be compressed further. T01–T04 (pipeline tasks) are candidates for consolidation into a single "data management" cluster for the DQAF's purposes if the framework's assessment unit is the organizational program rather than the individual pipeline step. Retaining them separately is correct if the framework will include tool vendors and data ecosystem roles.

**On data quality requirements.** The next analytical step is identifying, for each canonical task, the specific CVE record fields and data properties required for the task to succeed. This produces the data requirements matrix — the analytical heart of the DQAF. The high-sensitivity tasks above are the starting point.

**On the IMF DQAF parallel.** The IMF DQAF's five quality dimensions (integrity, methodological soundness, accuracy, serviceability, accessibility) were derived from the tasks national statistical offices perform in producing and disseminating national accounts data. The analogous move here is: from these 45 practitioner tasks, derive the dimensions and indicators that the CVE DQAF will use to assess record quality. The Wang and Strong and Wand and Wang frameworks supply the dimension vocabulary; the task list grounds which dimensions matter and for whom.
