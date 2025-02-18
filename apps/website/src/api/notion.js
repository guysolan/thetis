import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import dotenv from "dotenv";

dotenv.config();

const NOTION_CLIENT = new Client({
  auth: "secret_4dHxQ6obWpObBKkegezsrBk8vsyiF2akxpabhRCNRdm",
});
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function getDatabaseData(client, databaseId) {
  try {
    const response = await client?.databases?.query({
      database_id: databaseId,
    });
    // console.log(response)
    const results = response?.results;
    console.log(results[2]?.properties?.Section?.select?.name);

    const blogs = results?.filter(
      (res) => res?.properties?.Section?.select?.name === "Blog",
    );

    console.log(results?.length);
    console.log(blogs?.length);
  } catch (e) {
    console.log(e);
  }

  // return response
}

export async function getPageData(pageId, client = NOTION_CLIENT) {
  try {
    const response = await client.pages.retrieve({ page_id: pageId });
    if (response) {
      return {
        title: response?.properties?.Name?.title[0]?.plain_text,
        cover: response?.cover?.file
          ? response?.cover?.file?.url
          : response?.cover?.external?.url,
        description: response?.properties?.description?.name,
        created_time: response?.created_time,
        last_edited_time: response?.last_edited_time,
        cover_image: response?.cover?.file?.url,
        read_time: response?.properties["Read Time"]?.number,
        author: response?.properties?.Author?.people[0],
        tags: response?.properties?.Tags?.multi_select?.map((tag) => tag?.name),
        image_alt: response?.properties?.coverAlt?.name,
        articleBody: "", //Update this body from MD-String Later
      };
    }
  } catch (e) {
    console.log(e);
  }
}

const toUUID = (i) => {
  return (
    i.substr(0, 8) +
    "-" +
    i.substr(8, 4) +
    "-" +
    i.substr(12, 4) +
    "-" +
    i.substr(16, 4) +
    "-" +
    i.substr(20)
  );
};

const n2m = new NotionToMarkdown({ notionClient: NOTION_CLIENT });

export const page2md = async (page_id) => {
  const mdblocks = await n2m.pageToMarkdown(toUUID(page_id));
  const mdString = n2m.toMarkdownString(mdblocks);

  let page = await getPageData(toUUID(page_id));
  console.log(page);
  if (page) {
    page["articleBody"] = mdString;
  }
  return page;
};
