import { getPostData, getPathList } from "@/lib/posts"
import path from 'path';
const DOCS_ROOT = path.join(process.cwd(), '/content');
const pageFileCache = {};


export default async function Page({ params }) {
  let paths = await getPathList(DOCS_ROOT, DOCS_ROOT, pageFileCache);
  let slugPath;
  if (params.id) {
    slugPath = decodeURIComponent(params.id.join('/'))
  } else {
    slugPath = '';
  }
  const markdownFile = pageFileCache[slugPath];

  // Get postdata for the slug and markdown file
  const postData = await getPostData(slugPath, markdownFile);
  return (
    <>
      <div className='prose prose-l p-5 mx-auto dark:prose-invert'>
        <h1 className='mt-28'>{postData.title}</h1>
        <div className='m-3'>/{slugPath}/</div>
        <div className='m-3'>Tags: {postData.tags}</div>
        <div className='' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </>
  )
}
