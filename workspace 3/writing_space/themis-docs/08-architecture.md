# 08 - System Architecture

## Themis Technical Architecture

This document describes the technical architecture of the Themis platform.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              THEMIS PLATFORM                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                         PRESENTATION LAYER                               │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │   │
│   │  │  React CFO   │  │  React Ops   │  │   Vendor     │                  │   │
│   │  │  Dashboard   │  │   Console    │  │   Portal     │                  │   │
│   │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                  │   │
│   │         │                 │                 │                          │   │
│   │         └─────────────────┴─────────────────┘                          │   │
│   │                           │                                            │   │
│   └───────────────────────────┼────────────────────────────────────────────┘   │
│                               │                                                │
│   ┌───────────────────────────┼────────────────────────────────────────────┐   │
│   │                      API LAYER (FastAPI)                                │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│   │  │  /quotes     │  │  /contracts  │  │  /outcomes   │  │  /compute  │ │   │
│   │  │  /routing    │  │  /settlement │  │  /verify     │  │  /prices   │ │   │
│   │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │   │
│   │         └─────────────────┴─────────────────┴────────────────┘        │   │
│   │                           │                                           │   │
│   │  ┌────────────────────────┴────────────────────────┐                 │   │
│   │  │        API Gateway (Kong/AWS API Gateway)       │                 │   │
│   │  │  • Rate limiting  • Auth  • Logging  • Caching  │                 │   │
│   │  └─────────────────────────────────────────────────┘                 │   │
│   └──────────────────────────────────────────────────────────────────────┘   │
│                               │                                                │
│   ┌───────────────────────────┼────────────────────────────────────────────┐   │
│   │                      SERVICE LAYER                                      │   │
│   │                                                                         │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │   │
│   │  │   Pricing    │  │   Routing    │  │  Settlement  │                  │   │
│   │  │    Engine    │  │    Engine    │  │    Engine    │                  │   │
│   │  │              │  │              │  │              │                  │   │
│   │  │ • Ornn feed  │  │ • Convex opt │  │ • Payment    │                  │   │
│   │  │ • Quote gen  │  │ • Vendor sel │  │ • Invoicing  │                  │   │
│   │  │ • Risk calc  │  │ • Load bal   │  │ • Escrow     │                  │   │
│   │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                  │   │
│   │         │                 │                 │                          │   │
│   │  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐                  │   │
│   │  │    Dike      │  │   Ornn       │  │   Stripe     │                  │   │
│   │  │ Verification │  │   Client     │  │   Connect    │                  │   │
│   │  │   Service    │  │              │  │              │                  │   │
│   │  │              │  │              │  │              │                  │   │
│   │  │ • Zendesk    │  │ • WebSocket  │  │ • ACH        │                  │   │
│   │  │ • Salesforce │  │ • Polling    │  │ • Wire       │                  │   │
│   │  │ • Proofs     │  │ • Caching    │  │ • Escrow     │                  │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘                  │   │
│   │                                                                         │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                               │                                                │
│   ┌───────────────────────────┼────────────────────────────────────────────┐   │
│   │                      DATA LAYER                                         │   │
│   │                                                                         │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │   │
│   │  │  PostgreSQL  │  │  TimescaleDB │  │    Redis     │                  │   │
│   │  │              │  │              │  │              │                  │   │
│   │  │ • Users      │  │ • Outcomes   │  │ • Sessions   │                  │   │
│   │  │ • Contracts  │  │ • Metrics    │  │ • Caching    │                  │   │
│   │  │ • Vendors    │  │ • Time series│  │ • Queues     │                  │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘                  │   │
│   │                                                                         │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │   │
│   │  │     S3       │  │  Event Bus   │  │   IPFS       │                  │   │
│   │  │   (Logs)     │  │  (Kafka)     │  │  (Proofs)    │                  │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘                  │   │
│   │                                                                         │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. React Dashboard (CFO UI)

**Purpose:** Primary interface for CFOs and procurement teams.

**Tech Stack:**
- React 18 + TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- React Query for API state management

**Key Features:**
- Monthly spend overview
- Active contract management
- Quote generation workflow
- Verification rate analytics
- Real-time outcome feed

**Key Routes:**
```
/dashboard           → CFO Dashboard (main)
/dashboard/contracts → Contract management
/dashboard/quotes    → Quote request flow
/dashboard/analytics → Detailed analytics
```

**Data Flow:**
```
React Dashboard → API Gateway → /dashboard/metrics → PostgreSQL
                                      ↓
                              TimescaleDB (time series)
```

### 2. FastAPI Routing Engine

**Purpose:** Core business logic for pricing, routing, and settlement.

**Tech Stack:**
- Python 3.11
- FastAPI framework
- Pydantic for validation
- SQLAlchemy for ORM
- Celery for background tasks

**Key Modules:**

#### Pricing Engine
```python
# Core pricing calculation
class PricingEngine:
    def calculate_quote(self, ticker, quantity, period):
        base_cost = self.ornn_client.get_compute_cost(ticker)
        multiplier = self.get_retry_multiplier(ticker)
        risk_premium = self.calculate_risk_premium(period)
        themis_fee = self.calculate_themis_fee()

        return UPXQuote(
            base_cost=base_cost,
            multiplier=multiplier,
            risk_premium=risk_premium,
            themis_fee=themis_fee
        )
```

#### Routing Engine
```python
# Convex optimization for vendor selection
class RoutingEngine:
    def optimize_allocation(self, ticker, constraints):
        # CVXPY convex optimization
        problem = self.build_optimization_problem(
            vendors=self.get_qualified_vendors(ticker),
            constraints=constraints
        )
        result = problem.solve()
        return AllocationResult(vendor_shares=result)
```

#### Settlement Engine
```python
# Payment clearing and escrow
class SettlementEngine:
    def settle_outcome(self, outcome_id, verification_result):
        if verification_result == "VERIFIED":
            self.release_payment(outcome_id)
        else:
            self.void_payment(outcome_id)
```

### 3. PostgreSQL + TimescaleDB

**PostgreSQL (Relational Data):**

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `users` | Authentication | id, email, org_id |
| `organizations` | Enterprise accounts | id, name, billing_info |
| `contracts` | UPX contracts | id, ticker, quantity, status |
| `vendors` | AI vendor profiles | id, name, capabilities |
| `quotes` | Price quotes | id, contract_id, price, status |

**TimescaleDB (Time Series):**

| Hypertable | Purpose | Retention |
|------------|---------|-----------|
| `outcomes` | Verification events | 2 years |
| `compute_prices` | Ornn price feed | 1 year |
| `routing_decisions` | Routing allocations | 6 months |
| `verification_polls` | Dike poll results | 1 year |

**Schema Example:**
```sql
-- Outcomes hypertable
CREATE TABLE outcomes (
    time TIMESTAMPTZ NOT NULL,
    outcome_id UUID,
    contract_id UUID,
    vendor_id UUID,
    ticker TEXT,
    status TEXT,  -- pending, verified, failed
    verification_result JSONB
);

SELECT create_hypertable('outcomes', 'time');
```

### 4. Dike Verification Service

**Purpose:** Independent verification of AI outcomes.

**Architecture:**
```
┌─────────────────────────────────────────┐
│        Dike Verification Service         │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │   API Layer  │  │  Scheduler   │    │
│  │  (FastAPI)   │  │  (Celery)    │    │
│  └──────┬───────┘  └──────┬───────┘    │
│         │                 │            │
│         └────────┬────────┘            │
│                  │                     │
│         ┌────────┴────────┐            │
│         │  Verification   │            │
│         │    Engine       │            │
│         │                 │            │
│         │ • State check   │            │
│         │ • Temporal      │            │
│         │ • Cryptographic │            │
│         └────────┬────────┘            │
│                  │                     │
│  ┌───────────────┼───────────────┐    │
│  │               │               │    │
│  ▼               ▼               ▼    │
│ ┌────┐      ┌──────┐      ┌────────┐ │
│ │Zend│      │Salesf│      │ Custom │ │
│ │esk │      │orce  │      │   DB   │ │
│ └────┘      └──────┘      └────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

**Key Components:**

| Component | Technology | Purpose |
|-----------|------------|---------|
| **API Layer** | FastAPI | Receive claims, return proofs |
| **Scheduler** | Celery + Redis | 72-hour SLA window management |
| **State Checker** | Python | Poll enterprise systems |
| **Proof Generator** | Python + cryptography | Create cryptographic proofs |

**Verification Flow:**
```python
class VerificationEngine:
    def verify_outcome(self, claim):
        # Step 1: Initial state capture
        initial_state = self.capture_state(claim.ticket_id)

        # Step 2: Schedule temporal verification
        self.schedule_verification(
            claim_id=claim.id,
            deadline=claim.claimed_at + timedelta(hours=72)
        )

        # Step 3: Final verification after SLA
        final_state = self.capture_state(claim.ticket_id)

        # Step 4: Decision
        result = self.evaluate(initial_state, final_state)

        # Step 5: Generate proof
        proof = self.generate_proof(claim, result)

        return VerificationResult(result=result, proof=proof)
```

### 5. Ornn Price Feed Client

**Purpose:** Real-time compute pricing from Ornn Compute Index.

**Integration:**
```
Ornn API → WebSocket/Polling → Themis Cache → Pricing Engine
```

**Caching Strategy:**
- **L1 Cache:** In-memory (Redis) — 60 seconds
- **L2 Cache:** Database (TimescaleDB) — 1 hour
- **Fallback:** Last known price

**Client Implementation:**
```python
class OrnnClient:
    def __init__(self):
        self.ws_client = WebSocketClient(ORNN_WS_URL)
        self.cache = RedisCache()

    async def get_price(self, gpu_type, region):
        # Try cache first
        cached = self.cache.get(f"ornn:{gpu_type}:{region}")
        if cached and not self.is_stale(cached):
            return cached

        # Fetch from API
        price = await self.fetch_price(gpu_type, region)
        self.cache.set(f"ornn:{gpu_type}:{region}", price, ttl=60)

        return price

    async def subscribe_feed(self):
        async for message in self.ws_client:
            if message['type'] == 'price_update':
                self.cache.set(
                    f"ornn:{message['gpu_type']}:{message['region']}",
                    message['price'],
                    ttl=60
                )
```

---

## Data Flow Diagrams

### Quote Generation Flow

```
User Request
     │
     ▼
┌─────────┐    ┌──────────┐    ┌──────────┐
│  API    │───>│ Pricing  │───>│   Ornn   │
│ Gateway │    │  Engine  │    │  Client  │
└─────────┘    └──────────┘    └──────────┘
                                    │
                                    ▼
                              ┌──────────┐
                              │  Cache   │
                              │  Check   │
                              └──────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
            ┌──────────┐                    ┌──────────┐
            │  Return  │                    │  Fetch   │
            │  Cached  │                    │  from    │
            │  Price   │                    │  API     │
            └──────────┘                    └──────────┘
                                                    │
     ┌──────────────────────────────────────────────┘
     ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Calculate│───>│  Store   │───>│  Return  │
│  Quote   │    │  Quote   │    │  to User │
└──────────┘    └──────────┘    └──────────┘
```

### Outcome Verification Flow

```
Vendor submits
   outcome
      │
      ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Store   │───>│ Schedule │───>│   Dike   │
│ Outcome  │    │   72h    │    │  Polls   │
└──────────┘    │  Timer   │    └──────────┘
                └──────────┘         │
                                     ▼
                              ┌──────────┐
                              │  Poll    │
                              │ Zendesk  │
                              │ (every   │
                              │  4hrs)   │
                              └──────────┘
                                     │
                                     ▼
                              ┌──────────┐
                              │  72h     │
                              │ elapsed? │
                              └──────────┘
                               Yes / No
                               /        \
                              ▼          ▼
                        ┌────────┐   ┌────────┐
                        │ Final  │   │ Continue│
                        │ Check  │   │ Polling │
                        └────────┘   └────────┘
                            │
                            ▼
                     ┌────────────┐
                     │  Generate  │
                     │   Proof    │
                     └────────────┘
                            │
                            ▼
                     ┌────────────┐
                     │   Submit   │
                     │  to Themis │
                     │ Settlement │
                     └────────────┘
                            │
                            ▼
                     ┌────────────┐
                     │   Clear    │
                     │  Payment   │
                     └────────────┘
```

---

## Deployment Architecture

### Infrastructure Stack

| Layer | Technology | Provider |
|-------|------------|----------|
| **CDN** | CloudFront | AWS |
| **Load Balancer** | ALB | AWS |
| **API Gateway** | Kong | Self-hosted |
| **Compute** | EKS (Kubernetes) | AWS |
| **Database** | RDS PostgreSQL + TimescaleDB | AWS |
| **Cache** | ElastiCache (Redis) | AWS |
| **Queue** | Amazon MQ (RabbitMQ) | AWS |
| **Storage** | S3 | AWS |
| **Monitoring** | Datadog | SaaS |

### Kubernetes Deployment

```yaml
# Simplified deployment structure
apiVersion: apps/v1
kind: Deployment
metadata:
  name: themis-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: themis-api
  template:
    spec:
      containers:
      - name: api
        image: ontitled/themis-api:v1.0.0
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: themis-secrets
              key: database-url
        - name: ORNN_API_KEY
          valueFrom:
            secretKeyRef:
              name: themis-secrets
              key: ornn-api-key
```

### Service Mesh

**Istio Configuration:**
- mTLS between services
- Circuit breakers for external APIs
- Distributed tracing (Jaeger)
- Rate limiting at service level

---

## Security Architecture

### Authentication Flow

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  User   │────>│   Auth0  │────>│  Themis  │────>│  Access  │
│         │     │  (OAuth) │     │  Verify  │     │  Granted │
└─────────┘     └──────────┘     └──────────┘     └──────────┘
```

### Data Encryption

| Layer | Method | Key Management |
|-------|--------|----------------|
| **In Transit** | TLS 1.3 | Let's Encrypt |
| **At Rest (DB)** | AES-256 | AWS KMS |
| **At Rest (Files)** | AES-256-GCM | AWS KMS |
| **Secrets** | - | AWS Secrets Manager |

### Network Security

- **VPC:** Isolated network per environment
- **Subnets:** Public (ALB), Private (EKS), Database (isolated)
- **Security Groups:** Least privilege access
- **WAF:** AWS WAF for DDoS protection

---

## Scaling Considerations

### Horizontal Scaling

| Service | Min Replicas | Max Replicas | Trigger |
|---------|--------------|--------------|---------|
| API | 3 | 20 | CPU > 70% |
| Dike | 2 | 10 | Queue depth > 1000 |
| Dashboard | 2 | 5 | CPU > 60% |

### Database Scaling

**Read Replicas:**
- 2 replicas for API reads
- 1 replica for analytics

**Partitioning:**
- Outcomes table: Partitioned by month
- Automatic archival to S3 after 1 year

### Caching Strategy

| Data | Cache | TTL | Hit Rate Target |
|------|-------|-----|-----------------|
| Ornn prices | Redis | 60s | 95% |
| Vendor scores | Redis | 5min | 90% |
| User sessions | Redis | 24h | 99% |
| Quotes | Redis | 24h | 80% |

---

## Monitoring and Observability

### Metrics

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| API latency | Datadog | P99 > 500ms |
| Error rate | Datadog | > 1% |
| Verification time | Datadog | > 73 hours |
| Database connections | Datadog | > 80% |
| Compute price staleness | Datadog | > 5 minutes |

### Logging

**Structured JSON logs:**
```json
{
  "timestamp": "2026-07-24T14:32:00Z",
  "level": "INFO",
  "service": "themis-api",
  "trace_id": "trace_abc123",
  "message": "Quote generated",
  "quote_id": "quo_9c8d7e6f5a4b",
  "duration_ms": 45
}
```

**Log aggregation:** Datadog Logs

### Tracing

**Distributed tracing with OpenTelemetry:**
```
User Request (trace: abc123)
  → API Gateway (span: gateway)
    → Pricing Engine (span: pricing)
      → Ornn Client (span: ornn)
    → Routing Engine (span: routing)
  → Database (span: postgres)
```

---

## Disaster Recovery

### Backup Strategy

| Data | Frequency | Retention | Location |
|------|-----------|-----------|----------|
| PostgreSQL | Daily | 30 days | S3 |
| TimescaleDB | Continuous | 90 days | S3 |
| Redis | Hourly | 7 days | ElastiCache |
| Config | On change | Forever | Git + S3 |

### RPO/RTO

| Metric | Target |
|--------|--------|
| **RPO (Recovery Point Objective)** | 1 hour |
| **RTO (Recovery Time Objective)** | 4 hours |

### Failover

**Database:**
- Multi-AZ deployment
- Automatic failover (60 seconds)

**Application:**
- Health checks every 10 seconds
- Unhealthy pods replaced within 30 seconds

---

## Next Steps

- **UPX specification:** Read [09 - UPX Contract Specification](./09-upx-spec.md)
- **Glossary:** Read [10 - Glossary & FAQ](./10-glossary-faq.md)
- **API details:** Read [05 - API Reference](./05-api-reference.md)

---

*Themis: Price the outcome. Verify the work. Settle the contract.*
