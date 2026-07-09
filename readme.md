# 🤖 CHATBOT – Context-Aware RAG System

A **Retrieval-Augmented Generation (RAG)** powered chatbot that uses **Google Gemini**, **LangChain**, and **Pinecone Vector Database** to deliver **context-aware answers** directly from your uploaded documents (like PDFs).  
Built with **Node.js**, this system intelligently rewrites queries, retrieves the most relevant context chunks, and generates accurate, fact-grounded responses.

---

## 🚀 Features

✅ **Retrieval-Augmented Generation (RAG)** – Combines retrieval + generation to improve factual accuracy  
✅ **Google Gemini Integration** – Leverages Gemini 2.0 Flash and Generative AI Embeddings for both context understanding and query rewriting  
✅ **Vector Database Search** – Uses **Pinecone** for lightning-fast semantic retrieval  
✅ **PDF Knowledge Ingestion** – Extracts, chunks, and embeds documents using **LangChain** tools  
✅ **Query Rewriting Engine** – Transforms follow-up questions into independent, contextually complete queries  
✅ **Context-Aware Response Generation** – Answers are derived solely from document context to minimize hallucinations  
✅ **Fully Modular Node.js Pipeline** – Clean, extensible design for future model or DB integrations

---

## 🧠 Tech Stack

| Component         | Technology                                             |
| ----------------- | ------------------------------------------------------ |
| **Language**      | Node.js (ES Modules)                                   |
| **LLM**           | Google Gemini 2.0 Flash                                |
| **Embeddings**    | Google Generative AI Embeddings (`text-embedding-004`) |
| **Vector DB**     | Pinecone                                               |
| **Frameworks**    | LangChain                                              |
| **Data Handling** | RecursiveCharacterTextSplitter, PDFLoader              |
| **Environment**   | dotenv, readline-sync                                  |

---

## 📁 Project Structure

📦 CHATBOT
│
├── index.js # Indexes and stores the document chunks in Pinecone
├── query.js # Handles query rewriting, retrieval, and response generation
├── Dsa.pdf # Example PDF used for knowledge ingestion
├── .env # Environment variables (API keys, Pinecone details)
└── package.json

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/REVANTH-1-2/GenAI-Knowledge-Chatbot.git CHATBOT
cd CHATBOT
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Add Environment Variables

```bash
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
PINECONE_ENVIRONMENT=us-east-1
```

## 4️⃣ Index Your PDF

Replace the sample Dsa.pdf with your own document and run:

```bash
node index.js
```

This will:

Load and chunk the PDF

Generate embeddings using Gemini

Store vectors in your Pinecone index

## 5️⃣ Start the Chat Interface

```bash
node query.js
```

You’ll be prompted to ask questions.
Each query is rewritten, semantically searched in Pinecone, and answered based only on the retrieved context.

## 🧩 How It Works

### 🔹 Step 1: Document Indexing (`index.js`)

- 📄 Loads a PDF using **PDFLoader**
- ✂️ Splits content into chunks using **RecursiveCharacterTextSplitter**
- 🧠 Converts each chunk into embeddings using **Google Generative AI Embeddings**
- 📦 Stores these embeddings in a **Pinecone Vector Index**

---

### 🔹 Step 2: Query Flow (`query.js`)

1. 💬 User asks a question in the console
2. 🪄 The question is **rewritten by Gemini 2.0 Flash** into a standalone query
3. 🔍 The rewritten query is **embedded and searched** in **Pinecone**
4. 📚 The top retrieved chunks form the **context**
5. 💡 **Gemini generates a response** based only on that context
6. 🧾 The response is displayed neatly in the console

---

## 🧠 Example Interaction

```bash
Ask me anything--> What is a binary tree?
Answer:
A binary tree is a data structure where each node has at most two children, commonly referred to as the left and right child.
Ask me anything--> And what is its time complexity for traversal?
Answer:
The time complexity for traversing a binary tree (inorder, preorder, or postorder) is O(n), where n is the number of nodes.



 User Question
      │
      ▼
🔁 Query Rewriting (Gemini 2.0 Flash)
      │
      ▼
🔍 Semantic Search (Pinecone Vector DB)
      │
      ▼
📚 Retrieve Contextual Chunks
      │
      ▼
💡 Gemini Response Generation
      │
      ▼
🧾 Answer Displayed to User



## ⭐ Acknowledgements

- [LangChain](https://js.langchain.com/docs/)
- [Pinecone](https://www.pinecone.io/)
- [Google Gemini](https://ai.google.dev/gemini-api)
- [Node.js](https://nodejs.org/)

---

> ⚡ *“Knowledge grounded in context — powered by Generative AI.”*
```
