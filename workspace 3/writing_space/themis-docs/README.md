# Themis Documentation

## AI Outcome Routing and Settlement Platform

**Version:** MVP 1.0
**Last Updated:** July 21, 2026
**Status:** Pre-Product / Documentation for Development

---

## Documentation Suite

This documentation suite covers the complete Themis platform for CFOs, engineering teams, and AI vendors.

### Quick Start

| If you are... | Start with... | Then read... |
|--------------|---------------|--------------|
| **CFO / Procurement** | [01 - Product Overview](#) → [02 - CFO Dashboard Guide](#) | [03 - Pricing Mathematics](#) |
| **Engineer / Integrator** | [01 - Product Overview](#) → [05 - API Reference](#) | [06 - Zendesk Integration](#) or [07 - Vendor Integration](#) |
| **Data Scientist** | [03 - Pricing Mathematics](#) → [09 - UPX Specification](#) | [08 - System Architecture](#) |
| **AI Vendor** | [01 - Product Overview](#) → [07 - Vendor Integration](#) | [05 - API Reference](#) |

---

## Document Index

### [01 - Product Overview](./01-overview.md)
What Themis is, key concepts (UPX, Dike, outcome-based pricing), and who should use it.

### [02 - CFO Dashboard Guide](./02-cfo-dashboard.md)
Complete walkthrough of the CFO dashboard: spend overview, contract management, requesting quotes, reading verification rates.

### [03 - Pricing & Routing Mathematics](./03-pricing-mathematics.md)
Deep dive into Themis pricing formulas, routing algorithms, convex optimization, and real calculation examples.

### [04 - Dike Verification Protocol](./04-dike-protocol.md)
How Dike verifies outcomes, integration with enterprise systems, 72-hour SLA mechanics, and security model.

### [05 - API Reference](./05-api-reference.md)
Complete API specification: authentication, endpoints, request/response schemas, error handling.

### [06 - Integration Guide — Zendesk](./06-integration-zendesk.md)
Step-by-step guide for integrating Themis with Zendesk for support ticket verification.

### [07 - Integration Guide — AI Vendors](./07-integration-vendors.md)
Guide for AI vendors (Sierra, Intercom, custom agents) to submit outcomes for verification.

### [08 - System Architecture](./08-architecture.md)
Technical architecture: React dashboard, FastAPI engine, PostgreSQL/TimescaleDB, Dike service, Ornn feed.

### [09 - UPX Contract Specification](./09-upx-spec.md)
UPX ticker format, contract parameters, outcome type definitions, and extension guide.

### [10 - Glossary & FAQ](./10-glossary-faq.md)
Terminology definitions, common questions, troubleshooting, and support.

---

## Key Concepts at a Glance

### Themis
The routing and settlement layer for AI outcomes. Themis prices UPX contracts upfront, routes execution to optimal vendors, and settles payment based on verified outcomes.

### Dike
The independent verification protocol. Dike checks enterprise systems of record (Zendesk, Salesforce, etc.) to verify that claimed outcomes actually occurred.

### UPX (Universal Product Exchange)
Standardized outcome contracts. A UPX ticker like `UPX-CX-RES-US-L2` represents "US Level-2 Customer Support Resolution."

### Ornn
Real-time compute price feed. Themis uses Ornn's spot prices for H100/A100 GPU-hours to calculate base compute costs.

### Outcome-Based Pricing
Pay for verified outcomes, not tokens consumed. If an agent loops, fails, or hallucinates, the vendor absorbs the cost.

---

## Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| CFO Dashboard (React) | 🟡 Planned | Mockups complete, implementation pending |
| Routing Engine (FastAPI) | 🟡 Planned | Core algorithms defined |
| Dike Verification | 🟡 Planned | Protocol spec complete |
| Ornn Price Feed | 🟢 Implemented | API integration tested |
| Zendesk Connector | 🟡 Planned | Design complete |
| UPX Contract System | 🟡 Planned | Specification defined |
| PostgreSQL/TimescaleDB | 🟡 Planned | Schema designed |

**Legend:**
🟢 Implemented
🟡 Planned / In Development
🔴 Not Started

---

## Support

- **Technical Questions:** docs@ontitled.ai
- **Integration Support:** integrations@ontitled.ai
- **Sales:** sales@ontitled.ai

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
