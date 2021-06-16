const { client, Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getTags() {
  const database = await notion.databases.retrieve({
    database_id: process.env.DATABASE_ID,
  });
  return notionPropertiesById(database.properties)[
    process.env.NOTION_TAGS_ID
  ].multi_select.options.map((option) => {
    return { id: option.id, name: option.name };
  });
}

function notionPropertiesById(properties) {
  return Object.values(properties).reduce((obj, property) => {
    const { id, ...rest } = property;
    return { ...obj, [id]: rest };
  }, {});
}

function createForum({ title, description, tags }) {
  notion.pages.create({
    parent: {
      database_id: process.env.DATABASE_ID,
    },
    properties: {
      [process.env.NOTION_ANIME_NAME_ID]: {
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
      [process.env.NOTION_DESCRIPTION_ID]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: description,
            },
          },
        ],
      },
      [process.env.NOTION_VOTES_ID]: {
        number: 0,
      },
      [process.env.NOTION_TAGS_ID]: {
        multi_select: tags.map((tag) => {
          return { id: tag.id };
        }),
      },
    },
  });
}

module.exports = {
  createForum,
  getTags,
};
