import React, { useState } from 'react';

const Section = ({ title, children, highlight }) => (
  <div style={{
    background: highlight ? 'linear-gradient(145deg, #0D1E30, #091628)' : 'linear-gradient(145deg, #111C2E, #0D1526)',
    border: `1px solid ${highlight ? '#E2007450' : '#1E2D45'}`, borderRadius: 14, padding: 24, marginBottom: 16,
  }}>
    <div style={{ fontSize: 15, fontWeight: 700, color: highlight ? '#E20074' : '#E2E8F0', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
      {title}
    </div>
    {children}
  </div>
);

const AsciiDiagram = ({ content }) => (
  <pre style={{
    fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#94A3B8',
    background: '#060D18', border: '1px solid #1E2D45', borderRadius: 10,
    padding: 20, overflowX: 'auto', lineHeight: 1.6, margin: '12px 0',
  }}>
    {content}
  </pre>
);

const DocumentExport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, Packer } = await import('docx');
      const { saveAs } = await import('file-saver');

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({ text: 'T-Mobile Telecom Intelligence Dashboard', heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
            new Paragraph({ text: 'Technical Architecture & Business Case Document', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
            new Paragraph({ text: 'Prepared by: T-Mobile Business & Strategy Team | Version: 1.0 | June 2026', alignment: AlignmentType.CENTER, spacing: { after: 400 } }),

            new Paragraph({ text: '1. Executive Summary', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: 'This document describes the T-Mobile Telecom Intelligence Dashboard — a real-time business analytics platform designed to provide T-Mobile\'s Business & Strategy team with actionable insights about telecom market share across all 50 US states, customer feedback sentiment, plan competitive analysis, and strategic opportunity identification.', spacing: { after: 200 } }),

            new Paragraph({ text: '2. Business Context & Objectives', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: 'T-Mobile operates in a highly competitive US telecom market with two primary national competitors: Verizon (28.4% wireless share) and AT&T (27.2%), against T-Mobile\'s own 24.1% share. The dashboard addresses these strategic objectives:', spacing: { after: 100 } }),
            ...['• Identify US states where T-Mobile has growth opportunities', '• Track real-time market share changes by provider and geography', '• Monitor customer satisfaction vs. competitors (NPS, sentiment analysis)', '• Compare service plans across all major providers', '• Enable data-driven decision making for the strategy team'].map(t => new Paragraph({ text: t, spacing: { after: 80 } })),

            new Paragraph({ text: '3. System Architecture Overview', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: 'The platform follows a microservices architecture with event-driven communication via Apache Kafka. It comprises 6 backend Spring Boot microservices, a React.js frontend, and SQLite databases per service.', spacing: { after: 200 } }),

            new Paragraph({ text: '4. Microservices Architecture', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: '4.1 API Gateway (Port 8080)', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'Spring Cloud Gateway acts as the single entry point for all client requests. It handles routing, load balancing, rate limiting, CORS, and JWT authentication. All traffic is routed through this service to the downstream microservices.', spacing: { after: 200 } }),
            new Paragraph({ text: '4.2 State Analytics Service (Port 8081)', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'Manages telecom market share data for all 50 US states + DC. Publishes state-data-update events to Kafka topic. Provides REST endpoints for state-by-state breakdown, regional aggregations, and trend data.', spacing: { after: 200 } }),
            new Paragraph({ text: '4.3 Provider Service (Port 8082)', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'Maintains provider master data including coverage metrics, NPS scores, subscriber counts, and competitive intelligence. Consumes provider-update Kafka events for real-time data synchronization.', spacing: { after: 200 } }),
            new Paragraph({ text: '4.4 Feedback Service (Port 8083)', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'Aggregates customer feedback from multiple sources (surveys, app reviews, social media). Performs sentiment analysis (positive/neutral/negative classification). Publishes feedback-aggregated events to Kafka.', spacing: { after: 200 } }),
            new Paragraph({ text: '4.5 Plan Comparison Service (Port 8084)', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'Maintains comprehensive plan catalog for all major providers (wireless + broadband). Provides comparison APIs for feature-by-feature plan analysis. Plans data updated via scheduled jobs and Kafka events.', spacing: { after: 200 } }),
            new Paragraph({ text: '4.6 Event Streaming Service (Port 8085)', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'Acts as a WebSocket bridge between Kafka and the React frontend. Consumes real-time events from Kafka and pushes updates to connected dashboard clients via WebSocket. Enables live data feed and real-time chart updates.', spacing: { after: 200 } }),

            new Paragraph({ text: '5. Technology Stack', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: 'Frontend:', heading: HeadingLevel.HEADING_2 }),
            ...['• React.js 18 — Component-based UI framework', '• Recharts — Data visualization library', '• react-simple-maps — Interactive US map with TopoJSON', '• Material-UI v5 — Design system components', '• React Router v6 — Client-side navigation', '• WebSocket client — Real-time data streaming'].map(t => new Paragraph({ text: t, spacing: { after: 60 } })),
            new Paragraph({ text: 'Backend:', heading: HeadingLevel.HEADING_2 }),
            ...['• Spring Boot 3.2 — Microservice framework (Java 17)', '• Spring Cloud Gateway — API gateway and routing', '• Apache Kafka 3.6 — Event streaming platform', '• Spring Kafka — Kafka producer/consumer integration', '• SQLite via JPA/Hibernate — Embedded database per service', '• Spring WebSocket — Real-time push to frontend', '• Spring Security — JWT authentication', '• Lombok — Boilerplate reduction', '• Springdoc OpenAPI 3 — API documentation'].map(t => new Paragraph({ text: t, spacing: { after: 60 } })),
            new Paragraph({ text: 'Infrastructure:', heading: HeadingLevel.HEADING_2 }),
            ...['• Docker + Docker Compose — Containerized deployment', '• Zookeeper — Kafka cluster coordination', '• NGINX — Static asset serving + reverse proxy'].map(t => new Paragraph({ text: t, spacing: { after: 60 } })),

            new Paragraph({ text: '6. Event-Driven Architecture (Kafka)', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: 'The platform uses Apache Kafka for async event-driven communication between microservices. Key Kafka topics:', spacing: { after: 100 } }),
            ...['• tmo.state.data.updates — State market share change events (produced by State Analytics Service)', '• tmo.provider.updates — Provider metrics updates (produced by Provider Service)', '• tmo.feedback.aggregated — Aggregated sentiment events (produced by Feedback Service)', '• tmo.plan.updates — Plan catalog change events (produced by Plan Comparison Service)', '• tmo.realtime.feed — Live subscriber activity events (consumed by Event Streaming Service → WebSocket)'].map(t => new Paragraph({ text: t, spacing: { after: 80 } })),

            new Paragraph({ text: '7. Database Design (SQLite)', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: 'Each microservice uses its own embedded SQLite database (database-per-service pattern), ensuring loose coupling. Key tables:', spacing: { after: 100 } }),
            ...['• state_analytics.db: states, state_provider_share, state_trends', '• provider.db: providers, provider_metrics, coverage_data', '• feedback.db: feedback_entries, sentiment_scores, nps_records', '• plan_comparison.db: plans, plan_features, plan_pricing', '• events.db: event_log, websocket_sessions'].map(t => new Paragraph({ text: t, spacing: { after: 80 } })),

            new Paragraph({ text: '8. Dashboard Features', heading: HeadingLevel.HEADING_1 }),
            ...['1. Overview Dashboard — 8 real-time KPI cards, revenue trend, market share pie chart, regional breakdown, live activity feed', '2. USA State Map — Interactive choropleth map with 3 view modes (Leader, T-Mobile Share, Opportunity), click-to-drill-down, state detail panel with full provider breakdown', '3. Provider Analytics — State-by-state bar/line charts, top/bottom T-Mobile states, competitive radar chart, national average summary', '4. Customer Feedback — Top 5 provider rankings with sentiment analysis, NPS comparison, 12-month satisfaction trends, T-Mobile strategic opportunities with revenue impact', '5. Plan Comparison — Wireless + broadband plan cards, sortable comparison table, price chart, T-Mobile vs competitor analysis'].map(t => new Paragraph({ text: t, spacing: { after: 100 } })),

            new Paragraph({ text: '9. Business Cases & Strategic Value', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: '9.1 Market Opportunity Identification', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'T-Mobile currently leads in 10 of 51 states. The dashboard identifies 14 high-opportunity states (Southeast, South, and parts of the Mid-Atlantic) where T-Mobile\'s market share is below 19%. Winning 5% more share in these states represents $9.8B+ annual revenue opportunity.', spacing: { after: 200 } }),
            new Paragraph({ text: '9.2 Customer Experience Improvement', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'T-Mobile already leads the market on NPS (22) ahead of Verizon (18) and AT&T (12). The feedback analysis identifies 3 remaining priority areas to widen that lead: Coverage & Reliability in rural markets (+$1.6B impact), Customer Service (+$1.1B), App Experience (+$0.6B). Total potential: $3.3B annual revenue.', spacing: { after: 200 } }),
            new Paragraph({ text: '9.3 Plan Competitiveness', heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: 'T-Mobile\'s wireless plans are already priced $5-15/mo below AT&T equivalents at comparable tiers, and T-Mobile leads on customer-reported value for money. Growing T-Mobile Home Internet penetration in AT&T Fiber-heavy metros represents a complementary $2M+ subscriber opportunity over 18 months.', spacing: { after: 200 } }),

            new Paragraph({ text: '10. Deployment Architecture', heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: 'The application is fully containerized with Docker Compose for local development and can be deployed on any cloud provider (AWS, GCP, Azure) or on-premise Linux server. The React frontend is an OS-independent web application accessible from any modern browser on any platform.', spacing: { after: 200 } }),
            new Paragraph({ text: 'Running the Application:', heading: HeadingLevel.HEADING_2 }),
            ...['1. Prerequisites: Docker Desktop, Node.js 18+, Java 17+', '2. Start backend: cd backend && docker-compose up -d', '3. Start frontend: cd frontend && npm install && npm start', '4. Access dashboard: http://localhost:3000', '5. API documentation: http://localhost:8080/swagger-ui.html', '6. Kafka UI (optional): http://localhost:9090'].map(t => new Paragraph({ text: t, spacing: { after: 80 } })),

            new Paragraph({ text: '11. Security Considerations', heading: HeadingLevel.HEADING_1 }),
            ...['• JWT-based authentication via Spring Security on all API endpoints', '• HTTPS enforced in production via NGINX SSL termination', '• Kafka SASL/TLS encryption for message security', '• Input validation and SQL injection prevention via JPA parameterized queries', '• CORS policies configured at API Gateway', '• Role-based access control (RBAC): Admin, Analyst, Viewer roles'].map(t => new Paragraph({ text: t, spacing: { after: 80 } })),

            new Paragraph({ text: '12. Future Roadmap', heading: HeadingLevel.HEADING_1 }),
            ...['• Phase 2: ML-based churn prediction using subscriber behavior data', '• Phase 3: Real-time social media sentiment integration (Twitter/X, Reddit)', '• Phase 4: AI-powered pricing recommendation engine', '• Phase 5: Mobile app version (React Native)', '• Phase 6: Integration with T-Mobile internal CRM and BI systems'].map(t => new Paragraph({ text: t, spacing: { after: 80 } })),

            new Paragraph({ text: 'Document End — T-Mobile Telecom Intelligence Dashboard v1.0', alignment: AlignmentType.CENTER, spacing: { before: 400 } }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'TMobile_Telecom_Intelligence_Dashboard_Architecture.docx');
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    } catch (err) {
      console.error('Document generation failed:', err);
      alert('Document generation failed. Please ensure npm dependencies are installed.');
    }
    setIsGenerating(false);
  };

  const ARCH_DIAGRAM = `
┌─────────────────────────────────────────────────────────────────────────────┐
│                  T-MOBILE TELECOM INTELLIGENCE DASHBOARD                     │
│                         Technical Architecture                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  FRONTEND (React.js)                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Dashboard │ USA Map │ Analytics │ Feedback │Plans│   │
│  └──────────────────────────────────────────────────┘   │
│  Recharts │ react-simple-maps │ Material-UI │ WebSocket  │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP REST + WebSocket
                          ▼
┌─────────────────────────────────────────────────────────┐
│            API GATEWAY (Spring Cloud Gateway :8080)      │
│    Routing │ Load Balance │ Rate Limit │ JWT Auth │ CORS │
└──────┬──────────┬──────────┬──────────┬──────────┬──────┘
       │          │          │          │          │
       ▼          ▼          ▼          ▼          ▼
  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
  │ State  │ │Provider│ │Feedback│ │  Plan  │ │  Event   │
  │Analytics│ │Service │ │Service │ │Compare │ │Streaming │
  │ :8081  │ │ :8082  │ │ :8083  │ │ :8084  │ │  :8085   │
  └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └────┬─────┘
      │          │          │          │            │
      └──────────┴──────────┴──────────┘            │
                           │                        │
                           ▼                        │
              ┌────────────────────────┐            │
              │   Apache Kafka :9092   │◄───────────┘
              │  ┌──────────────────┐  │
              │  │ Topics:          │  │
              │  │ tmo.state.updates│  │
              │  │ tmo.provider.data│  │
              │  │ tmo.feedback.agg │  │
              │  │ tmo.plan.updates │  │
              │  │ tmo.realtime.feed│  │
              │  └──────────────────┘  │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  SQLite Databases      │
              │  (per-service pattern) │
              │  state_analytics.db    │
              │  provider.db           │
              │  feedback.db           │
              │  plan_comparison.db    │
              │  events.db             │
              └────────────────────────┘

  WebSocket Flow:
  Kafka → Event Streaming Service → WebSocket → React Frontend
  (Real-time updates: market share, subscriber events, alerts)
`;

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1100 }}>
      {/* Download button */}
      <div style={{
        background: 'linear-gradient(145deg, #0D1E30, #091628)',
        border: '1px solid #E2007450', borderRadius: 16, padding: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>
            📄 Technical Architecture Document
          </div>
          <div style={{ fontSize: 13, color: '#64748B' }}>
            Complete end-to-end technical spec with business cases, microservices architecture, event flows, and deployment guide
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          style={{
            padding: '12px 28px', borderRadius: 12, cursor: isGenerating ? 'not-allowed' : 'pointer',
            background: downloaded ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #E20074, #9B004E)',
            border: 'none', color: '#fff', fontSize: 14, fontWeight: 700,
            boxShadow: '0 4px 20px rgba(226,0,116,0.3)', opacity: isGenerating ? 0.7 : 1,
            transition: 'all 0.2s', minWidth: 200,
          }}
        >
          {isGenerating ? '⏳ Generating...' : downloaded ? '✅ Downloaded!' : '⬇ Download .docx'}
        </button>
      </div>

      {/* Architecture Diagram */}
      <Section title="🏗 System Architecture Diagram (Technical)" highlight>
        <AsciiDiagram content={ARCH_DIAGRAM} />
      </Section>

      {/* Business Summary */}
      <Section title="📊 Business Case Summary">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#E20074', marginBottom: 10 }}>Strategic Opportunities</div>
            {[
              { label: 'Market opportunity (14 growth states)', value: '$9.8B+', color: '#10B981' },
              { label: 'Customer experience improvement', value: '$3.3B+', color: '#F59E0B' },
              { label: 'Home Internet cross-sell expansion', value: '$1.2B+', color: '#E20074' },
              { label: 'Total addressable opportunity', value: '$14.3B+', color: '#E20074' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E2D45' }}>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#E20074', marginBottom: 10 }}>Key Dashboard Metrics</div>
            {[
              { label: 'States with T-Mobile leadership', value: '10/51' },
              { label: 'High opportunity states', value: '14 states' },
              { label: 'T-Mobile NPS lead vs AT&T', value: '+10 pts' },
              { label: 'Home Internet subscriber growth', value: '+18.0% QoQ' },
              { label: 'Data refresh rate', value: 'Real-time (3s)' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E2D45' }}>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>{item.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Microservices */}
      <Section title="⚙️ Microservices Architecture">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { name: 'API Gateway', port: 8080, tech: 'Spring Cloud Gateway', purpose: 'Single entry, routing, auth, rate limiting', color: '#F59E0B' },
            { name: 'State Analytics', port: 8081, tech: 'Spring Boot + JPA', purpose: 'Market share per state, regional trends', color: '#E20074' },
            { name: 'Provider Service', port: 8082, tech: 'Spring Boot + JPA', purpose: 'Provider master data, coverage metrics', color: '#10B981' },
            { name: 'Feedback Service', port: 8083, tech: 'Spring Boot + NLP', purpose: 'Sentiment analysis, NPS, review aggregation', color: '#E20074' },
            { name: 'Plan Comparison', port: 8084, tech: 'Spring Boot + JPA', purpose: 'Plan catalog, feature comparison APIs', color: '#8B5CF6' },
            { name: 'Event Streaming', port: 8085, tech: 'Spring Boot + Kafka', purpose: 'Kafka → WebSocket bridge, real-time push', color: '#CD040B' },
          ].map(svc => (
            <div key={svc.name} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${svc.color}25`, borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: svc.color }}>{svc.name}</div>
                <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', background: '#060D18', padding: '1px 6px', borderRadius: 4 }}>:{svc.port}</div>
              </div>
              <div style={{ fontSize: 10, color: '#64748B', marginBottom: 6 }}>{svc.tech}</div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{svc.purpose}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Kafka Topics */}
      <Section title="📨 Kafka Event Topics">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { topic: 'tmo.state.data.updates', producer: 'State Analytics', consumer: 'Event Streaming', desc: 'State market share changed events' },
            { topic: 'tmo.provider.updates', producer: 'Provider Service', consumer: 'State Analytics, Event Streaming', desc: 'Provider KPI metric updates' },
            { topic: 'tmo.feedback.aggregated', producer: 'Feedback Service', consumer: 'Event Streaming', desc: 'Aggregated sentiment score events' },
            { topic: 'tmo.plan.updates', producer: 'Plan Comparison', consumer: 'Event Streaming', desc: 'Plan price/feature change events' },
            { topic: 'tmo.realtime.feed', producer: 'Event Streaming', consumer: 'WebSocket → Frontend', desc: 'Live subscriber activity events' },
          ].map(t => (
            <div key={t.topic} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 2fr', gap: 12, padding: '10px 14px', background: '#060D18', borderRadius: 8, alignItems: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#E20074' }}>{t.topic}</span>
              <span style={{ fontSize: 11, color: '#10B981' }}>⬆ {t.producer}</span>
              <span style={{ fontSize: 11, color: '#F59E0B' }}>⬇ {t.consumer}</span>
              <span style={{ fontSize: 11, color: '#64748B' }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Run Instructions */}
      <Section title="🚀 How to Run">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#E20074', marginBottom: 10 }}>Backend (Docker Compose)</div>
            <AsciiDiagram content={`cd ATT_DASHBOARD/backend
docker-compose up -d

# Services started:
# Zookeeper     :2181
# Kafka         :9092
# API Gateway   :8080
# State Svc     :8081
# Provider Svc  :8082
# Feedback Svc  :8083
# Plan Svc      :8084
# Event Svc     :8085`} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#E20074', marginBottom: 10 }}>Frontend (React Dev Server)</div>
            <AsciiDiagram content={`cd ATT_DASHBOARD/frontend
npm install
npm start

# Dashboard: http://localhost:3000
# API Docs:  http://localhost:8080/swagger-ui.html

# For production build:
npm run build
# Serve with NGINX or any static server`} />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DocumentExport;
