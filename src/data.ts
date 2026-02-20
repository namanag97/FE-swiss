
import { Network, Clock, AlertTriangle, Sparkles, LayoutTemplate, Briefcase, BarChart, Truck, Box, Shield, Cpu, Users, Globe } from 'lucide-react';

export const QUESTIONS = [
    {
        id: 'discovery',
        question: "What does your process look like?",
        techLabel: "PROTOCOL: REALITY_MAPPING",
        description: "Get a comprehensive overview of your process.",
        icon: Network,
        stats: "100% VISIBILITY"
    },
    {
        id: 'bottleneck',
        question: "How long does your process take?",
        techLabel: "PROTOCOL: TEMPORAL_ANALYSIS",
        description: "Explore how inefficiencies in different parts of your process affect your overall throughput time.",
        icon: Clock,
        stats: "35 DAYS (TOTAL)",
        highlight: true
    },
    {
        id: 'deadline',
        question: "Are you meeting your deadlines?",
        techLabel: "PROTOCOL: SLA_MONITOR",
        description: "Meeting deadlines is key to maintaining great relationships with both your customers and suppliers.",
        icon: Clock,
        stats: "SLA CHECK"
    },
    {
        id: 'rework',
        question: "How many unwanted activities are in your process?",
        techLabel: "PROTOCOL: REWORK_ANALYSIS",
        description: "Find out how these unwanted activities affect your throughput time and just how many of your cases are affected.",
        icon: AlertTriangle,
        stats: "WASTE DETECTION"
    },
    {
        id: 'automation',
        question: "How automated is your process?",
        techLabel: "PROTOCOL: AUTOMATION_SCOUT",
        description: "Discover how automated your process is and the time savings you could make by realizing your optimization potential.",
        icon: Sparkles,
        stats: "ROI CALCULATOR"
    }
];

export const REF_MODELS = [
    { 
        id: 'P2P', label: 'Procure-to-Pay', category: 'FINANCE', icon: Briefcase, 
        desc: 'Purchasing lifecycle from requisition to payment.',
        context: "The Procure-to-Pay (P2P) process covers the complete cycle from the initial request for goods or services to the final payment. This protocol monitors compliance with purchasing policies, detects Maverick Buying (purchases without PO), and analyzes cycle times for approval workflows.",
        kpis: ['Maverick Buying Rate', 'PO Cycle Time', 'Touchless Invoice Rate', 'Late Payment Ratio'],
        schema: [
            { key: 'CASE_ID', type: 'Purchase Order ID' },
            { key: 'ACTIVITY', type: 'Status Change / Step' },
            { key: 'TIMESTAMP', type: 'Event Time' },
            { key: 'VENDOR', type: 'Attribute (String)' },
            { key: 'AMOUNT', type: 'Attribute (Numeric)' }
        ]
    },
    { 
        id: 'O2C', label: 'Order-to-Cash', category: 'FINANCE', icon: Clock, 
        desc: 'Order fulfillment from sales to cash collection.',
        context: "Order-to-Cash (O2C) tracks the sales process from order receipt to customer payment. This protocol focuses on delivery efficiency, blocking issues, and cash flow velocity (DSO).",
        kpis: ['On-Time Delivery', 'Days Sales Outstanding', 'Return Rate', 'Automation Rate'],
        schema: [
            { key: 'CASE_ID', type: 'Sales Order ID' },
            { key: 'ACTIVITY', type: 'Fulfillment Step' },
            { key: 'TIMESTAMP', type: 'Event Time' },
            { key: 'CUSTOMER', type: 'Attribute (String)' }
        ]
    },
    { 
        id: 'R2R', label: 'Record-to-Report', category: 'FINANCE', icon: BarChart,
        desc: 'General ledger and financial closing process.',
        context: "Validates Journal Entry timings and reconciliation steps.",
        kpis: ['Closing Cycle Time', 'Journal Entry Error Rate'],
        schema: [{ key: 'CASE_ID', type: 'Journal ID' }, { key: 'ACTIVITY', type: 'Posting Step' }]
    },
    { 
        id: 'LOG', label: 'Logistics & Dist.', category: 'SUPPLY CHAIN', icon: Truck,
        desc: 'Warehouse movements and shipment tracking.',
        context: "Tracks 'Shipment ID' and delivery SLAs.",
        kpis: ['On-Time In Full', 'Transit Time'],
        schema: [{ key: 'CASE_ID', type: 'Shipment ID' }, { key: 'ACTIVITY', type: 'Scan Event' }]
    },
    { 
        id: 'INV', label: 'Inventory Mgmt', category: 'SUPPLY CHAIN', icon: Box,
        desc: 'Stock movements and material handling.',
        context: "Optimizes stock levels and movement efficiency.",
        kpis: ['Stock Turn', 'Stockout Rate'],
        schema: [{ key: 'CASE_ID', type: 'Material Doc' }, { key: 'ACTIVITY', type: 'Movement Type' }]
    },
    { 
        id: 'ITSM', label: 'Incident Mgmt', category: 'IT & OPS', icon: Shield, 
        desc: 'ITIL service desk ticketing and resolution.',
        context: "Analyzes the lifecycle of IT support tickets. Focuses on SLA breaches, reassignment counts (ping-pong effect), and resolution efficiency.",
        kpis: ['SLA Breach Rate', 'Mean Time to Resolve', 'First Call Resolution', 'Reassignment Count'],
        schema: [
            { key: 'CASE_ID', type: 'Ticket ID' },
            { key: 'ACTIVITY', type: 'State Change' },
            { key: 'TIMESTAMP', type: 'Update Time' },
            { key: 'PRIORITY', type: 'Attribute (Level)' }
        ]
    },
    { 
        id: 'DEV', label: 'DevOps Pipeline', category: 'IT & OPS', icon: Cpu,
        desc: 'Code commit to deployment lifecycle.',
        context: "Maps CI/CD pipeline efficiency and failure rates.",
        kpis: ['Lead Time for Changes', 'Deployment Failure Rate'],
        schema: [{ key: 'CASE_ID', type: 'Commit SHA' }, { key: 'ACTIVITY', type: 'Pipeline Stage' }]
    },
    { 
        id: 'HR_ON', label: 'Hire-to-Retire', category: 'HR', icon: Users,
        desc: 'Employee lifecycle management.',
        context: "Tracks employee onboarding duration and step completion.",
        kpis: ['Time to Productivity', 'Onboarding Completion'],
        schema: [{ key: 'CASE_ID', type: 'Employee ID' }, { key: 'ACTIVITY', type: 'HR Action' }]
    },
    { 
        id: 'CRM', label: 'Lead-to-Quote', category: 'SALES', icon: Globe,
        desc: 'Sales pipeline and opportunity management.',
        context: "Visualizes sales funnel velocity and conversion rates.",
        kpis: ['Conversion Rate', 'Sales Cycle Length'],
        schema: [{ key: 'CASE_ID', type: 'Opportunity ID' }, { key: 'ACTIVITY', type: 'Stage Change' }]
    },
    { 
        id: 'CUSTOM', label: 'Universal / Custom', category: 'GENERAL', icon: LayoutTemplate, 
        desc: 'Agnostic event log for unspecified processes.', 
        context: "Generic mining configuration. No pre-loaded KPIs. Ideal for ad-hoc analysis of non-standard logs.",
        kpis: ['Event Count', 'Trace Variants'], 
        schema: [{ key: 'CASE_ID', type: 'String' }, { key: 'ACTIVITY', type: 'String' }] 
    }
];

export const CATEGORIES = ['ALL', ...Array.from(new Set(REF_MODELS.map(m => m.category)))];
