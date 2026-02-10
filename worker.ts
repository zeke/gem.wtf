// Inlined CSS from github-markdown-css
const githubMarkdownCSS = `.markdown-body .octicon{display:inline-block;fill:currentColor;vertical-align:text-bottom}.markdown-body .anchor{float:left;line-height:1;margin-left:-20px;padding-right:4px}.markdown-body .anchor:focus{outline:none}.markdown-body h1 .octicon-link,.markdown-body h2 .octicon-link,.markdown-body h3 .octicon-link,.markdown-body h4 .octicon-link,.markdown-body h5 .octicon-link,.markdown-body h6 .octicon-link{color:#1b1f23;vertical-align:middle;visibility:hidden}.markdown-body h1:hover .anchor,.markdown-body h2:hover .anchor,.markdown-body h3:hover .anchor,.markdown-body h4:hover .anchor,.markdown-body h5:hover .anchor,.markdown-body h6:hover .anchor{text-decoration:none}.markdown-body h1:hover .anchor .octicon-link,.markdown-body h2:hover .anchor .octicon-link,.markdown-body h3:hover .anchor .octicon-link,.markdown-body h4:hover .anchor .octicon-link,.markdown-body h5:hover .anchor .octicon-link,.markdown-body h6:hover .anchor .octicon-link{visibility:visible}.markdown-body{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;line-height:1.5;color:#24292e;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;font-size:16px;word-wrap:break-word}.markdown-body details{display:block}.markdown-body summary{display:list-item}.markdown-body a{background-color:initial}.markdown-body a:active,.markdown-body a:hover{outline-width:0}.markdown-body strong{font-weight:inherit;font-weight:bolder}.markdown-body h1{font-size:2em;margin:.67em 0}.markdown-body img{border-style:none}.markdown-body code,.markdown-body kbd,.markdown-body pre{font-family:monospace,monospace;font-size:1em}.markdown-body hr{box-sizing:initial;height:0;overflow:visible}.markdown-body input{font:inherit;margin:0;overflow:visible}.markdown-body [type=checkbox]{box-sizing:border-box;padding:0}.markdown-body *{box-sizing:border-box}.markdown-body input{font-family:inherit;font-size:inherit;line-height:inherit}.markdown-body a{color:#0366d6;text-decoration:none}.markdown-body a:hover{text-decoration:underline}.markdown-body strong{font-weight:600}.markdown-body hr{height:0;margin:15px 0;overflow:hidden;background:transparent;border:0;border-bottom:1px solid #dfe2e5}.markdown-body hr:after,.markdown-body hr:before{display:table;content:""}.markdown-body hr:after{clear:both}.markdown-body table{border-spacing:0;border-collapse:collapse}.markdown-body td,.markdown-body th{padding:0}.markdown-body details summary{cursor:pointer}.markdown-body kbd{display:inline-block;padding:3px 5px;font:11px SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;line-height:10px;color:#444d56;vertical-align:middle;background-color:#fafbfc;border:1px solid #d1d5da;border-radius:3px;box-shadow:inset 0 -1px 0 #d1d5da}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{margin-top:0;margin-bottom:0}.markdown-body h1{font-size:32px}.markdown-body h1,.markdown-body h2{font-weight:600}.markdown-body h2{font-size:24px}.markdown-body h3{font-size:20px}.markdown-body h3,.markdown-body h4{font-weight:600}.markdown-body h4{font-size:16px}.markdown-body h5{font-size:14px}.markdown-body h5,.markdown-body h6{font-weight:600}.markdown-body h6{font-size:12px}.markdown-body p{margin-top:0;margin-bottom:10px}.markdown-body blockquote{margin:0}.markdown-body ol,.markdown-body ul{padding-left:0;margin-top:0;margin-bottom:0}.markdown-body ol ol,.markdown-body ul ol{list-style-type:lower-roman}.markdown-body ol ol ol,.markdown-body ol ul ol,.markdown-body ul ol ol,.markdown-body ul ul ol{list-style-type:lower-alpha}.markdown-body dd{margin-left:0}.markdown-body code,.markdown-body pre{font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;font-size:12px}.markdown-body pre{margin-top:0;margin-bottom:0}.markdown-body input::-webkit-inner-spin-button,.markdown-body input::-webkit-outer-spin-button{margin:0;-webkit-appearance:none;appearance:none}.markdown-body :checked+.radio-label{position:relative;z-index:1;border-color:#0366d6}.markdown-body .border{border:1px solid #e1e4e8!important}.markdown-body .border-0{border:0!important}.markdown-body .border-bottom{border-bottom:1px solid #e1e4e8!important}.markdown-body .rounded-1{border-radius:3px!important}.markdown-body .bg-white{background-color:#fff!important}.markdown-body .bg-gray-light{background-color:#fafbfc!important}.markdown-body .text-gray-light{color:#6a737d!important}.markdown-body .mb-0{margin-bottom:0!important}.markdown-body .my-2{margin-top:8px!important;margin-bottom:8px!important}.markdown-body .pl-0{padding-left:0!important}.markdown-body .py-0{padding-top:0!important;padding-bottom:0!important}.markdown-body .pl-1{padding-left:4px!important}.markdown-body .pl-2{padding-left:8px!important}.markdown-body .py-2{padding-top:8px!important;padding-bottom:8px!important}.markdown-body .pl-3,.markdown-body .px-3{padding-left:16px!important}.markdown-body .px-3{padding-right:16px!important}.markdown-body .pl-4{padding-left:24px!important}.markdown-body .pl-5{padding-left:32px!important}.markdown-body .pl-6{padding-left:40px!important}.markdown-body .f6{font-size:12px!important}.markdown-body .lh-condensed{line-height:1.25!important}.markdown-body .text-bold{font-weight:600!important}.markdown-body .pl-c{color:#6a737d}.markdown-body .pl-c1,.markdown-body .pl-s .pl-v{color:#005cc5}.markdown-body .pl-e,.markdown-body .pl-en{color:#6f42c1}.markdown-body .pl-s .pl-s1,.markdown-body .pl-smi{color:#24292e}.markdown-body .pl-ent{color:#22863a}.markdown-body .pl-k{color:#d73a49}.markdown-body .pl-pds,.markdown-body .pl-s,.markdown-body .pl-s .pl-pse .pl-s1,.markdown-body .pl-sr,.markdown-body .pl-sr .pl-cce,.markdown-body .pl-sr .pl-sra,.markdown-body .pl-sr .pl-sre{color:#032f62}.markdown-body .pl-smw,.markdown-body .pl-v{color:#e36209}.markdown-body .pl-bu{color:#b31d28}.markdown-body .pl-ii{color:#fafbfc;background-color:#b31d28}.markdown-body .pl-c2{color:#fafbfc;background-color:#d73a49}.markdown-body .pl-c2:before{content:"^M"}.markdown-body .pl-sr .pl-cce{font-weight:700;color:#22863a}.markdown-body .pl-ml{color:#735c0f}.markdown-body .pl-mh,.markdown-body .pl-mh .pl-en,.markdown-body .pl-ms{font-weight:700;color:#005cc5}.markdown-body .pl-mi{font-style:italic;color:#24292e}.markdown-body .pl-mb{font-weight:700;color:#24292e}.markdown-body .pl-md{color:#b31d28;background-color:#ffeef0}.markdown-body .pl-mi1{color:#22863a;background-color:#f0fff4}.markdown-body .pl-mc{color:#e36209;background-color:#ffebda}.markdown-body .pl-mi2{color:#f6f8fa;background-color:#005cc5}.markdown-body .pl-mdr{font-weight:700;color:#6f42c1}.markdown-body .pl-ba{color:#586069}.markdown-body .pl-sg{color:#959da5}.markdown-body .pl-corl{text-decoration:underline;color:#032f62}.markdown-body hr{border-bottom-color:#eee}.markdown-body:after,.markdown-body:before{display:table;content:""}.markdown-body:after{clear:both}.markdown-body>:first-child{margin-top:0!important}.markdown-body>:last-child{margin-bottom:0!important}.markdown-body a:not([href]){color:inherit;text-decoration:none}.markdown-body blockquote,.markdown-body details,.markdown-body dl,.markdown-body ol,.markdown-body p,.markdown-body pre,.markdown-body table,.markdown-body ul{margin-top:0;margin-bottom:16px}.markdown-body hr{height:.25em;padding:0;margin:24px 0;background-color:#e1e4e8;border:0}.markdown-body blockquote{padding:0 1em;color:#6a737d;border-left:.25em solid #dfe2e5}.markdown-body blockquote>:first-child{margin-top:0}.markdown-body blockquote>:last-child{margin-bottom:0}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{margin-top:24px;margin-bottom:16px;font-weight:600;line-height:1.25}.markdown-body h1{font-size:2em}.markdown-body h1,.markdown-body h2{padding-bottom:.3em;border-bottom:1px solid #eaecef}.markdown-body h2{font-size:1.5em}.markdown-body h3{font-size:1.25em}.markdown-body h4{font-size:1em}.markdown-body h5{font-size:.875em}.markdown-body h6{font-size:.85em;color:#6a737d}.markdown-body ol,.markdown-body ul{padding-left:2em}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:0;margin-bottom:0}.markdown-body li{word-wrap:break-all}.markdown-body li>p{margin-top:16px}.markdown-body li+li{margin-top:.25em}.markdown-body dl{padding:0}.markdown-body dl dt{padding:0;margin-top:16px;font-size:1em;font-style:italic;font-weight:600}.markdown-body dl dd{padding:0 16px;margin-bottom:16px}.markdown-body table{display:block;width:100%;overflow:auto}.markdown-body table th{font-weight:600}.markdown-body table td,.markdown-body table th{padding:6px 13px;border:1px solid #dfe2e5}.markdown-body table tr{background-color:#fff;border-top:1px solid #c6cbd1}.markdown-body table tr:nth-child(2n){background-color:#f6f8fa}.markdown-body img{max-width:100%;box-sizing:initial;background-color:#fff}.markdown-body img[align=right]{padding-left:20px}.markdown-body img[align=left]{padding-right:20px}.markdown-body code{padding:.2em .4em;margin:0;font-size:85%;background-color:rgba(27,31,35,.05);border-radius:3px}.markdown-body pre{word-wrap:normal}.markdown-body pre>code{padding:0;margin:0;font-size:100%;word-break:normal;white-space:pre;background:transparent;border:0}.markdown-body .highlight{margin-bottom:16px}.markdown-body .highlight pre{margin-bottom:0;word-break:normal}.markdown-body .highlight pre,.markdown-body pre{padding:16px;overflow:auto;font-size:85%;line-height:1.45;background-color:#f6f8fa;border-radius:3px}.markdown-body pre code{display:inline;max-width:auto;padding:0;margin:0;overflow:visible;line-height:inherit;word-wrap:normal;background-color:initial;border:0}.markdown-body .task-list-item{list-style-type:none}.markdown-body .task-list-item+.task-list-item{margin-top:3px}.markdown-body .task-list-item input{margin:0 .2em .25em -1.6em;vertical-align:middle}`;

// Simple markdown to HTML converter for basic markdown
function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Images (must be before links)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Headers
    .replace(/^######\s+(.*)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
    .replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
    .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Unordered lists
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    // Paragraphs (blank lines)
    .split(/\n\n+/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<hr') || block.startsWith('<img')) return block;
      if (block.includes('<li>')) return `<ul>${block}</ul>`;
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');
  
  return html;
}

// Homepage HTML content - rendered from README
const readmeContent = `![logo](https://user-images.githubusercontent.com/2289/105571749-670d2100-5d07-11eb-8ca2-b9dd81a849ba.png)

# gem.wtf

Type a short URL to jump straight to any Ruby gem's repository page.

## Examples

- [gem.wtf/nokogiri](https://gem.wtf/nokogiri)
- [gem.wtf/faker](https://gem.wtf/faker)
- [gem.wtf/rails](https://gem.wtf/rails)
- [gem.wtf/gemoji](https://gem.wtf/gemoji)
- [gem.wtf/stamp](https://gem.wtf/stamp)

## How it Works

- A request is made to the [RubyGems.org API](https://guides.rubygems.org/rubygems-org-api/) to fetch the gem's metdata.
- If a \`source_code_uri\` is in the metadata, you'll be redirected to it.
- If a \`documentation_uri\` is in the metadata, you'll be redirected to it.
- If neither of those are present, you'll be redirected to \`rubygems.org/gems/<gem-name>\`

## Repository

[github.com/zeke/gem.wtf](https://github.com/zeke/gem.wtf)

## License

MIT

## See Also

- [ghub.io](https://ghub.io) - a similar service, but for npm packages
- [rubydoc.info/gems](https://rubydoc.info/gems) - "your source for open source Ruby library documentation, generating fresh docs for Gems and popular Git repositories."`;

function renderHomepage(): string {
  const content = simpleMarkdownToHtml(readmeContent);
  return `<!DOCTYPE html>
<html>
<head>
<title>gem.wtf</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
${githubMarkdownCSS}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 800px;
  margin: 0 auto;
  padding: 45px;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.markdown-body h1 a,
.markdown-body h2 a,
.markdown-body h3 a,
.markdown-body h4 a,
.markdown-body h5 a,
.markdown-body h6 a {
  color: black;
}
</style>
</head>
<body>
<article class="markdown-body">
${content}
</article>
</body>
</html>`;
}

async function getGemRedirectUrl(gemname: string): Promise<string> {
  const dataUrl = `https://rubygems.org/api/v1/gems/${gemname}.json`;
  
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      return `https://rubygems.org/gems/${gemname}`;
    }
    
    const data = await response.json() as {
      source_code_uri?: string;
      homepage_uri?: string;
    };
    
    return data.source_code_uri || data.homepage_uri || `https://rubygems.org/gems/${gemname}`;
  } catch (error) {
    console.log('error fetching gem metadata', dataUrl, error);
    return `https://rubygems.org/gems/${gemname}`;
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Homepage
    if (path === '/' || path === '') {
      return new Response(renderHomepage(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // Gem redirect
    const gemname = path.slice(1); // Remove leading slash
    if (gemname && !gemname.includes('/')) {
      const redirectUrl = await getGemRedirectUrl(gemname);
      return Response.redirect(redirectUrl, 302);
    }
    
    // 404 for anything else
    return new Response('Not Found', { status: 404 });
  }
};
