import type { ServicePageContent } from "./types";

export const networking: ServicePageContent = {
  slug: "networking",
  title: "Networking",
  eyebrow: "Connectivity",
  tagline:
    "Secure, reliable cloud networking that efficiently connects your sites, applications, and clouds",
  summary:
    "We design and implement cloud and hybrid networks that help you connect sites, systems, and applications while isolating sensitive services and controlling data traffic. We build the network to be scalable, observable, and easy to operate.",
  iconKey: "networking",
  category: "platforms",
  approachTitle: "Analyze traffic → Design the network → Implement connectivity → Test failover",
  approachLead:
    "We draw critical paths first, encode them consistently, and leave failover ownership with your team.",
  metrics: [
    { label: "Typical engagement", value: "5–12 weeks" },
    { label: "Patterns", value: "Hub-spoke & hybrid" },
    { label: "Default posture", value: "Private + least privilege" },
    { label: "Visibility", value: "Flow logs & monitors" },
  ],
  highlights: [
    {
      title: "Hub-and-Spoke design",
      body: "We build a centralized network model that simplifies managing connectivity, security, and the addition of new environments.",
    },
    {
      title: "Hybrid Connectivity",
      body: "We implement VPN, Direct Connect, and ExpressRoute according to your environment's requirements, with clear routing and failover design.",
    },
    {
      title: "Private Connectivity",
      body: "We use private endpoints and private connections to reduce reliance on the public internet.",
    },
    {
      title: "Network Segmentation",
      body: "We separate environments and services according to security and application requirements, applying appropriate security groups and firewall policies.",
    },
    {
      title: "DNS Architecture",
      body: "We design internal and hybrid DNS to ensure stable access as environments and sites grow.",
    },
    {
      title: "Network Monitoring",
      body: "We provide flow logs, monitoring, and alerts that help teams detect and analyze connectivity issues quickly.",
    },
  ],
  problems: [
    {
      title: "Unstable connectivity",
      body: "Sites, applications, and clouds need reliable connectivity, but some paths may be undocumented or rely on temporary workarounds.",
    },
    {
      title: "Slow network performance",
      body: "High latency or poorly designed routing affects application performance and user experience, especially in hybrid environments.",
    },
    {
      title: "Flat networks",
      body: "The absence of network segmentation makes access between systems and services broader than it should be, increasing security risk.",
    },
    {
      title: "Difficulty scaling",
      body: "Adding a new environment or site requires redesigning parts of the network instead of relying on a repeatable architecture.",
    },
    {
      title: "Hybrid connectivity",
      body: "Connecting on-premises environments to the cloud via VPN, Direct Connect, or ExpressRoute without a clear failover plan can lead to service outages if the primary path fails.",
    },
    {
      title: "Limited visibility",
      body: "When an issue occurs, there's no clear visibility into the connection path, the source of the problem, or the team responsible for resolving it.",
    },
  ],
  challenges: [],
  outcomes: [
    "Clear, scalable network architecture",
    "Effective segmentation of networks and services",
    "Private connectivity for sensitive services",
    "Tested failover for hybrid connections",
    "Monitoring of network traffic and performance",
    "Clear ownership for every component and path",
  ],
  deliverables: [
    {
      title: "Network Architecture",
      body: "A complete diagram of addressing, subnets, routing, security, and connectivity services.",
    },
    {
      title: "Connectivity Patterns",
      body: "Scalable, ready-made patterns for Hub-and-Spoke, private connectivity, and hybrid connections.",
    },
    {
      title: "Security Baseline",
      body: "Clear rules for firewalls, security groups, and network segmentation.",
    },
    {
      title: "Network Operations Runbook",
      body: "Runbooks for troubleshooting, DNS, failover, and change management.",
    },
  ],
  approach: [
    {
      title: "Traffic analysis",
      body: "We identify the most important user, application, management, and external connectivity paths.",
    },
    {
      title: "Network design",
      body: "We define IP addressing, subnets, routing, and segmentation.",
    },
    {
      title: "Connectivity implementation",
      body: "We build the hub and spokes, along with private and hybrid connections, and test them under real load.",
    },
    {
      title: "Continuity testing",
      body: "We test failover, DNS, and critical connections, and document incident-handling procedures.",
    },
  ],
  stack: [
    "Azure VNet / Firewall",
    "AWS VPC / TGW",
    "Private Link",
    "ExpressRoute / Direct Connect",
    "DNS Private Zones",
    "Terraform",
  ],
  useCases: [],
  related: ["cloud-computing", "integration", "disaster-recovery"],
};
