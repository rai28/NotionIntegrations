require("dotenv").config();
const express = require("express");
const { getTags } = require("./notionClient");
const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
let tags = [];
getTags().then((data) => {
  tags = data;
});
setInterval(async () => {
  tags = await getTags();
}, 1000 * 60 * 60);

const notionClient = require("./notionClient");
const PORT = 3000;
app.get("/", (req, res) => {
  res.render("index", { tags });
});
app.post("/create-forum", async (req, res) => {
  const { title, description, tagIds = [] } = req.body;

  await notionClient.createForum({
    title,
    description,
    tags: Array.isArray(tagIds)
      ? tagIds
      : [tagIds].map((tagId) => {
          return { id: tagId };
        }),
  });
  res.redirect("/");
});
app.listen(PORT);
