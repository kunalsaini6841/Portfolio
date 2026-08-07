export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  isCurrent: boolean;
  bullets: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "Silver Touch Technology",
    title: "Data Scientist",
    location: "Delhi",
    period: "Oct 2025 – Jul 2026",
    isCurrent: false,
    bullets: [
      "Built an ML-based DNS threat detection system (Decision Tree, Random Forest, Logistic Regression) with SHAP explainability to classify trusted vs. suspicious DNS activity.",
      "Developed an advanced threat detection system analysing honeypot PCAP traffic through Zeek and Suricata, reaching 97% prediction accuracy on network intrusion detection.",
    ],
    stack: ["Python", "Scikit-learn", "SHAP", "Zeek", "Suricata", "Malcolm", "Flask"],
  },
  {
    company: "Platify Technologies Pvt. Ltd.",
    title: "Associate Data Scientist",
    location: "Noida",
    period: "Sept 2023 – Sept 2025",
    isCurrent: false,
    bullets: [
      "Built a RAG-based Intelligent Financial Assistant on LangChain, GPT-4o and Pinecone with real-time query handling, text chunking and re-ranking for context-aware responses.",
      "Developed and deployed classification and regression models at 85–90% accuracy; automated feature-engineering pipelines and cut processing time by 40%.",
    ],
    stack: ["Python", "LangChain", "GPT-4o", "Pinecone", "Scikit-learn", "Flask", "AWS"],
  },
];
