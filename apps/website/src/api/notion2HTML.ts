import NotionPageToHtml from "notion-page-to-html";

// using async/await
export async function getPage(page_url: string) {
    const { title, icon, cover, html } = await NotionPageToHtml.convert(
        page_url,
    );
    console.log(title, icon, cover, html);
    // return { title: title, icon: icon, cover: cover, html: html }
    return html;
}
