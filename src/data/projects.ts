export type CaseStudy = {
  problem: string;
  architecture: { stage: string; detail: string }[];
  decisions: { choice: string; instead: string; because: string }[];
  results: { metric: string; label: string }[];
  retro: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  impact: string;
  tags: string[];
  stack: string[];
  repo?: string;
  demo?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
};

/**
 * Every project here maps to a resume line, a public repo, or both.
 * Card buttons render conditionally — a project without `repo` shows no
 * GitHub link rather than a dead one.
 */
export const projects: Project[] = [
  {
    slug: "financial-rag-assistant",
    index: "01",
    title: "Intelligent Financial Assistant",
    tagline:
      "A RAG chatbot that grounds GPT-4o in a domain-specific financial knowledge base, so answers cite real documents instead of inventing them.",
    impact:
      "Context-aware financial answers with no fine-tuning — retrieval and re-ranking do the work.",
    tags: ["GenAI", "RAG", "Production"],
    stack: ["Python", "Flask", "LangChain", "GPT-4o", "Pinecone", "OpenAI Embeddings"],
    featured: true,
    caseStudy: {
      problem:
        "Financial teams needed answers from a large, frequently-changing body of internal documents. A general-purpose LLM either refused, or worse, produced fluent and confidently wrong numbers. Fine-tuning was the obvious first instinct and the wrong one: the knowledge base changed faster than any retraining cycle could keep up with.",
      architecture: [
        {
          stage: "Ingestion",
          detail:
            "Documents uploaded through a Flask interface, parsed and split into overlapping chunks sized to preserve table and clause boundaries rather than cutting on a fixed character count.",
        },
        {
          stage: "Embedding",
          detail:
            "Chunks encoded with OpenAI embeddings and upserted into Pinecone with document-level metadata, so a deleted document's vectors can be removed cleanly.",
        },
        {
          stage: "Retrieval",
          detail:
            "Query-time similarity search over Pinecone returns a wide candidate set — deliberately over-fetching, because recall at this stage is cheaper to fix than precision later.",
        },
        {
          stage: "Re-ranking",
          detail:
            "Candidates re-scored against the query and narrowed to the top passages that actually fit the context window, which is where most of the answer-quality gain came from.",
        },
        {
          stage: "Generation",
          detail:
            "GPT-4o answers strictly from the retrieved context via LangChain, with session-scoped chat history so follow-up questions resolve correctly.",
        },
      ],
      decisions: [
        {
          choice: "Retrieval + re-ranking",
          instead: "fine-tuning the model",
          because:
            "the knowledge base changes constantly. Retrieval updates the moment a document is uploaded; a fine-tune would be stale the same week and cost a retraining cycle to fix.",
        },
        {
          choice: "Over-fetch then re-rank",
          instead: "trusting top-k similarity directly",
          because:
            "raw vector similarity ranks semantically-close-but-useless passages highly. Widening recall and then re-scoring gave a much better final context than tuning k ever did.",
        },
        {
          choice: "Chunking on document structure",
          instead: "fixed-size character splits",
          because:
            "financial documents carry meaning in tables and numbered clauses. Splitting mid-table produced chunks that retrieved well and answered badly.",
        },
        {
          choice: "Document-level metadata in the vector store",
          instead: "a flat vector index",
          because:
            "users need to delete a document and have it actually disappear from answers. Without metadata there is no clean way to evict its vectors.",
        },
      ],
      results: [
        { metric: "0", label: "Fine-tuning runs required" },
        { metric: "Live", label: "Knowledge base updates at upload time" },
        { metric: "Session-scoped", label: "Multi-turn chat with follow-up resolution" },
      ],
      retro:
        "I would build the evaluation harness before the pipeline, not after. I tuned chunk size and top-k largely by reading outputs and forming an impression, which works until it quietly stops working. A small fixed set of question-and-expected-source pairs, scored on retrieval hit rate, would have turned those judgement calls into measurements — and would have told me exactly how much the re-ranker was worth instead of leaving me to assume.",
    },
  },
  {
    slug: "honeypot-threat-detection",
    index: "02",
    title: "Advanced Threat Detection",
    tagline:
      "ML classification over honeypot PCAP traffic — turning raw packet captures into labelled intrusion detections at 97% accuracy.",
    impact: "97% prediction accuracy detecting malicious network activity.",
    tags: ["Security ML", "Production", "Explainable AI"],
    stack: ["Python", "Zeek", "Suricata", "Malcolm", "Scikit-learn", "SHAP", "Flask"],
    repo: "https://github.com/kunalsaini6841/Honeypipe",
    featured: true,
    caseStudy: {
      problem:
        "A honeypot generates enormous volumes of packet capture data, nearly all of it noise. Analysts cannot read PCAP at that volume, and signature-based tooling only catches attacks someone has already written a rule for. The task was to get from raw packets to a ranked, explainable verdict an analyst could act on.",
      architecture: [
        {
          stage: "Capture",
          detail:
            "Honeypot infrastructure collects live PCAP traffic — attacks arrive unsolicited and pre-labelled by context, which is what makes the dataset worth having.",
        },
        {
          stage: "Protocol parsing",
          detail:
            "Zeek converts raw packets into structured connection, DNS, HTTP and SSL logs — session-level records rather than individual frames.",
        },
        {
          stage: "Signature enrichment",
          detail:
            "Suricata runs rule-based detection in parallel, and its alerts become features rather than final verdicts, letting the model learn when the signature engine is and isn't reliable.",
        },
        {
          stage: "Feature engineering",
          detail:
            "Session-level features assembled from Zeek logs: connection duration, byte ratios, port and protocol behaviour, and DNS query characteristics.",
        },
        {
          stage: "Classification",
          detail:
            "Scikit-learn ensemble models classify sessions as benign or malicious, reaching 97% prediction accuracy.",
        },
        {
          stage: "Explanation",
          detail:
            "SHAP values expose which features drove each decision, so an analyst sees why a session was flagged instead of being handed a bare score.",
        },
      ],
      decisions: [
        {
          choice: "Zeek session logs as the feature source",
          instead: "raw packet-level features",
          because:
            "attacks are behaviours across a session, not properties of a single packet. Aggregating to the connection level put the signal at the right altitude and shrank the data by orders of magnitude.",
        },
        {
          choice: "Suricata alerts as input features",
          instead: "Suricata as the detector",
          because:
            "signatures only catch known attacks. Feeding alerts in as features let the model use that signal where it's trustworthy while still catching traffic no rule covers.",
        },
        {
          choice: "SHAP explainability alongside the model",
          instead: "accuracy alone",
          because:
            "a security analyst will not action an unexplained alert, and rightly so. Explanations are what make the output usable rather than merely correct.",
        },
        {
          choice: "Tree ensembles",
          instead: "a deep network",
          because:
            "the features are tabular and heterogeneous, the dataset is modest, and ensembles are both stronger here and far easier to explain — which the analyst workflow required.",
        },
      ],
      results: [
        { metric: "97%", label: "Prediction accuracy on intrusion detection" },
        { metric: "Per-alert", label: "SHAP attribution for analyst review" },
        { metric: "Session-level", label: "Detection granularity from raw PCAP" },
      ],
      retro:
        "Accuracy was the wrong headline metric to optimise against. Intrusion data is heavily imbalanced, and on a skewed set a high accuracy number can hide a false-negative rate that matters far more operationally — a missed intrusion costs vastly more than an analyst-reviewed false alarm. I would lead with precision, recall and PR-AUC per attack class, and tune the decision threshold to the cost asymmetry the SOC actually faces rather than to the balanced default.",
    },
  },
  {
    slug: "invoice-extraction",
    index: "03",
    title: "Invoice Information Extraction",
    tagline:
      "End-to-end pipeline pulling invoice number, date and line items out of scanned invoice images using HuggingFace models.",
    impact: "Structured, queryable fields extracted from unstructured invoice images.",
    tags: ["Document AI", "NLP", "Computer Vision"],
    stack: ["Python", "HuggingFace", "Transformers", "OCR", "Scikit-learn"],
    repo: "https://github.com/kunalsaini6841/extract-text-from-image",
    featured: false,
  },
  {
    slug: "ocr-account-opening",
    index: "04",
    title: "OCR — Current Account Opening",
    tagline:
      "Document OCR pipeline for a banking current-account onboarding flow, reading customer forms and identity documents into structured fields.",
    impact: "Automated document intake for an onboarding process that was manual and slow.",
    tags: ["Document AI", "Computer Vision", "Banking"],
    stack: ["Python", "OCR", "Image Processing", "Flask"],
    repo: "https://github.com/kunalsaini6841/OCR-project",
    featured: false,
  },
  {
    slug: "customer-conversion",
    index: "05",
    title: "Customer Conversion Prediction",
    tagline:
      "Predicting which liability customers convert to asset products, on a heavily imbalanced dataset where the positive class is the entire point.",
    impact: "Ensemble models tuned with SMOTE and cross-validation to surface a rare positive class.",
    tags: ["Classical ML", "Imbalanced Data"],
    stack: [
      "Python",
      "Scikit-learn",
      "SMOTE",
      "Logistic Regression",
      "Random Forest",
      "AdaBoost",
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return projects.filter((p) => p.caseStudy).map((p) => p.slug);
}
