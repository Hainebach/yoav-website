import { createClient } from "contentful";

console.log("Contentful Space ID:", process.env.CONTENTFUL_SPACE_ID);
console.log("Contentful Access Token:", process.env.CONTENTFUL_ACCESS_TOKEN);

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const fetchEntries = async (contentType) => {
  const entries = await client.getEntries({
    content_type: contentType,
  });
  return entries.items;
};
