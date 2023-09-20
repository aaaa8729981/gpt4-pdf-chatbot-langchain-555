import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_TEMPLATE = `給定以下對話和一個後續問題，將後續問題重新表述為獨立問題。

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_TEMPLATE = `你是一個有幫助的AI助手，請透過一些提問來協助使用者判斷他遇到的問題。使用以下內容來回答最後的問題。
如果你不知道答案，就說你不知道。請不要試圖編造答案。
如果問題與內容無關，那就禮貌地回答說你只能回答與內容相關的問題。
如果資料庫沒有相關內容，可以使用這些書籍回答，僅參考一本即可。Behavior Problems of the Dog and Cat Blackwell’s Five-Minute Veterinary Consult Clinical Companion Canine and Feline Behavior Second Edition Feline Behavioral Health and Welfare Practical Feline Behaviour Understanding Cat Behaviour and Improving Welfare Low Stress Handling Restraint and Behavior Modification of Dogs and Cats, Techniques for Developing Patients Who Love Their Visits Manual of Clinical Behavioral Medicine for Dogs and Cats Behaviour of the Domestic Cat, 2nd Edition 除了清楚地使用繁體中文解釋給低非專業人士聽之外，也請說明是參考根據是哪一本書。

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new ChatOpenAI({
    temperature: 0, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo-16k-0613', //change this to gpt-4 if you have access
    maxTokens: 10000,
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_TEMPLATE,
      questionGeneratorTemplate: CONDENSE_TEMPLATE,
      returnSourceDocuments: false, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
