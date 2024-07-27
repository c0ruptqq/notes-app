import { Badge } from "@/components/ui/badge";
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
  function toList(str) {
    // Split the string by commas and trim whitespace from each item
    return str?.toString().split(',').map(item => item.trim());
  }

  // Get postdata for the slug and markdown file
  const postData = await getPostData(slugPath, markdownFile); 
  const tags = toList(postData.tags)
  console.log(tags)
  return (
    <>
      <div className='prose prose-l p-5 mx-auto dark:prose-invert break-words prose-td:p-3'>
        <h1 className='mt-28'>{postData.title}</h1>
        <div className='-mt-3'>/{slugPath}/</div>
        <div className='mt-3'>
          {tags?.map((tag, index) => (
          <Badge key={index} className="mr-3">#{tag}</Badge>
        ))}
        </div>
        <div className='' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </>
  )
}
