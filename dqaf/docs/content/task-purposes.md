---
layout: document
title: "CVE Consumer Working Group DQAF — Task Purpose Statements"
document_file: task-purposes.md
status: draft
---

# CVE DQAF — Task Purpose Statements

## Purpose of This Document

This document restates each of the 45 canonical tasks as a pure purpose statement: what the task is trying to accomplish, expressed as the outcome it produces or the decision it enables.

All references to current data formats, scoring systems, identifier schemes, and tools are deliberately excluded. The goal is to describe what success looks like for each task before asking what data is needed to achieve it. Describing current practice at this stage would constrain the data requirements analysis to what already exists rather than what is actually needed.

Tasks are grouped by phase. Role mappings remain in the Canonical Tasks document.

---

## Phase 1: Pipeline and Data Management

**T01. Ingest and normalize CVE records from primary sources**

*Purpose:* Ensure that every vulnerability record available from any authoritative source is accessible to downstream consumers in a consistent, processable form. The goal is completeness of coverage and consistency of representation — no vulnerability known to any source should be invisible to the consumer, and records from different sources should be comparable without custom interpretation.

---

**T02. Detect and propagate record changes and updates**

*Purpose:* Ensure that consumers always act on the current state of knowledge about a vulnerability, not a stale snapshot. Vulnerability records are not static — knowledge about scope, severity, fix availability, and exploitation status evolves after publication. The goal is that any change to authoritative knowledge reaches every downstream consumer promptly and completely.

---

**T03. Monitor feed health and handle source disruptions**

*Purpose:* Guarantee continuity of vulnerability information access. Practitioners making security decisions depend on current data. The goal is that disruptions in data availability are detected quickly and resolved before they produce gaps in coverage that affect security decisions downstream.

---

**T04. Deduplicate CVE records across sources**

*Purpose:* Ensure that a single vulnerability is counted and treated as one vulnerability regardless of how many sources describe it. Without deduplication, the same vulnerability generates redundant work, inflated counts, and potentially conflicting remediation instructions. The goal is a clean one-to-one correspondence between vulnerabilities and records in any downstream workflow.

---

**T05. Resolve cross-source identity**

*Purpose:* Determine with confidence whether two records from different sources describe the same underlying vulnerability. This is the analytical prerequisite to deduplication — it answers the question that automation alone cannot reliably answer. The goal is a trustworthy mapping between identifiers across sources so that a practitioner following a vulnerability across systems can be confident they are tracking the same thing.

---

**T06. Resolve split and merge cases**

*Purpose:* Maintain accurate correspondence between vulnerability records and real-world vulnerabilities. Some records over-aggregate — a single identifier covers multiple distinct vulnerabilities that require different responses. Some records over-split — multiple identifiers describe what is functionally one vulnerability. The goal is that the record corpus accurately reflects the count and distinctness of vulnerabilities in the world, so that prioritization, remediation, and analysis are operating on correct units.

---

## Phase 2: Asset-to-Vulnerability Matching

**T07. Match CVE records to assets in an inventory or manifest**

*Purpose:* Determine which vulnerabilities are actually present in the technology estate being protected. This is the foundational consumer task — a vulnerability that cannot be connected to something the organization uses is irrelevant for that organization's security decisions. The goal is complete and accurate knowledge of which vulnerabilities exist in the estate, with no false assurance from missed matches and no wasted effort from false matches.

---

**T08. Resolve false positives from identifier failures**

*Purpose:* Eliminate incorrect vulnerability-to-asset matches so that security resources are directed at real exposures rather than phantom ones. A false positive is not merely inefficient — it erodes trust in the vulnerability identification process and, at scale, can make the entire matching output unreliable. The goal is a match result that a practitioner can act on without manual verification of every finding.

---

**T09. Confirm match applicability for specific configurations or deployments**

*Purpose:* Determine whether a vulnerability that matches on product identity actually applies given how that product is deployed in this specific environment. A vulnerability may be present in a product but not exploitable in a given deployment because the affected feature is disabled, the affected configuration is not in use, or the affected component is not exposed. The goal is to distinguish genuinely exploitable exposures from theoretical ones, so that remediation effort targets real risk.

---

## Phase 3: Record Consumption and Interpretation

**T10. Look up and interpret a vulnerability record**

*Purpose:* Understand what a specific vulnerability is — what went wrong in the software, under what circumstances it can be triggered, and what an attacker gains from it. This is the baseline comprehension task that all downstream analytical and operational tasks depend on. The goal is that a practitioner can form an accurate mental model of the vulnerability sufficient to make decisions about detection, prioritization, remediation, and communication without needing to consult sources beyond the record.

---

## Phase 4: Vulnerability Discovery and Characterization

**T11. Discover a vulnerability**

*Purpose:* Identify the existence of a previously unknown flaw in software or hardware that an attacker could exploit. The value of this task is establishing that a risk exists before an attacker does. Discovery converts an unknown risk into a known one that can be addressed.

---

**T12. Reproduce and root-cause a vulnerability**

*Purpose:* Confirm that a vulnerability is real and understand precisely why it exists — what property of the software makes it exploitable. Reproduction establishes the vulnerability is not a false report. Root cause analysis locates the fault with enough precision to fix it correctly, write accurate descriptions, and communicate its nature to others. Without root cause analysis, every downstream task — fixing, detecting, communicating, and assessing — operates on incomplete understanding.

---

**T13. Enumerate exploitation conditions**

*Purpose:* Establish the complete set of circumstances that must hold simultaneously for a vulnerability to be exploitable. This is the most underappreciated characterization task. Knowing that a fault exists is not sufficient for detection, mitigation, or accurate risk assessment. Knowing exactly what must be true — about the attacker's position, the target's configuration, the sequence of events — determines whether any given deployment is actually at risk, what controls can block exploitation, and what a detection signature must observe. The goal is a complete conditional statement: "this vulnerability can be exploited if and only if conditions A, B, and C hold."

---

**T14. Determine affected versions, configurations, and platforms**

*Purpose:* Establish the precise scope of a vulnerability — which instances of a product are affected and which are not. This is the boundary-drawing task: it determines who has the problem. A vulnerability without a clear affected scope cannot be matched to assets, cannot generate a remediation target list, and cannot be communicated accurately. The goal is a statement precise enough that any consumer can determine independently whether their specific deployment falls inside or outside the affected scope.

---

## Phase 5: CVE Record Production and Maintenance

**T15. Author and publish a vulnerability record**

*Purpose:* Create a durable, authoritative, publicly accessible record of a vulnerability that enables every downstream consumer to act on it. The record is the communication act — it converts private knowledge about a vulnerability into shared knowledge that the ecosystem can use. The goal is a record that is sufficient for identification, characterization, prioritization, and remediation without requiring consumers to seek additional sources.

---

**T16. Update a vulnerability record post-publication**

*Purpose:* Keep the authoritative record current as knowledge about a vulnerability evolves. Initial publication reflects knowledge at disclosure time; that knowledge changes — additional affected versions are discovered, fixes become available, exploitation is observed, characterization is corrected. The goal is that the authoritative record always reflects the best current understanding, so that practitioners acting on it are not working from outdated information.

---

## Phase 6: Disclosure Coordination

**T17. Triage and validate an inbound vulnerability report**

*Purpose:* Determine quickly whether a reported vulnerability is real, novel, and within scope so that response resources are directed correctly. Triage protects against wasted effort on invalid or duplicate reports, and against delayed response to genuine critical vulnerabilities. The goal is an accurate, timely classification of each report that routes it to the appropriate response pathway.

---

**T18. Coordinate disclosure timeline, embargo, and downstream notification**

*Purpose:* Ensure that a fix is available to users before or at the same time as public knowledge of the vulnerability, and that all parties who need to act before disclosure can do so. Uncoordinated disclosure leaves users exposed before they can protect themselves. Over-delayed disclosure keeps users exposed while a fix exists. The goal is a disclosure event that maximizes the window in which affected parties can protect themselves before adversaries can exploit the vulnerability.

---

**T19. Reserve or assign a vulnerability identifier**

*Purpose:* Establish a stable, unique identifier for a vulnerability that all parties — vendor, researcher, consumer, tooling — can use to refer to the same thing unambiguously before and after public disclosure. Without a shared identifier established early, different parties develop different references for the same vulnerability, creating the coordination and deduplication problems that persist downstream. The goal is a single, authoritative identifier that all parties adopt from the moment the vulnerability is confirmed.

---

## Phase 7: Record Enrichment

**T20. Add or correct structured data in an existing vulnerability record**

*Purpose:* Close the gap between what the original publisher knew or chose to include and what consumers need to act on the record. Not every publisher has the capacity, expertise, or incentive to provide complete structured data at the time of publication. The goal is that the authoritative record — wherever a consumer reads it from — contains sufficient structured information to support all downstream tasks without requiring additional research.

---

## Phase 8: Risk Assessment

**T21. Assess the risk an unpublished vulnerability poses to inform response decisions**

*Purpose:* Form the best possible estimate of the risk a vulnerability poses before any public knowledge of it exists. The practitioner performing this task owns all information that currently exists about the vulnerability — there is no external signal to consult, no exploitation telemetry, no third-party characterization. The goal is a risk estimate grounded entirely in what the practitioner has determined through their own analysis: what the fault is, what must be true for it to be exploited, and what an attacker would gain. That estimate drives internal decisions about disclosure urgency, patch development priority, and who needs to be notified before the vulnerability is public. The quality of the estimate is bounded by the depth and accuracy of the practitioner's own analytical work, not by the quality of external data.

---

**T22. Assess the risk a published vulnerability poses to inform response decisions**

*Purpose:* Form the best possible estimate of the risk a known, publicly disclosed vulnerability poses to a specific organization or constituency. The practitioner is a consumer of externally produced information they did not generate and cannot fully control. The goal is the same as T21 — a risk estimate sufficient to drive a response decision — but the information environment is structurally different. External signals are available: the published record, enrichment from third parties, exploitation telemetry, threat actor targeting data, observed incidents. The information is richer but noisier, and the practitioner must evaluate the accuracy, currency, and completeness of sources they did not produce. The quality of the estimate depends on how well the external data ecosystem serves the practitioner's actual information needs, which is exactly what this DQAF is designed to assess.

---

## Phase 9: Prioritization

**T23. Prioritize vulnerabilities for remediation**

*Purpose:* Determine which vulnerabilities to address first, given that no organization has the resources to remediate all vulnerabilities simultaneously. Prioritization converts an unordered list of exposures into a ranked queue that allocates remediation effort where it reduces the most risk per unit of resource. The goal is a prioritization decision that a practitioner can defend — one grounded in the actual risk the vulnerability poses to this organization, not a proxy metric that approximates risk on average.

---

## Phase 10: Detection Engineering

**T24. Develop detection signatures and rules from exploitation conditions**

*Purpose:* Create the technical artifacts that allow security monitoring systems to recognize exploitation attempts or vulnerable states in real time. Detection is the operational translation of vulnerability knowledge into defensive capability. The goal is a detection artifact specific enough to catch real exploitation reliably, broad enough not to miss variants, and precise enough not to generate false alarms on benign traffic.

---

## Phase 11: Offensive Operations

**T25. Develop or adapt a working exploit or proof-of-concept**

*Purpose:* Produce a functional demonstration that a vulnerability is actually exploitable as described, enabling defenders to validate that their controls work and red teams to assess real exposure. A working exploit converts theoretical vulnerability knowledge into empirical evidence of exploitability. The goal is a reliable demonstration of what an attacker can actually achieve so that defenders test against reality rather than assumption.

---

## Phase 12: Remediation

**T26. Identify the available fix and understand how to obtain it**

*Purpose:* Determine what action eliminates the vulnerability from a system — what version to install, what patch to apply, or what configuration to change — and where that fix can be obtained. The goal is that a practitioner responsible for remediation knows with certainty what to do and where to get what they need, without having to research across multiple sources or interpret ambiguous version comparisons.

---

**T27. Deploy fix or update to affected assets**

*Purpose:* Eliminate the vulnerability from the environment by applying the available fix. This is the act that actually reduces risk — everything before it in the workflow is preparation. The goal is complete, correct application of the fix across all affected assets with minimum disruption to operations.

---

**T28. Design and implement a workaround or compensating control**

*Purpose:* Reduce or eliminate the risk posed by a vulnerability when a fix cannot be applied — because no fix exists, because the fix cannot be tested in time, or because operational constraints prevent immediate deployment. A workaround does not eliminate the vulnerability but can make it unexploitable or limit its consequences in a specific deployment. The goal is a control that provides meaningful risk reduction within the constraints of the environment, with a clear understanding of what it does and does not protect against.

---

**T29. Verify that a vulnerability has been successfully remediated**

*Purpose:* Confirm that a fix or workaround has actually eliminated or adequately reduced the vulnerability in the specific environment, and that the system is no longer exposed. The goal is confident closure — not administrative closure — of a vulnerability finding, so that remediation records accurately reflect the actual security state of the environment.

---

## Phase 13: Communication and Advisory

**T30. Write a technical or customer-facing advisory or security bulletin**

*Purpose:* Give affected parties — customers, partners, internal teams — the information they need to understand a vulnerability and act on it. An advisory translates vulnerability knowledge into actionable communication. The goal is that every affected party who reads the advisory knows whether they are affected, how serious the exposure is, and what to do about it, without needing to consult additional sources.

---

**T31. Communicate vulnerability impact to non-technical audiences**

*Purpose:* Give decision-makers who lack technical background — executives, board members, regulators, customers, the public — an accurate understanding of what a vulnerability means for them and what decisions they face. The goal is that non-technical audiences can make informed decisions about resource allocation, public communication, regulatory response, and organizational risk posture without misunderstanding what the vulnerability actually means.

---

## Phase 14: Threat Intelligence Correlation

**T32. Correlate vulnerability records with threat actor activity and exploitation telemetry**

*Purpose:* Determine which vulnerabilities are being actively targeted, by whom, and with what implication for the organization's specific exposure. Vulnerability records describe static properties of software flaws. Threat intelligence describes dynamic attacker behavior. Correlation between the two answers the question that matters most for prioritization: not "how bad could this be?" but "is anyone actually doing this, and to organizations like mine?" The goal is a current, grounded picture of which vulnerabilities represent active rather than theoretical risk.

---

**T33. Map vulnerability records to attack technique frameworks**

*Purpose:* Connect specific vulnerabilities to the broader landscape of attacker techniques and tactics, enabling defenders to reason about coverage and gaps in their detection and mitigation posture. The goal is that understanding one vulnerability illuminates a class of attacker behavior, so that defensive investments address categories of risk rather than individual records.

---

## Phase 15: Compliance and Regulatory Tracking

**T34. Map vulnerabilities to regulatory requirements and compliance frameworks**

*Purpose:* Determine which vulnerabilities carry mandatory remediation obligations and under what timeline. Regulatory frameworks increasingly reference vulnerability data as a trigger for required action. The goal is that compliance-driven remediation is accurate — that the right vulnerabilities are being tracked for the right regulations — and that no mandatory remediation is missed because the mapping was unclear or incomplete.

---

**T35. Track remediation against compliance deadlines and produce audit evidence**

*Purpose:* Demonstrate to regulators, auditors, and customers that required vulnerabilities were remediated within mandated timelines. The goal is audit-ready evidence that accurately reflects what was done and when, so that compliance posture can be verified without ambiguity about whether requirements were met.

---

## Phase 16: Vendor and Procurement Risk

**T36. Assess vendor security posture for procurement or contractual decisions**

*Purpose:* Evaluate whether a software vendor manages the security of their products responsibly before or during a commercial relationship. The vulnerability history of a product is evidence of vendor security maturity — how quickly they find and fix flaws, how transparently they communicate, and how seriously they take their customers' security. The goal is a procurement or contract decision informed by evidence of how the vendor actually behaves when vulnerabilities are discovered, not just what they claim in marketing materials.

---

## Phase 17: Data Quality Management

**T37. Monitor and measure vulnerability data quality at corpus scale**

*Purpose:* Establish an accurate, current picture of how well the vulnerability record corpus serves practitioner needs. Without systematic quality measurement, quality failures are discovered case-by-case by practitioners who encounter them — an invisible, distributed tax on every downstream workflow. The goal is that quality problems are visible, measurable, and attributable before they propagate to operational decisions.

---

**T38. Resolve conflicts between sources with different characterizations**

*Purpose:* Establish which characterization of a vulnerability is correct when authoritative sources disagree. Conflicting characterizations leave practitioners unable to act with confidence — they cannot know whether the severity assessment, affected scope, or fix reference they are using is accurate. The goal is a single authoritative answer for each contested data element, with a documented basis for why that answer was chosen.

---

**T39. Maintain provenance records for data elements across sources**

*Purpose:* Enable any practitioner to determine who said what about a vulnerability, when, and on what basis. Provenance is the foundation of trust in data — without it, a consumer cannot assess whether a characterization is authoritative, current, or reliable. The goal is that any data element in a vulnerability record can be traced to its origin, so that trust can be calibrated and errors can be corrected at the source.

---

## Phase 18: Analysis and Reporting

**T40. Generate trend reports and aggregate analyses from vulnerability corpus data**

*Purpose:* Produce a picture of vulnerability patterns across products, vendors, weakness types, and time that no individual record can provide. Aggregate analysis answers strategic questions: where are vulnerabilities concentrated, how is the landscape changing, and what systemic problems demand systemic responses? The goal is analysis that is valid — that reflects the actual distribution of vulnerabilities in the world rather than the distribution of reporting artifacts in the corpus.

---

**T41. Measure vulnerability program effectiveness**

*Purpose:* Determine whether the organization's vulnerability management program is actually reducing risk over time. Effectiveness measurement answers whether investment in vulnerability management is working, where it is failing, and what should change. The goal is an honest, evidence-based assessment of program performance that supports resource allocation and process improvement decisions.

---

**T42. Conduct empirical research on the vulnerability ecosystem**

*Purpose:* Generate reliable, generalizable knowledge about how vulnerability disclosure, scoring, exploitation, and remediation actually work — knowledge that the ecosystem can use to improve itself. The goal is findings that are valid because the underlying data is trustworthy, and actionable because they identify specific, addressable failures in how the ecosystem produces and consumes vulnerability information.

---

## Phase 19: Governance and Standards

**T43. Define and enforce vulnerability program policies and quality criteria**

*Purpose:* Establish the rules that determine what a valid, useful vulnerability record looks like and hold data producers accountable to those rules. Without enforced quality criteria, the minimum valid record and the minimum useful record diverge, and the gap grows as the ecosystem expands. The goal is a program where quality expectations are clear, measurable, and consistently applied, so that the corpus improves rather than degrades as it scales.

---

**T44. Participate in standards governance**

*Purpose:* Shape the shared vocabularies, classification systems, and data formats that the ecosystem uses to express vulnerability knowledge, so that those standards serve practitioner needs rather than constrain them. Standards are not neutral — they embed assumptions about what matters and how it should be expressed. The goal is that standards decisions are grounded in evidence of practitioner need rather than institutional inertia, and that the standards evolve as practitioner needs evolve.

---

**T45. Define regulatory mandates using vulnerability-derived evidence**

*Purpose:* Establish legally or regulatorily binding requirements that translate vulnerability risk into mandatory organizational action, grounded in evidence of actual risk rather than arbitrary thresholds. The goal is policy that directs remediation resources toward genuine risk, that is enforceable because it references clear and reliable vulnerability information, and that produces measurable improvement in the security posture of regulated organizations.

---

## Notes

**What this document is for.** These purpose statements are the input to the data requirements analysis — the next step in the DQAF. For each task, the question becomes: what properties must a vulnerability record have for a practitioner performing this task to achieve the stated purpose? That question, asked systematically across all 45 tasks, produces the data requirements matrix that the DQAF's assessment criteria will be built from.

**What these statements intentionally exclude.** No current data format, scoring system, identifier scheme, or tool is named anywhere in this document. This is deliberate. The moment a purpose statement references a current mechanism, it narrows the data requirements analysis to what that mechanism provides rather than what the task actually needs. The mechanisms — and their failures — belong in the assessment criteria, not in the purpose statements.

**The most revealing tasks.** T10, T13, T21, T22, T23, and T29 are worth examining carefully against current practice. T21 and T22 in particular expose the asymmetry between producer-side and consumer-side risk assessment: the same goal, structurally different information constraints, and therefore different data quality requirements. That asymmetry is the DQAF's most significant structural finding at this stage.
