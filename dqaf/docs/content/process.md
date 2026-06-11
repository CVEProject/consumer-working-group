---
layout: document
title: "CVE Consumer Working Group DQAF — Development Process"
document_file: process.md
status: draft
---

# CVE DQAF :Development Process

## Purpose

This document defines the methodology the CVE Consumer Working Group will use to develop the CVE Data Quality Assessment Framework.

The framework cannot be built top-down from a theory of data quality. It must be built bottom-up from what practitioners actually do with CVE data. The six-step process below enforces that grounding at every stage. Each step produces a concrete artifact that feeds directly into the next.

---

## The Six Steps

### Step 1: Identify Consumer Tasks

**Current state:** In progress.

 
This step will produce a list of the roles and their tasks that practitioners across the CVE ecosystem actually perform using CVE data, organized by role. Tasks are stated as verb phrases describing what a practitioner does, not as data properties or program goals.

Data quality cannot be measured by only focusing on the data, we must establish the tasks it supports and who needs that support. CVE records serve dozens of distinct practitioner communities performing fundamentally different tasks. A single CVE record may be high quality according to the vulnerability analyst reading an individual record, but completely unusable for someone looking for vulnerabilities in an SBOM record. Data quality can only be judged through the lens of each individual task. 

---

### Step 2: Identify Required Data Elements per Task

**What this step produces:** For each canonical task, a list of the underlying data elements — phenomena, facts, or properties — that a practitioner needs in order to accomplish the task's stated purpose.

**Why this step is necessary.** The task list establishes what practitioners are trying to do. This step establishes what information they need to do it. Identifying data needs before examining any current data format forces the analysis to describe what is actually needed, not what currently exists. Describing current fields would confound needs analysis with gap analysis, and would prevent the framework from identifying design gaps — cases where the CVE schema cannot express what practitioners need.

**Important constraint.** Data elements must be stated as underlying phenomena, not as fields in any existing framework. "The network location from which exploitation must originate" is a data element. "Attack Vector in CVSS" is not — it is one possible (and imperfect) representation of that element. This distinction is enforced throughout Step 2 and carried forward into Steps 3 and 4.

**Note on coupling with Step 3.** Steps 2 and 3 are analytically coupled: the data element list from Step 2 is the input to the IQ dimension assignments in Step 3, and it is not possible to fully evaluate whether an element is correctly scoped without knowing which failure modes are being assessed. Steps 2 and 3 are therefore developed and presented together.

---

### Step 3: Select Applicable IQ Dimensions per Data Element

**What this step produces:** For each data element identified in Step 2, the information quality dimensions that are applicable — the specific ways in which that element can fail to serve practitioner needs.

**Why this step is necessary.** Different data elements within the same task fail for different reasons. The weakness type in a CVE record can be absent (completeness failure), present but stated at a useless level of abstraction (granularity failure), or present but incorrect (correctness failure). Assigning dimensions at the element level rather than the task level makes those distinctions visible. A framework that assigns dimensions only at the task level produces interventions that are too coarse to be useful.

**Theoretical grounding.** The framework draws on two complementary dimension models. Wang and Strong (1996) supply dimensions grounded in practitioner perception: accuracy, completeness, consistency, timeliness, and related categories. Wand and Wang (1996) supply dimensions grounded in formal representation theory: completeness (the real-world phenomenon is representable and represented), unambiguity (the representation has a unique interpretation), meaningfulness (the representation corresponds to a possible real-world state), and correctness (the representation accurately reflects the real-world state). Both frameworks are in use; elements are assigned dimensions from whichever framework best characterizes their failure mode.

**Departure from the conference paper.** Jacobs and Gamblin (2026) assigned IQ dimensions at the task level. The DQAF assigns them at the data element level. This produces more dimension assignments in total but with greater precision, and generates more actionable metrics downstream.

---

### Step 4: Operationalize Objective Metrics per Dimension–Data Element Pair

**What this step produces:** For each dimension–data element pair, a computable metric: a specific measurement procedure that can be applied to the CVE corpus without requiring human judgment to classify individual records.

**Why this step is necessary.** A data quality framework without computable metrics produces assessments that cannot be replicated, tracked over time, or compared across CNAs or product categories. "This record has a poor description" is an observation. "The description field is absent in 34% of records for this CNA" is a measurement.

**The computable constraint.** Metrics must be computable from the corpus without human judgment applied to individual records. If measuring a dimension requires a human to read and evaluate a record, the metric is not operationalized — it is a rubric for manual audit. The framework distinguishes between the two. Some dimensions for some elements may not admit a fully computable metric; where that is the case, the step documents the limitation explicitly rather than substituting a proxy that measures something adjacent.

---

### Step 5: Measure Against the Corpus and Analyze Root Causes

**What this step produces:** Measurements of each metric against the CVE corpus, organized by root cause category: population gaps, design gaps, operational failure and garbling, and environmental or organizational constraints.

**Why this step is necessary.** Measurement converts the framework from a specification into an empirical finding. It establishes the actual quality of the CVE corpus relative to practitioner needs, and — critically — why the failures occur. Two records with the same missing field have the same completeness score but may have different root causes: one CNA lacked the information, another had it but the schema provides no way to express it. Interventions must target root causes, not symptoms.

**Root cause categories.**

*Population gap.* The schema can represent the data element; records do not contain it. The data exists or could exist; it is not being included. The failure is a production or compliance failure.

*Design gap.* The schema cannot represent the data element. No amount of CNA effort closes this gap because there is no field to populate. The failure requires schema evolution or a supplementary data source.

*Operational failure and garbling.* The schema can represent the element and records do contain it, but the values exhibit variation that cannot be attributed to genuine variation in the underlying vulnerabilities. This includes values that are technically present but functionally empty ("n/a", root-level CWE assignments, internally inconsistent CVSS scores), and values that vary across CNAs or over time in ways that reflect scoring inconsistency rather than real differences. The term "garbling" comes from Wand and Wang (1996): a representation that maps to no valid real-world state.

*Environmental and organizational constraints.* Failures that cannot be attributed to the schema or to CNA behavior alone — cases where the data element is in principle expressible but systematically absent because the information is unavailable at disclosure time, because organizational incentives discourage disclosure, or because the information exists in a form the CVE program has no mechanism to incorporate. These failures are real but have different intervention targets than population gaps.

---

### Step 6: Specify Interventions

**What this step produces:** For each root cause category, a set of targeted interventions — actions the CVE program, CNAs, working groups, or consumers can take to close the identified quality gaps.

**Why this step is necessary.** Measurement without intervention is a report, not a framework. Translating findings into action requires that interventions be targeted, feasible, and attributable to responsible parties.

**Intervention mapping by root cause.**

*Population gaps* are addressed through producer guidance and enrichment. Guidance targets CNAs directly: specific, actionable instructions for what to include and how to express it. Enrichment targets the ADP layer: structured addition of missing data by authorized third parties when CNA production fails to meet practitioner needs. Both are necessary; neither alone is sufficient at corpus scale.

*Design gaps* require schema evolution or supplementary sources. Schema evolution is a program-level decision with governance implications; the DQAF's role is to document the gap and specify what the schema would need to express. Supplementary sources can fill design gaps without waiting for schema change, but introduce provenance and consistency challenges that must be managed.

*Operational failure* requires distinguishing variation with an identifiable root cause from inherent variation. Variation with an assignable cause — inconsistent CNA interpretation of CVSS metrics, systematic CWE under-specification by a class of CNAs, temporal drift in scoring behavior — is correctable through targeted guidance, training, or automated validation. Inherent variation reflects genuine uncertainty in the underlying vulnerability characterization and cannot be eliminated through program intervention; the appropriate response is to surface it as a confidence or reliability signal rather than treat it as a quality failure.

*Environmental and organizational constraints* have intervention targets outside the CVE program's direct control. These gaps are documented as structural findings. Where the program can provide indirect incentives or coordinate with external parties, specific mechanisms are proposed. Where it cannot, the finding informs consumer expectations rather than producer requirements.

---

## Process Summary

| Step                                | Output                                                        |
| ----------------------------------- | ------------------------------------------------------------- |
| 1. Identify consumer tasks          | Role inventory, canonical task list, purpose statements       |
| 2. Identify required data elements  | Data requirements per task, stated as underlying phenomena    |
| 3. Select IQ dimensions per element | Dimension assignments per element (Wang/Strong and Wand/Wang) |
| 4. Operationalize metrics           | Metric specifications per dimension–element pair              |
| 5. Measure and analyze root causes  | Corpus measurements with root cause classification            |
| 6. Specify interventions            | Intervention specifications by root cause category            |

Steps 2 and 3 are developed together because the data element list and dimension assignments are analytically dependent and cannot be evaluated independently.

---

## Notes

**On the relationship to the conference paper.** Jacobs and Gamblin (2026) used a six-task-family taxonomy and assigned IQ dimensions at the task level. The DQAF uses a 45-task canonical list and assigns dimensions at the data element level. The paper established the theoretical foundations; the DQAF expands the task scope and increases analytical precision. The two are compatible but not identical.
