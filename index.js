import * as dotenv from "dotenv";
dotenv.config();
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

async function indexDocument() {
  const PDF_PATH = "./Dsa.pdf";
  const pdfLoader = new PDFLoader(PDF_PATH);
  const rawDocs = await pdfLoader.load();
  console.log("PDF Loaded");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
  console.log("PDF Chunked into", chunkedDocs.length, "chunks");

  // vector embedding and storage logic goes here

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
  }); 
  console.log("Embeddings Configured vector size:", embeddings.embeddingSize);
  
  // configure to pinecone vector database
  const pinecone = new Pinecone();
  const indexName = process.env.PINECONE_INDEX_NAME;

  // List existing indexes and create the index if it doesn't exist
  console.log("Checking if Pinecone index exists...");
  const indexList = await pinecone.listIndexes();
  const indexExists = indexList.indexes?.some(idx => idx.name === indexName);

  if (!indexExists) {
    console.log(`Index "${indexName}" does not exist. Creating it (Dimension: 768)...`);
    await pinecone.createIndex({
      name: indexName,
      dimension: 768, // Google text-embedding-004 dimension
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1'
        }
      }
    });
    console.log("Waiting for index initialization...");
    let status = await pinecone.describeIndex(indexName);
    while (status.status?.state !== 'Ready') {
      await new Promise(resolve => setTimeout(resolve, 2000));
      status = await pinecone.describeIndex(indexName);
    }
    console.log("Index created and ready.");
  } else {
    console.log(`Index "${indexName}" already exists.`);
  }

  const pineconeIndex = pinecone.Index(indexName);
  console.log("Pinecone Configured");

  // langchain (chunking, embedding, storage)
  await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });
  console.log("PDF Indexed and data stored in Pinecone");


}

indexDocument();
