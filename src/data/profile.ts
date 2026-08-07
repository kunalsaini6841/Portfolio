export const profile = {
  name: "Kunal Saini",
  firstName: "Kunal",
  initials: "KS",
  title: "Data Scientist · ML Engineer · AI/GenAI Engineer",
  shortTitle: "Data Scientist & GenAI Engineer",
  location: "Amroha, Uttar Pradesh, India",
  email: "kunalsaini6841@gmail.com",
  phone: "+91 8171206713",
  phoneHref: "+918171206713",
  linkedin: "https://www.linkedin.com/in/kunal-saini-024543236/",
  github: "https://github.com/kunalsaini6841",
  resumePath: "/kunal-saini-resume.pdf",

  availability: {
    isOpen: true,
    label: "Open to Data Scientist / GenAI roles",
  },

  headline: {
    lead: "I build AI systems",
    emphasis: "that make it to production.",
  },

  subheadline:
    "Data Scientist with ~3 years across GenAI and classical ML. RAG pipelines on GPT-4o and Pinecone, ML threat detection at 97% accuracy, and models running on AWS.",

  about: [
    "I'm a Data Scientist based in Amroha, UP, working across the full arc of an ML system — framing the problem, building the pipeline, training the model, and getting it in front of real users.",
    "Most recently I built threat-detection systems at Silver Touch Technology, classifying malicious network activity from honeypot PCAP traffic at 97% accuracy and adding SHAP explainability so analysts could see why a domain got flagged. Before that, at Platify Technologies, I built a RAG-based financial assistant on LangChain, GPT-4o and Pinecone, and shipped classification and regression models in the 85–90% accuracy range.",
    "I care about the unglamorous parts — retrieval quality, class imbalance, feature pipelines — because that's usually where the accuracy actually comes from.",
  ],

  /**
   * Forward-looking only. Anything listed here invites an interview question,
   * so keep it to things worth two minutes of conversation. Skills already
   * shipped belong in skills.ts, not here.
   */
  exploring: [
    "RASA for conversational AI",
    "CrewAI for multi-agent orchestration",
    "Micro AI agents",
    "Building AI agents without LLMs",
  ],
} as const;

export const stats = [
  { value: "97%", unit: "", label: "Accuracy", sub: "ML network intrusion detection" },
  { value: "40%", unit: "", label: "Faster", sub: "Automated feature pipelines" },
  { value: "~3", unit: "yrs", label: "In production", sub: "GenAI and classical ML" },
] as const;

export const education = {
  degree: "B.Tech — Computer Science & Engineering",
  institution: "ITS, Institute of Technology and Science",
  place: "Greater Noida",
  period: "2019 – 2023",
  grade: "CGPA 7.41",
} as const;

export const certifications = [
  { name: "Python Bootcamp: Zero to Hero in Python", issuer: "Udemy — Dr. Angela Yu", date: "June 2020" },
  { name: "The Complete SQL Bootcamp", issuer: "Udemy — Jose Portilla", date: "August 2021" },
  { name: "Machine Learning A–Z", issuer: "Udemy", date: "" },
] as const;
