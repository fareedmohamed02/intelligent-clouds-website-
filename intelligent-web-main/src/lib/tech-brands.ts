/**
 * Technology brand marks (Simple Icons SVGs) under /assets/tech.
 * Use for ecosystem strips — not as formal partner endorsements.
 */
export type TechBrand = {
  id: string;
  name: string;
  src: string;
  /** Brand hex for monochrome mask rendering */
  color: string;
  category: "cloud" | "platform" | "iac" | "delivery" | "observability" | "data" | "security";
};

export const techBrands: TechBrand[] = [
  { id: "aws", name: "AWS", src: "/assets/tech/aws.svg", color: "#FF9900", category: "cloud" },
  { id: "azure", name: "Azure", src: "/assets/tech/azure.svg", color: "#0078D4", category: "cloud" },
  {
    id: "alibaba-cloud",
    name: "Alibaba Cloud",
    src: "/assets/tech/alibaba-cloud.svg",
    color: "#FF6A00",
    category: "cloud",
  },
  {
    id: "gcp",
    name: "GCP",
    src: "/assets/tech/gcp.svg",
    color: "#4285F4",
    category: "cloud",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    src: "/assets/tech/kubernetes.svg",
    color: "#326CE5",
    category: "platform",
  },
  {
    id: "docker",
    name: "Docker",
    src: "/assets/tech/docker.svg",
    color: "#2496ED",
    category: "platform",
  },
  {
    id: "helm",
    name: "Helm",
    src: "/assets/tech/helm.svg",
    color: "#0F1689",
    category: "platform",
  },
  {
    id: "terraform",
    name: "Terraform",
    src: "/assets/tech/terraform.svg",
    color: "#844FBA",
    category: "iac",
  },
  {
    id: "opentofu",
    name: "OpenTofu",
    src: "/assets/tech/opentofu.svg",
    color: "#FFDA18",
    category: "iac",
  },
  {
    id: "ansible",
    name: "Ansible",
    src: "/assets/tech/ansible.svg",
    color: "#EE0000",
    category: "iac",
  },
  {
    id: "argo",
    name: "Argo CD",
    src: "/assets/tech/argo.svg",
    color: "#EF7B4D",
    category: "delivery",
  },
  {
    id: "github",
    name: "GitHub",
    src: "/assets/tech/github.svg",
    color: "#181717",
    category: "delivery",
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    src: "/assets/tech/github-actions.svg",
    color: "#2088FF",
    category: "delivery",
  },
  {
    id: "azure-devops",
    name: "Azure DevOps",
    src: "/assets/tech/azure-devops.svg",
    color: "#0078D7",
    category: "delivery",
  },
  {
    id: "gitlab",
    name: "GitLab",
    src: "/assets/tech/gitlab.svg",
    color: "#FC6D26",
    category: "delivery",
  },
  {
    id: "jenkins",
    name: "Jenkins",
    src: "/assets/tech/jenkins.svg",
    color: "#D24939",
    category: "delivery",
  },
  {
    id: "prometheus",
    name: "Prometheus",
    src: "/assets/tech/prometheus.svg",
    color: "#E6522C",
    category: "observability",
  },
  {
    id: "grafana",
    name: "Grafana",
    src: "/assets/tech/grafana.svg",
    color: "#F46800",
    category: "observability",
  },
  {
    id: "elastic",
    name: "Elastic",
    src: "/assets/tech/elastic.svg",
    color: "#005571",
    category: "observability",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    src: "/assets/tech/postgresql.svg",
    color: "#4169E1",
    category: "data",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    src: "/assets/tech/mongodb.svg",
    color: "#47A248",
    category: "data",
  },
  {
    id: "mysql",
    name: "MySQL",
    src: "/assets/tech/mysql.svg",
    color: "#4479A1",
    category: "data",
  },
  {
    id: "redis",
    name: "Redis",
    src: "/assets/tech/redis.svg",
    color: "#DC382D",
    category: "data",
  },
  {
    id: "nginx",
    name: "NGINX",
    src: "/assets/tech/nginx.svg",
    color: "#009639",
    category: "platform",
  },
  {
    id: "linux",
    name: "Linux",
    src: "/assets/tech/linux.svg",
    color: "#FCC624",
    category: "platform",
  },
  {
    id: "vault",
    name: "Vault",
    src: "/assets/tech/vault.svg",
    color: "#FFEC6E",
    category: "security",
  },
  {
    id: "istio",
    name: "Istio",
    src: "/assets/tech/istio.svg",
    color: "#466BB0",
    category: "platform",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    src: "/assets/tech/cloudflare.svg",
    color: "#F38020",
    category: "security",
  },
  {
    id: "sonarqube",
    name: "SonarQube",
    src: "/assets/tech/sonarqube.svg",
    color: "#4E9BCD",
    category: "delivery",
  },
  {
    id: "hashicorp",
    name: "HashiCorp",
    src: "/assets/tech/hashicorp.svg",
    color: "#000000",
    category: "iac",
  },
  {
    id: "cncf",
    name: "CNCF",
    src: "/assets/tech/cncf.svg",
    color: "#231F20",
    category: "platform",
  },
  {
    id: "databricks",
    name: "Databricks",
    src: "/assets/tech/databricks.svg",
    color: "#FF3621",
    category: "data",
  },
  {
    id: "dbt",
    name: "dbt",
    src: "/assets/tech/dbt.svg",
    color: "#FF694B",
    category: "data",
  },
  {
    id: "powerbi",
    name: "Power BI",
    src: "/assets/tech/powerbi.svg",
    color: "#F2C811",
    category: "data",
  },
  {
    id: "spark",
    name: "Apache Spark",
    src: "/assets/tech/spark.svg",
    color: "#E25A1C",
    category: "data",
  },
  {
    id: "redshift",
    name: "Amazon Redshift",
    src: "/assets/tech/redshift.svg",
    color: "#8C4FFF",
    category: "data",
  },
  {
    id: "snowflake",
    name: "Snowflake",
    src: "/assets/tech/snowflake.svg",
    color: "#29B5E8",
    category: "data",
  },
  {
    id: "kafka",
    name: "Apache Kafka",
    src: "/assets/tech/kafka.svg",
    color: "#231F20",
    category: "data",
  },
  {
    id: "flux",
    name: "Flux",
    src: "/assets/tech/flux.svg",
    color: "#5468FF",
    category: "delivery",
  },
  {
    id: "opa",
    name: "Open Policy Agent",
    src: "/assets/tech/opa.svg",
    color: "#7E3B9C",
    category: "security",
  },
  {
    id: "langchain",
    name: "LangChain",
    src: "/assets/tech/langchain.svg",
    color: "#1C3C3C",
    category: "platform",
  },
  {
    id: "openai",
    name: "OpenAI",
    src: "/assets/tech/openai.svg",
    color: "#412991",
    category: "platform",
  },
  {
    id: "python",
    name: "Python",
    src: "/assets/tech/python.svg",
    color: "#3776AB",
    category: "platform",
  },
  {
    id: "go",
    name: "Go",
    src: "/assets/tech/go.svg",
    color: "#00ADD8",
    category: "platform",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    src: "/assets/tech/fastapi.svg",
    color: "#009688",
    category: "platform",
  },
  {
    id: "sqlserver",
    name: "Microsoft SQL Server",
    src: "/assets/tech/sqlserver.svg",
    color: "#CC2927",
    category: "data",
  },
  {
    id: "airflow",
    name: "Apache Airflow",
    src: "/assets/tech/airflow.svg",
    color: "#017CEE",
    category: "data",
  },
  {
    id: "prefect",
    name: "Prefect",
    src: "/assets/tech/prefect.svg",
    color: "#070E10",
    category: "data",
  },
  {
    id: "greatexpectations",
    name: "Great Expectations",
    src: "/assets/tech/greatexpectations.svg",
    color: "#FF491B",
    category: "data",
  },
];

/** Primary strip shown on home trust bar / about ecosystem. */
export const primaryTechBrandIds = [
  "aws",
  "azure",
  "gcp",
  "terraform",
  "helm",
  "argo",
  "prometheus",
  "grafana",
  "docker",
  "github-actions",
] as const;

export function getTechBrand(id: string): TechBrand | undefined {
  return techBrands.find((b) => b.id === id);
}

export function primaryTechBrands(): TechBrand[] {
  return primaryTechBrandIds
    .map((id) => getTechBrand(id))
    .filter((b): b is TechBrand => Boolean(b));
}
