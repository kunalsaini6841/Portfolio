export type SkillGroup = {
  index: string;
  title: string;
  note: string;
  items: string[];
  isFeatured?: boolean;
};

/** Ordered by what the target role screens for first, not by resume order. */
export const skillGroups: SkillGroup[] = [
  {
    index: "01",
    title: "GenAI & LLMs",
    note: "Retrieval systems, orchestration, and fine-tuning",
    items: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "RAG",
      "Prompt Engineering",
      "PEFT / LoRA / QLoRA",
      "HuggingFace",
      "GPT-4o",
      "LLaMA",
      "Pinecone",
      "ChromaDB",
      "Fine-tuning",
      "Gemini"
    ],
    isFeatured: true,
  },
  {
    index: "02",
    title: "Machine Learning & Deep Learning",
    note: "Classical models through transformer architectures",
    items: [
      "Regression",
      "Classification",
      "Random Forest",
      "KNN",
      "KMeans",
      "PCA",
      "SMOTE",
      "ANN",
      "CNN",
      "LSTM",
      "GRU",
      "Transformers",
      "BERT",
      "TensorFlow 2.19",
      "PyTorch",
      "Keras",
      "Scikit-learn",
    ],
  },
  {
    index: "03",
    title: "Security ML",
    note: "Network traffic analysis and explainable detection",
    items: ["Zeek", "Suricata", "Malcolm", "PCAP analysis", "SHAP explainability","Docker","WireShark","VMware"],
    isFeatured: true,
  },
  {
    index: "04",
    title: "Cloud & Deployment",
    note: "Getting models off the laptop",
    items: ["AWS","FastAPI", "Streamlit"],
  },
  {
    index: "05",
    title: "Data & Languages",
    note: "The daily toolkit",
    items: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "SciPy",
      "NLTK",
    ],
  },
  {
    index: "06",
    title: "Workflow & Tooling",
    note: "Version control and the day-to-day environment",
    items: ["Git", "GitHub", "VS Code", "Jupyter", "PyCharm"],
  },
];
