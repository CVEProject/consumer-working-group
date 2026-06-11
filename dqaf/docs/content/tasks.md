---
layout: document
title: "CVE Consumer Working Group DQAF — Task List"
document_file: tasks.md
status: draft
---

# CVE DQAF: Task List

This document identifies the tasks that CVE data consumers perform — the practitioner questions they need to answer in the course of their work. Each task is stated as a question without presupposing what CVE data contributes or whether CVE records are sufficient to answer it.

Tasks are grouped by function. Each task lists the roles that perform it, using the notation `Sector:Role:Task Family` drawn from the supporting role inventory.

**Tag definitions:**
`[structural gap]` — the CVE record cannot supply the information this task requires, regardless of record quality. The limitation is architectural, not fixable by better data.
`[thin]` — the task is identified but needs additional research before Phase 2 data element analysis.

47 tasks across 12 functional groups.

See also: [Role Inventory](roles).

---

## Product and Version Identification

### T001 — Given a CVE, what products and software versions are affected?

Determining applicability is the first operational step after a CVE is published. The practitioner needs to know which specific products and versions are vulnerable in order to assess their own exposure.

*Enterprise:Vulnerability Analyst:Detection · Generalist IT:IT Generalist:Applicability · Generalist IT:MSP Technician:Multi-Client Exposure · Threat Intel:SOC Analyst:Alert Triage · Threat Intel:CTI Analyst:Vulnerability Intelligence Monitoring · Independent:Bug Bounty Hunter:Target Research · Software Producers:PSIRT:Third-Party Dependency Response*

---

### T002 — Given a product or software version, which CVEs apply to it?

The reverse of T001: starting from a known asset or dependency, the practitioner retrieves the set of CVEs that cover it. This is how scanner-mediated vulnerability detection works at scale.

*Enterprise:Vulnerability Analyst:Detection · Generalist IT:IT Generalist:Applicability · Generalist IT:MSP Technician:Multi-Client Exposure · Tool Builders:Vulnerability Scanner Developer:Product Identification*

Note: For Tool Builders:Vulnerability Scanner Developer, this task is performed at scale for customer environments the operator does not directly manage. The product-to-CVE matching challenge is the same; the operational context differs.

---

### T003 — Does a null result from a CVE search mean "no known vulnerabilities" or "product unknown to the CVE program"?

The absence of results is ambiguous. A null result could mean the product has no documented vulnerabilities, or it could mean the product is not covered by the CVE program at all. The practitioner cannot distinguish these without additional context.

*Enterprise:Vulnerability Analyst:Detection · Generalist IT:IT Generalist:Applicability · Generalist IT:MSP Technician:Multi-Client Exposure*

---

### T004 — Does this vulnerability apply to our specific configuration or deployment?

Version matching establishes that a product is potentially affected. This task asks whether the particular deployment conditions, configuration, or operational context match the conditions the vulnerability requires.

*Enterprise:Vulnerability Analyst:Triage and Validation · Generalist IT:IT Generalist:Applicability · Enterprise:GRC Analyst:Risk Acceptance*

---

### T005 — Is the vulnerable code path in this dependency reachable from our application code?

In software composition analysis, a package is flagged as present even if the vulnerable function it contains is never called by the application. The practitioner needs to determine whether exploitation is possible given actual usage, not merely theoretical presence.

*Enterprise:Application Security Engineer:Dependency Triage*

---

## Vulnerability Characterization

### T006 — What does this vulnerability do, what does it affect, and what is the impact?

The basic description task: what is the nature of the flaw, what system or component does it affect, and what can an attacker accomplish by exploiting it. Performed across nearly every sector as part of triage, alert handling, and communication.

*Enterprise:Vulnerability Analyst:Risk Assessment · Generalist IT:IT Generalist:CVE Comprehension · Threat Intel:SOC Analyst:Alert Triage · Enterprise:Developer:Dependency Alert Response · Software Producers:PSIRT:Vulnerability Characterization · Independent:Bug Bounty Hunter:Target Research*

---

### T007 — What are the prerequisites and conditions for successful exploitation?

Exploitation conditions determine whether an environment is actually at risk given its specific controls and architecture. These conditions also feed directly into prioritization decisions and risk acceptance rationales.

*Enterprise:Vulnerability Analyst:Risk Assessment · Threat Intel:CTI Analyst:Exploitation Status · Threat Intel:SOC Analyst:Alert Triage · Software Producers:PSIRT:Vulnerability Characterization*

---

### T008 — What observable behavior does exploitation of this CVE produce in logs and telemetry? `[structural gap]`

Detection engineers and SOC analysts need behavioral specifics — payload patterns, process activity, network artifacts — to write detection rules and confirm exploitation. CVE records do not reliably contain this level of detail; it typically comes from proof-of-concept code and researcher write-ups rather than the record itself.

*Threat Intel:Detection Engineer:Detection Rule Development · Threat Intel:SOC Analyst:Exploitation Investigation*

---

### T009 — Does our detection rule for this CVE correctly fire on exploitation traffic and avoid false positives?

A detection rule that fires correctly but generates excessive false positives is operationally unusable. Validation and tuning requires test cases derived from exploitation activity — not from the CVE record, which cannot supply behavioral specifics.

*Threat Intel:Detection Engineer:Rule Validation and Tuning*

---

## Risk Assessment

### T010 — What risk does this vulnerability pose?

Risk characterization is required at multiple points: initial triage, prioritization, regulatory tier determination, and risk acceptance documentation. The practitioner needs to understand how harmful exploitation of this vulnerability could be.

*Enterprise:Vulnerability Analyst:Risk Assessment · Enterprise:Remediation Coordinator:Prioritization · Enterprise:GRC Analyst:Regulatory Mapping · Enterprise:GRC Analyst:Risk Acceptance · Generalist IT:IT Generalist:CVE Comprehension · Generalist IT:MSP Technician:Multi-Client Exposure · Threat Intel:SOC Analyst:Alert Triage · Software Producers:PSIRT:Intake and Triage · Tool Builders:ADP Enrichment Operator:Record Enrichment*

---

## Exploitation Status

### T011 — Is this CVE being actively exploited in the wild?

Active exploitation is one of the strongest prioritization signals available. The CVE record does not contain this information; the CVE ID serves as the lookup key for external sources such as the CISA KEV catalog and commercial threat intelligence feeds.

*Enterprise:Vulnerability Analyst:Risk Assessment · Enterprise:Vulnerability Analyst:Prioritization · Enterprise:GRC Analyst:Regulatory Mapping · Generalist IT:IT Generalist:Fix Identification · Threat Intel:CTI Analyst:Exploitation Status · Threat Intel:CTI Analyst:Vulnerability Intelligence Monitoring · Tool Builders:Vulnerability Database Aggregator:Enrichment · Research and Policy:Policy Analyst:Landscape Characterization*

---

### T012 — Is there public proof-of-concept or weaponized exploit code available?

The availability of exploit code materially changes remediation urgency. As with T011, the CVE record does not carry this signal; references may point to exploit code inconsistently, but the data is primarily external.

*Enterprise:Vulnerability Analyst:Risk Assessment · Threat Intel:CTI Analyst:Exploitation Status · Tool Builders:Vulnerability Database Aggregator:Enrichment · Tool Builders:ADP Enrichment Operator:Record Enrichment*

---

### T013 — How quickly after publication did exploitation begin, and how broadly is it observed? `[thin]`

The speed and breadth of exploitation shapes urgency calculations and informs policy arguments about whether mandated remediation windows are achievable in practice.

*Threat Intel:CTI Analyst:Exploitation Status · Threat Intel:CTI Analyst:Vulnerability Intelligence Monitoring · Research and Policy:Policy Analyst:Policy Effectiveness Measurement*

---

### T014 — Which threat actors and campaigns are associated with exploitation of this CVE, and is it used as part of a multi-step attack chain? `[structural gap]`

Attribution to specific threat actors, ransomware groups, or nation-state campaigns contextualizes risk for organizations facing particular adversaries. CVE records contain no threat actor information; the CVE ID is the correlation key used to link a vulnerability to external threat intelligence. This includes whether the CVE is chained with other CVEs in multi-step attacks — a common pattern in sophisticated campaigns where a single CVE's risk is elevated by its role in a broader kill chain.

*Threat Intel:CTI Analyst:Threat Actor and Campaign Correlation*

---

### T015 — Which CVEs in our environment are being exploited by threat actors that target organizations like ours? `[thin]`

CTI analysts produce intelligence products that combine exploitation status, threat actor attribution, and sector targeting into actionable guidance. This synthesis task depends on CVE IDs as correlation keys and external threat intelligence as the primary data source; the CVE record itself cannot answer it.

*Threat Intel:CTI Analyst:Intelligence Production*

---

## Fix and Remediation

### T016 — Is a fix available for this vulnerability?

The binary question of whether a patch exists determines the remediation path. A negative answer requires the practitioner to turn to workarounds, compensating controls, or formal risk acceptance.

*Enterprise:Vulnerability Analyst:Risk Assessment · Enterprise:Remediation Coordinator:Fix Identification · Generalist IT:IT Generalist:Fix Identification · Generalist IT:MSP Technician:Remediation Coordination · Enterprise:GRC Analyst:Risk Acceptance · Software Producers:PSIRT:Third-Party Dependency Response*

---

### T017 — What version or patch resolves this vulnerability, and where do I obtain it?

Given that a fix exists, the practitioner needs to know exactly which version contains it and where to get it. This is among the most operationally critical tasks in vulnerability management.

*Enterprise:Remediation Coordinator:Fix Identification · Generalist IT:IT Generalist:Fix Identification · Enterprise:Application Security Engineer:Dependency Remediation · Enterprise:Developer:Dependency Alert Response · Software Producers:PSIRT:Third-Party Dependency Response*

---

### T018 — Will applying the available fix cause operational problems?

Patches can introduce breaking changes, require prerequisites, or create compatibility issues. Practitioners need this information before committing to a maintenance window. CVE records typically do not contain it; vendor advisories are the primary source.

*Enterprise:Remediation Coordinator:Fix Identification · Enterprise:Application Security Engineer:Dependency Remediation · Enterprise:Developer:Dependency Alert Response*

---

### T019 — If no patch exists, what workaround or compensating control reduces exposure?

When no fix is available, the practitioner needs to understand what temporary or alternative controls can reduce risk until a patch exists or the vulnerability is accepted.

*Enterprise:Remediation Coordinator:Fix Identification · Generalist IT:IT Generalist:Fix Identification · Enterprise:GRC Analyst:Risk Acceptance*

---

### T020 — Has the remediated system been verified as actually fixed?

Closing a ticket is not the same as fixing a vulnerability. This task asks whether the affected asset was rescanned and confirmed to be running a version outside the vulnerable range.

*Enterprise:Remediation Coordinator:Remediation Verification*

---

## Duplicate Detection and Cross-Source Identity

### T021 — Has this vulnerability already been documented with a CVE ID?

Before initiating a new disclosure or requesting a CVE, the practitioner must verify that the vulnerability is not already documented. Inconsistent terminology and poor description quality make this search unreliable.

*Enterprise:Vulnerability Analyst:Triage and Validation · Software Producers:PSIRT:Intake and Triage · Independent:Security Researcher:Prior Art Research · Independent:Bug Bounty Hunter:Duplicate Check · Independent:Open Source Developer:Discovery and Scoping · Software Producers:Open Source Maintainer:Vulnerability Report Handling*

---

### T022 — Is there a CVE ID reserved but not yet published for this vulnerability?

A RESERVED CVE is visible as an ID but has no published record content. Practitioners need to know whether a relevant RESERVED entry exists to avoid duplicate disclosures or conflicting parallel processes.

*Software Producers:PSIRT:CVE ID Management · Independent:Security Researcher:Prior Art Research*

---

### T023 — Has this CVE been disputed, rejected, or withdrawn?

A DISPUTED CVE indicates that at least one party contests whether the described issue constitutes a valid vulnerability. A REJECTED CVE has been determined not to meet CVE criteria and should not be acted on. Practitioners must check CVE status before investing in triage or remediation work, and must propagate status changes through their tracking systems when records are updated.

*Enterprise:Vulnerability Analyst:Triage and Validation · Software Producers:PSIRT:Intake and Triage · Generalist IT:IT Generalist:Applicability*

---

### T024 — Is this entry in another vulnerability database the same vulnerability as an existing CVE?

Vulnerabilities are documented in multiple databases (GHSA, OSV, GCVE, vendor advisories) with different identifiers and sometimes conflicting field values. Determining whether two records describe the same vulnerability is a prerequisite for building a reliable unified corpus or feed.

*Tool Builders:Vulnerability Database Aggregator:Cross-Source Identity Resolution · Research and Policy:Academic Researcher:Cross-Source Harmonization*

---

## Regulatory Compliance

### T025 — Does this CVE trigger a mandatory remediation obligation under applicable regulations or directives?

Certain regulatory frameworks and directives mandate specific remediation timelines for specific CVEs. Determining whether a given CVE triggers one of these obligations requires its CVE ID (for KEV lookup), its assessed risk level (for tier determination), and its publication date (as the compliance clock start point).

*Enterprise:GRC Analyst:Regulatory Mapping · Enterprise:Vulnerability Analyst:Prioritization · Research and Policy:Policy Analyst:Policy Instrument Development*

---

### T026 — Are we meeting our CVE remediation SLAs and regulatory deadlines? `[thin]`

Organizations track vulnerability remediation against committed timelines. This task asks whether the program is meeting those commitments aggregated across the open vulnerability population.

*Enterprise:GRC Analyst:SLA Tracking · Enterprise:Vulnerability Analyst:Reporting and Metrics*

---

### T027 — Can we produce audit evidence demonstrating compliant handling of this CVE?

Auditors require evidence that CVEs were identified, assessed, and remediated within required windows, or that exceptions were formally documented. The CVE record anchors the audit trail.

*Enterprise:GRC Analyst:Audit Evidence Generation*

---

### T028 — What documentation is required to formally accept the risk of not remediating this CVE within the normal window?

When a CVE cannot be patched on schedule, formal risk acceptance documentation is required. The rationale must reference the vulnerability's risk level and the compensating controls in place.

*Enterprise:GRC Analyst:Risk Acceptance · Enterprise:Remediation Coordinator:Prioritization*

---

## CVE ID Coordination

### T029 — Should this vulnerability receive a CVE ID?

Not every security finding warrants a CVE ID. Determining eligibility requires applying the CVE program's counting rules and scope criteria — decisions that directly affect the comparability of CVE population statistics downstream.

*Software Producers:PSIRT:CVE ID Management · Software Producers:CNA Record Author:CVE Record Authoring · Software Producers:Open Source Maintainer:CVE Assignment and Advisory · Independent:Security Researcher:CVE ID Acquisition · Independent:Open Source Developer:CVE and Advisory Navigation*

---

### T030 — Which CNA is responsible for this vulnerability?

CVE ID assignment responsibility depends on whether the affected software has a CNA and which CNA has scope for it. Scope gaps mean some vulnerabilities fall through without a clear responsible party.

*Software Producers:PSIRT:CVE ID Management · Independent:Security Researcher:CVE ID Acquisition · Software Producers:Open Source Maintainer:CVE Assignment and Advisory · Independent:Open Source Developer:CVE and Advisory Navigation*

---

### T031 — Does this report describe one vulnerability or multiple, requiring separate CVE IDs?

A single report may describe multiple independent vulnerabilities. The counting decision affects how many IDs are requested and how downstream consumers track and deduplicate findings.

*Software Producers:PSIRT:CVE ID Management · Software Producers:CNA Record Author:CVE Record Authoring*

---

### T032 — When should a CVE ID be reserved and published relative to the disclosure timeline?

Timing the ID reservation and publication relative to the fix availability and embargo deadline has downstream quality implications: the CVE publication date anchors compliance clocks and exploitation timing measurements.

*Software Producers:PSIRT:CVE ID Management · Independent:Security Researcher:CVE ID Acquisition · Software Producers:Open Source Maintainer:CVE Assignment and Advisory*

---

### T033 — What do I do if the CVE ID is stuck in RESERVED state or the vendor disputes the CVE?

When a CVE remains in RESERVED state because a vendor is unresponsive or disputes the finding, the researcher faces escalation decisions: wait longer, publish without the ID, or involve a coordination body.

*Independent:Security Researcher:CVE ID Acquisition*

---

## Disclosure Process

### T034 — How do I report this vulnerability to the responsible party?

The initial step of coordinated disclosure: finding the right contact, using the right channel, and initiating the report without triggering premature public disclosure.

*Software Producers:PSIRT:Vulnerability Intake and Triage · Independent:Security Researcher:Vendor Reporting · Independent:Open Source Developer:Upstream Disclosure · Software Producers:Open Source Maintainer:Vulnerability Report Handling*

---

### T035 — What disclosure timeline is appropriate, and how do I manage it if the vendor is unresponsive or disputes the finding?

Coordinated disclosure timelines are negotiated between reporter and vendor. When vendors are non-cooperative or dispute the finding, reporters must decide when to escalate or publish.

*Software Producers:PSIRT:Disclosure Coordination · Independent:Security Researcher:Vendor Reporting*

---

### T036 — Which downstream parties need to be notified before public disclosure?

Multi-party vulnerabilities require notifying downstream vendors or integrators before public disclosure so they have time to prepare fixes. This coordination determines whether the eventual CVE record covers the full affected scope.

*Software Producers:PSIRT:Disclosure Coordination*

---

### T037 — Does our vendor's product ship a component affected by this third-party CVE, and do we need to publish our own advisory?

When a third-party CVE affects an upstream component that a vendor ships, the vendor must assess whether their product is affected and decide whether to publish an advisory or request their own CVE for the downstream impact.

*Software Producers:PSIRT:Third-Party Dependency Response*

---

### T038 — What should a CVE record contain to accurately and completely describe this vulnerability for downstream consumers?

Writing a CVE record requires deciding what to include across multiple fields: description, affected product and version ranges, weakness type, and references. CNAs frequently lack tooling support, field validation, and authoring guidance at record creation — a structural condition that shapes the quality of data all downstream sectors receive. The absence of automated quality checks at the point of authoring means errors and omissions enter the corpus without friction.

*Software Producers:CNA Record Author:CVE Record Authoring · Software Producers:Open Source Maintainer:CVE Assignment and Advisory*

---

## Prioritization

### T039 — Given limited resources, how do we prioritize which vulnerabilities get attention first?

Vulnerability queues and enrichment backlogs grow faster than they can be cleared. Practitioners must order work using risk signals from CVE records combined with operational context — asset criticality, patch window availability, business impact, or constituency need — that the record alone does not contain.

*Enterprise:Vulnerability Analyst:Prioritization · Enterprise:Remediation Coordinator:Prioritization · Tool Builders:ADP Enrichment Operator:Coverage Prioritization*

---

## Reporting and Metrics

### T040 — What is our current vulnerability exposure, and how has it changed over time? `[thin]`

Organizations track aggregate vulnerability posture — open count by risk tier, time-to-remediate, SLA compliance rates. These metrics depend on CVE publication dates and risk characterizations being accurate and consistent.

*Enterprise:Vulnerability Analyst:Reporting and Metrics · Enterprise:GRC Analyst:SLA Tracking*

---

### T041 — How do I communicate the implications of this CVE to a non-technical audience?

Non-technical stakeholders — business owners, executives, SMB clients — need CVE implications communicated without jargon. The quality of the CVE description determines how much translation work is required.

*Generalist IT:IT Generalist:CVE Comprehension · Generalist IT:MSP Technician:Client Communication*

---

### T042 — Which vulnerabilities in our environment currently lack detection coverage?

Detection engineers maintain a map of which CVEs affecting their environment have corresponding detection rules and which do not. Identifying and closing coverage gaps requires knowing both the vulnerability population and the current rule inventory.

*Threat Intel:Detection Engineer:Detection Coverage Assessment*

---

## Research and Policy Analytics

### T043 — How has the vulnerability population changed over time?

Studying change in the vulnerability population requires field values that are consistent over time. Changes in CNA participation, enrichment practices, or CWE taxonomies can produce apparent trends that are artifacts of data collection rather than real signals.

*Research and Policy:Academic Researcher:Vulnerability Trend Analysis · Research and Policy:Policy Analyst:Vulnerability Landscape Characterization*

---

### T044 — Can CVE field data be used to train a model that accurately predicts vulnerability record elements?

CVE description text, weakness assignments, risk scores, and product metadata are the features and labels for vulnerability prediction models. Whether those fields are accurate and consistent enough to support valid models is both a research design question and a data quality question.

*Research and Policy:Academic Researcher:Predictive Model Development*

---

### T045 — What fraction of the real vulnerability population does the CVE corpus represent, and where are the coverage gaps?

The CVE corpus is not a census of the software vulnerability population. Coverage depends on CNA participation and disclosure incentives. Whether the corpus is a representative sample is a prerequisite question for valid population-level inference.

*Research and Policy:Academic Researcher:Corpus Construction · Research and Policy:Policy Analyst:CVE Program Scope Assessment*

---

### T046 — Do CVE-based policy instruments reach the vulnerabilities they target, or do coverage gaps create structural blind spots?

Policy instruments like KEV use the CVE ID as a gating requirement. Exploited vulnerabilities in products without CNA coverage cannot enter KEV regardless of their exploitation evidence. The question is whether structural coverage gaps undermine the policy's intended reach.

*Research and Policy:Policy Analyst:CVE Program Scope Assessment*

---

### T047 — How do we build a research-grade corpus from multiple vulnerability data sources while preserving data provenance? `[thin]`

Building a research corpus from CVE, GHSA, OSV, and vendor advisories requires cross-source identity resolution, provenance tracking, and decisions about which source is authoritative when records conflict.

*Research and Policy:Academic Researcher:Cross-Source Harmonization*

---

*Supporting role inventory: roles.md*
*Next phase: data element analysis (Phase 2)*
