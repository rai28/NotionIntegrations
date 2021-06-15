const { client, Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function myDatabase() {
  const response = await notion.databases.retrieve({
    database_id: process.env.DATABASE_ID,
  });
  console.log(response);
}
myDatabase();
