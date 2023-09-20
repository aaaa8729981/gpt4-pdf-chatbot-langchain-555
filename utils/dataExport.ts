import Client from "@replit/database";
import fs from 'fs/promises';

const db = new Client();

async function exportDBToJson() {
  try {
    // Get all key/value pairs from the database
    const allData = await db.getAll();
    
    // Convert the object to an array of key-value pairs
    const dataArray = Object.entries(allData).map(([key, value]) => ({ key, value }));

    const jsonData = JSON.stringify(dataArray, null, 2);

    await fs.writeFile('database.json', jsonData);

    console.log('Database exported to database.json');
  } catch (error) {
    console.error('Error exporting database:', error);
  }
}

exportDBToJson();

// 在 replit 介面中，到 shell，輸入以下指令
// npm run export-data 即可將資料出為 json 檔案。
// 在檔案夾，會見到 database.json
