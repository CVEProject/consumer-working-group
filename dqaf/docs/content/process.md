---
layout: document
title: "CVE Consumer Working Group DQAF — Development Process and Validation Gates"
document_file: process.md
status: draft
---

# CVE DQAF — Development Process and Validation Gates

## Purpose

This document defines the methodology the CVE Consumer Working Group will use to develop the CVE Data Quality Assessment Framework, and specifies the validation gates at which working group members review and approve work before the next stage begins.

The framework cannot be built top-down from a theory of data quality. It must be built bottom-up from what practitioners actually do with CVE data. The six-step process below enforces that grounding at every stage. Each step produces a concrete, reviewable artifact. Each gate is a real decision point, not a formality.

---

## How Validation Gates Work

A validation gate opens when a step's output document is circulated to CWG members. The review period is two weeks from circulation unless the co-chairs specify otherwise. During that period, members may submit additions, corrections, or objections. Revisions are made where warranted. The gate closes when the co-chairs determine that no unresolved substantive objection remains.

"Substantive objection" means a claim that the output is incorrect, incomplete, or will produce a flawed downstream result if used as-is. Disagreements about framing or wording that do not affect analytical content are resolved at the co-chairs' discretion and do not block gate closure.

The next step does not begin until the preceding gate has closed. This constraint exists because errors in earlier steps propagate: a missing task in Step 1 means a missing data requirement in Step 2, a missing metric in Step 4, and a missing intervention in Step 6. Catching the error at Step 1 costs one revision cycle. Catching it at Step 5 costs five.

---

## The Six Steps

### Step 1: Identify Consumer Tasks

**What this step produces:** A validated list of the tasks that practitioners across the CVE ecosystem actually perform using CVE data, organized by role. Tasks are stated as verb phrases describing what a practitioner does, not as data properties or program goals.

**Why this step is necessary.** Data quality is relational — a record is only good or bad relative to someone's use of it. The task list defines who uses CVE data and for what. Every downstream step is anchored to this list. A task that is missing from the list will have no data requirements, no metrics, and no intervention — the corresponding practitioner's needs are invisible to the framework.

**Current state.** A draft role inventory (41 roles across six groups) and canonical task list (45 tasks across 19 phases) have been prepared, along with mechanism-free purpose statements for each task. These are drafts, not validated outputs. Gate 1 is the first formal CWG review.

**What reviewers are asked to assess at Gate 1:**
- Does every role in the inventory represent a real practitioner function in the CVE ecosystem? Are any roles missing or miscategorized?
- Does every canonical task represent something practitioners actually do? Are any tasks missing, over-aggregated, or artificially split?
- Does the purpose statement for each task accurately describe what success looks like from the practitioner's perspective?
- Is any task present that does not actually involve CVE data in a meaningful way?

**Gate 1 output:** An approved role inventory, canonical task list, and purpose statement set. No changes to this list after Gate 1 closure without a formal revision request.

---

### Step 2: Identify Required Data Elements per Task

**What this step produces:** For each canonical task, a list of the underlying data elements — phenomena, facts, or properties — that a practitioner needs to have access to in order to accomplish the task's stated purpose.

**Why this step is necessary.** The task list establishes what practitioners are trying to do. This step establishes what information they need to do it. Identifying data needs before examining any current data format forces the analysis to describe what is actually needed, not what currently exists. That distinction matters: describing current fields would confound needs analysis with gap analysis, and would prevent the framework from identifying design gaps — cases where the CVE schema cannot express what practitioners need.

**Important constraint.** Data elements at this step must be stated as underlying phenomena, not as fields in any existing framework. "The network location from which exploitation must originate" is a data element. "Attack Vector in CVSS" is not — it is one possible (and imperfect) representation of that element. This distinction is enforced throughout Step 2 and carried forward into Steps 3 and 4.

**What reviewers are asked to assess at Gate 2:**
- For each task, is the data element list complete? Are there information needs the practitioner has that are not captured?
- Are any listed elements not genuinely required for the task — present because they are available in current records rather than because the task requires them?
- Are elements stated as phenomena rather than as current fields or scores? (Reviewers should flag any element that presupposes a specific current format.)
- Do elements that appear across multiple tasks use consistent terminology?

**Note on coupling with Step 3.** Steps 2 and 3 are analytically coupled: the data element list from Step 2 is the input to the IQ dimension assignments in Step 3, and a reviewer cannot fully evaluate whether an element is correctly scoped without knowing which failure modes are being assessed. Gate 2 and Gate 3 will therefore be conducted as a single combined review. Step 2 and Step 3 outputs will be circulated together.

**Gate 2/3 output:** An approved data requirements table linking each canonical task to its required data elements, with IQ dimension assignments per element (see Step 3).

---

### Step 3: Select Applicable IQ Dimensions per Data Element

**What this step produces:** For each data element identified in Step 2, the information quality dimensions that are applicable — the specific ways in which that element can fail to serve practitioner needs.

**Why this step is necessary.** Different data elements within the same task fail for different reasons. The weakness type in a CVE record can be absent (completeness failure), present but vaguely stated at a useless level of abstraction (granularity failure), or present but incorrect (correctness failure). Assigning dimensions at the element level rather than the task level makes those distinctions visible. A framework that assigns dimensions only at the task level produces interventions that are too coarse to be useful.

**Theoretical grounding.** The framework draws on two complementary dimension models. Wang and Strong (1996) supply dimensions grounded in practitioner perception: accuracy, completeness, consistency, timeliness, and related categories. Wand and Wang (1996) supply dimensions grounded in formal representation theory: completeness (the real-world phenomenon is representable and represented), unambiguity (the representation has a unique interpretation), meaningfulness (the representation corresponds to a possible real-world state), and correctness (the representation accurately reflects the real-world state). Both frameworks are in use; elements will be assigned dimensions from whichever framework best characterizes their failure mode.

**Departure from the conference paper.** The conference paper (Jacobs and Gamblin, 2026) assigned IQ dimensions at the task level. The CWG framework assigns them at the data element level. This is the correct approach for producing actionable metrics — it produces more dimensions in total but assigns them with greater precision.

**What reviewers are asked to assess at Gate 2/3 (combined with Step 2):**
- For each data element, do the assigned dimensions accurately characterize how that element fails in practice?
- Are there failure modes practitioners encounter regularly that the assigned dimensions do not capture?
- Are any dimension assignments implausible — dimensions assigned to elements that do not actually fail in that way?

---

### Step 4: Operationalize Objective Metrics per Dimension–Data Element Pair

**What this step produces:** For each dimension–data element pair, a computable metric: a specific measurement procedure that can be applied to the CVE corpus without requiring human judgment to classify individual records.

**Why this step is necessary.** A data quality framework without computable metrics produces assessments that cannot be replicated, tracked over time, or compared across CNAs or product categories. The framework's value to the CVE program depends on measurements being objective and reproducible. "This record has a poor description" is an observation. "The description field is absent in 34% of records for this CNA" is a measurement.

**The computable constraint.** Metrics must be computable from the corpus without human judgment applied to individual records. This constraint is strict by design. If measuring a dimension requires a human to read and evaluate a record, the metric is not operationalized — it is a rubric for manual audit. The framework distinguishes between the two. Some dimensions for some elements may not admit a fully computable metric; where that is the case, the step documents the limitation explicitly rather than substituting a proxy that measures something adjacent.

**What reviewers are asked to assess at Gate 4:**
- Does each metric measure what the dimension–element pair requires, or does it measure a proxy that may not correlate reliably?
- Is the computable constraint satisfied? (Reviewers should flag any metric that would require human judgment to apply at corpus scale.)
- Are there dimension–element pairs where no computable metric has been proposed? Do reviewers have candidates?
- Will the proposed metrics produce actionable numbers — results that distinguish CNAs, product categories, or time periods in ways that support intervention?

**Gate 4 output:** An approved metrics specification: for each dimension–data element pair, the metric definition, the field(s) or derived features it operates on, and the explicit scope of what it does and does not measure.

---

### Step 5: Measure Against the Corpus and Analyze Root Causes

**What this step produces:** Measurements of each metric against the CVE corpus, organized by root cause category: population gaps, design gaps, operational failure and garbling, and environmental or organizational constraints.

**Why this step is necessary.** Measurement converts the framework from a specification into an empirical finding. It establishes what the actual quality of the CVE corpus is relative to practitioner needs, and — critically — why the failures occur. Two records with the same missing field have the same completeness score but may have different root causes: one CNA lacked the information, another had it but the schema provides no way to express it. Interventions must target root causes, not symptoms.

**Root cause categories.** Four categories are used:

*Population gap.* The schema can represent the data element; records do not contain it. The failure is a production or compliance failure. The data exists or could exist; it is simply not being included.

*Design gap.* The schema cannot represent the data element. No amount of CNA effort will close this gap because there is no field to populate. The failure requires schema evolution or a supplementary data source.

*Operational failure and garbling.* The schema can represent the element and records do contain it, but the values exhibit notable variation that cannot be attributed to genuine variation in the underlying vulnerabilities. This includes values that are technically present but functionally empty ("n/a", root-level CWE assignments, CVSS scores that are internally inconsistent), and values that vary across CNAs or over time in ways that reflect scoring inconsistency rather than real differences. The term "garbling" comes from Wand and Wang (1996): a representation that maps to no valid real-world state.

*Environmental and organizational constraints.* Failures that cannot be attributed to the schema or to CNA behavior alone — cases where the data element is in principle expressible but is systematically absent because the information is unavailable at disclosure time, because organizational incentives discourage disclosure, or because the information exists in a form (e.g., proprietary asset inventories) that the CVE program has no mechanism to incorporate. These failures are real but have different intervention targets than population gaps.

**What reviewers are asked to assess at Gate 5:**
- Do the measurement results match practitioners' lived experience of CVE data quality? Where results are surprising, is the anomaly in the measurement or in the expectation?
- Are root cause attributions correct? Reviewers who regularly work with specific CNAs, product categories, or schema elements are best positioned to validate whether a failure is a population gap, a design gap, or operational.
- Are there systematic patterns in the results that suggest a root cause not captured by the four categories?

**Gate 5 output:** Approved measurement results with root cause classifications. These results are the evidentiary basis for the interventions in Step 6.

---

### Step 6: Specify Interventions

**What this step produces:** For each root cause category, a set of targeted interventions — actions the CVE program, CNAs, working groups, or consumers can take to close the identified quality gaps.

**Why this step is necessary.** Measurement without intervention is a report, not a framework. The DQAF's purpose is to improve CVE data quality for practitioners. That requires translating findings into actions that are targeted, feasible, and attributable to responsible parties.

**Intervention mapping by root cause:**

*Population gaps* are addressed through producer guidance and enrichment. Guidance targets CNAs directly: specific, actionable instructions for what to include and how to express it. Enrichment targets the ADP layer: structured addition of missing data by authorized third parties when CNA production fails to meet practitioner needs. Both are necessary; neither alone is sufficient at corpus scale.

*Design gaps* require schema evolution or supplementary sources. Schema evolution is a program-level decision with governance implications; the DQAF's role is to document the gap and specify what the schema would need to express. Supplementary sources (ADPs, external databases, threat intelligence feeds) can fill design gaps without waiting for schema change, but introduce provenance and consistency challenges that must be managed.

*Operational failure* requires distinguishing variation with an identifiable root cause from inherent variation. Variation with an assignable cause — inconsistent CNA interpretation of CVSS metrics, systematic CWE under-specification by a class of CNAs, temporal drift in scoring behavior — is correctable through targeted guidance, training, or automated validation. Inherent variation reflects genuine uncertainty in the underlying vulnerability characterization and cannot be eliminated through program intervention; the appropriate response is to surface it as a confidence or reliability signal rather than treat it as a quality failure.

*Environmental and organizational constraints* have intervention targets outside the CVE program's direct control. These gaps are documented in the framework as structural findings. Where the program can provide indirect incentives or coordinate with external parties (asset database operators, cloud providers, OEM ecosystems), specific mechanisms are proposed. Where it cannot, the finding informs consumer expectations rather than producer requirements.

**What reviewers are asked to assess at Gate 6:**
- Are the proposed interventions targeted at the correct responsible parties? Does each intervention have a clear owner within or adjacent to the CVE program?
- Are any interventions proposed for population gaps that are actually design gaps? (This misattribution produces interventions that will fail — asking CNAs to populate fields that don't exist, or exist but cannot express what practitioners need.)
- Are the operational failure interventions specific enough to be actionable? "Improve consistency" is not an intervention. "Add an automated check that flags CVSS AV:N scores on vulnerabilities whose description contains 'local access required'" is.
- Do the interventions for environmental and organizational constraints accurately reflect what is and is not within the program's reach?

**Gate 6 output:** Approved intervention specifications. These constitute the actionable output of the DQAF.

---

## Process Summary

| Step | Output | Gate | Reviewers assess |
|---|---|---|---|
| 1. Identify consumer tasks | Role inventory, canonical task list, purpose statements | Gate 1 | Completeness and accuracy of roles and tasks |
| 2. Identify required data elements | Data requirements per task | Gate 2/3 (combined) | Completeness, mechanism-independence of elements |
| 3. Select IQ dimensions per element | Dimension assignments per element | Gate 2/3 (combined) | Accuracy of failure mode characterization |
| 4. Operationalize metrics | Metric specifications per dimension–element pair | Gate 4 | Validity and computability of metrics |
| 5. Measure and analyze root causes | Corpus measurements with root cause classification | Gate 5 | Agreement with practitioner experience; root cause accuracy |
| 6. Specify interventions | Intervention specifications by root cause category | Gate 6 | Targeting, feasibility, specificity of interventions |

Gates 2 and 3 are combined into a single review because the data element list and the dimension assignments are analytically dependent and cannot be evaluated independently.

No step begins before the preceding gate has closed.

---

## Notes

**On the relationship to the conference paper.** Jacobs and Gamblin (2026) used a six-task-family taxonomy and assigned IQ dimensions at the task level. The CWG framework uses a 45-task canonical list and assigns dimensions at the data element level. The paper established the theoretical foundations; the CWG process expands the task scope and increases analytical precision. The two are compatible but not identical. CWG members who have read the paper should expect the framework to look more granular, not contradictory.

**On pace.** This process is designed to be thorough, not fast. Each gate requires a real review period and real working group engagement. A framework produced quickly without practitioner validation will be challenged on those grounds. A framework produced slowly with documented, thorough validation will not.
