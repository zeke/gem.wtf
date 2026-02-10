# Heroku to Cloudflare migration

**Session ID:** ses_3bc35ea28ffepyLBfrk4RgBNUZ
**Created:** 2/9/2026, 11:04:03 AM
**Updated:** 2/9/2026, 11:26:41 AM

---

## User

What would it take to move this app from Heroku to Cloudflare?

Consult @HEROKU_2_CLOUDFLARE_SKILL.md 

---

## Assistant (Plan · claude-opus-4-5 · 6.2s)

Looking at this migration, I need to analyze your app first. Let me gather information about its structure and dependencies.

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/package.json"
}
```

**Output:**
```
/Users/z/git/zeke/gem.wtf/package.json
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/Procfile"
}
```

**Output:**
```
No files found
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/*.ts"
}
```

**Output:**
```
No files found
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/*.js"
}
```

**Output:**
```
/Users/z/git/zeke/gem.wtf/wtf.js
/Users/z/git/zeke/gem.wtf/home.js
/Users/z/git/zeke/gem.wtf/server.js
```

**Tool: bash**

**Input:**
```json
{
  "command": "git remote -v",
  "description": "Check git remotes for Heroku app name"
}
```

**Output:**
```
origin	https://github.com/zeke/gem.wtf (fetch)
origin	https://github.com/zeke/gem.wtf (push)

```

---

## Assistant (Plan · claude-opus-4-5 · 4.9s)

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/z/git/zeke/gem.wtf/package.json"
}
```

**Output:**
```
<file>
00001| {
00002|   "name": "gem.wtf",
00003|   "description": "Type a short URL to jump straight to any Ruby gem's repository page",
00004|   "private": true,
00005|   "scripts": {
00006|     "start": "NODE_ENV=production node server.js",
00007|     "dev": "nodemon -e js,md,json",
00008|     "test": "standard",
00009|     "lint": "standard --fix"
00010|   },
00011|   "dependencies": {
00012|     "axios": "^0.21.1",
00013|     "express": "^4.17.1",
00014|     "github-markdown-css": "^4.0.0",
00015|     "hubdown": "^2.6.0"
00016|   },
00017|   "devDependencies": {
00018|     "nodemon": "^2.0.7",
00019|     "standard": "^16.0.3"
00020|   }
00021| }
00022| 

(End of file - total 22 lines)
</file>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/z/git/zeke/gem.wtf/server.js"
}
```

**Output:**
```
<file>
00001| const express = require('express')
00002| const app = express()
00003| const wtf = require('./wtf')
00004| const port = Number(process.env.PORT) || 3000
00005| 
00006| app.use((req, res, next) => {
00007|   if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
00008|     res.redirect('https://gem.wtf' + req.url)
00009|   } else {
00010|     next()
00011|   }
00012| })
00013| 
00014| app.use(express.static(__dirname))
00015| 
00016| app.get('/', require('./home'))
00017| 
00018| app.get('/:gemname', async (req, res) => {
00019|   const destinationUrl = await wtf(req.params.gemname)
00020|   return res.redirect(destinationUrl)
00021| })
00022| 
00023| app.listen(port, () => {
00024|   console.log(`app listening at http://localhost:${port}`)
00025| })
00026| 

(End of file - total 26 lines)
</file>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/z/git/zeke/gem.wtf/wtf.js"
}
```

**Output:**
```
<file>
00001| const axios = require('axios')
00002| 
00003| async function wtf (gemname) {
00004|   const dataUrl = `https://rubygems.org/api/v1/gems/${gemname}.json`
00005|   let dataRes
00006| 
00007|   try {
00008|     dataRes = await axios.get(dataUrl)
00009|   } catch (error) {
00010|     console.log('error fetching gem metdata', dataUrl, error)
00011|   }
00012| 
00013|   const data = dataRes && dataRes.data ? dataRes.data : {}
00014| 
00015|   const destinationUrl = data.source_code_uri || // hope it's a repo
00016|     data.homepage_uri || // or a
00017|     `https://rubygems.org/gems/${gemname}` // last resort
00018| 
00019|   return destinationUrl
00020| }
00021| 
00022| module.exports = wtf
00023| 

(End of file - total 23 lines)
</file>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/z/git/zeke/gem.wtf/home.js"
}
```

**Output:**
```
<file>
00001| const hubdown = require('hubdown')
00002| const fs = require('fs')
00003| const path = require('path')
00004| const readme = fs.readFileSync(path.join(__dirname, './README.md'), 'utf8')
00005| var doc
00006| 
00007| hubdown(readme).then(_doc => {
00008|   doc = _doc
00009| })
00010| 
00011| function html () {
00012|   return `
00013| <title>gem.wtf</title>
00014| <meta name="viewport" content="width=device-width, initial-scale=1">
00015| <link rel="stylesheet" href="/node_modules/github-markdown-css/github-markdown.css">
00016| <style>
00017|   .markdown-body {
00018|     box-sizing: border-box;
00019|     min-width: 200px;
00020|     max-width: 800px;
00021|     margin: 0 auto;
00022|     padding: 45px;
00023|   }
00024| 
00025|   @media (max-width: 767px) {
00026|     .markdown-body {
00027|       padding: 15px;
00028|     }
00029|   }
00030| 
00031|   .markdown-body h1 a,
00032|   .markdown-body h2 a,
00033|   .markdown-body h3 a,
00034|   .markdown-body h4 a,
00035|   .markdown-body h5 a,
00036|   .markdown-body h6 a {
00037|     color: black;
00038|   }
00039| </style>
00040| 
00041| <article class="markdown-body">
00042|   ${doc.content}
00043| </article>
00044| `
00045| }
00046| 
00047| module.exports = async (req, res, next) => {
00048|   res.set('Content-Type', 'text/html')
00049|   res.send(html())
00050| }
00051| 

(End of file - total 51 lines)
</file>
```

---

## Assistant (Plan · claude-opus-4-5 · 976.2s)

Let me also check if there's a README and look for any Heroku configuration:

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/z/git/zeke/gem.wtf/README.md"
}
```

**Output:**
```
<file>
00001| ![logo](https://user-images.githubusercontent.com/2289/105571749-670d2100-5d07-11eb-8ca2-b9dd81a849ba.png)
00002| 
00003| # gem.wtf
00004| 
00005| Type a short URL to jump straight to any Ruby gem's repository page.
00006| 
00007| ## Examples
00008| 
00009| - [gem.wtf/nokogiri](https://gem.wtf/nokogiri)
00010| - [gem.wtf/faker](https://gem.wtf/faker)
00011| - [gem.wtf/rails](https://gem.wtf/rails)
00012| - [gem.wtf/gemoji](https://gem.wtf/gemoji)
00013| - [gem.wtf/stamp](https://gem.wtf/stamp)
00014| 
00015| ## How it Works
00016| 
00017| - A request is made to the [RubyGems.org API](https://guides.rubygems.org/rubygems-org-api/) to fetch the gem's metdata.
00018| - If a `source_code_uri` is in the metadata, you'll be redirected to it.
00019| - If a `documentation_uri` is in the metadata, you'll be redirected to it.
00020| - If neither of those are present, you'll be redirected to `rubygems.org/gems/<gem-name>`
00021| 
00022| ## Repository
00023| 
00024| [github.com/zeke/gem.wtf](https://github.com/zeke/gem.wtf)
00025| 
00026| ## License
00027| 
00028| MIT
00029| 
00030| ## See Also
00031| 
00032| - [ghub.io](https://ghub.io) - a similar service, but for npm packages
00033| - [rubydoc.info/gems](https://rubydoc.info/gems) - "your source for open source Ruby library documentation, generating fresh docs for Gems and popular Git repositories."
00034| 

(End of file - total 34 lines)
</file>
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/app.json"
}
```

**Output:**
```
No files found
```

**Tool: bash**

**Input:**
```json
{
  "command": "heroku apps:info --app gem-wtf --json 2>/dev/null || echo \"No Heroku app found or not logged in\"",
  "description": "Get Heroku app info"
}
```

---

## Assistant (Plan · claude-opus-4-5 · 5.4s)

This is a straightforward Express app. Let me verify there are no blockers for Workers-native deployment:

**Tool: grep**

**Input:**
```json
{
  "pattern": "child_process|require\\(['\"]child_process|from ['\"]child_process"
}
```

**Output:**
```
Found 1 matches
/Users/z/git/zeke/gem.wtf/HEROKU_2_CLOUDFLARE_SKILL.md:
  Line 130: | No child_process | No `require('child_process')` or `from 'child_process'` in source code |
```

**Tool: grep**

**Input:**
```json
{
  "pattern": "\\.on\\(['\"]upgrade"
}
```

**Output:**
```
Found 1 matches
/Users/z/git/zeke/gem.wtf/HEROKU_2_CLOUDFLARE_SKILL.md:
  Line 131: | No WebSocket server | No `ws`, `socket.io`, `@socket.io/` in dependencies; no `.on('upgrade'` in source code |
```

---

## Assistant (Plan · claude-opus-4-5 · 23.0s)

No blockers found (the matches are just in the skill file itself). Now I have a complete picture.

---

## Migration Analysis

**App Summary:**
- **Name:** gem.wtf
- **Language:** Node.js (Express)
- **Function:** URL shortener for Ruby gems - redirects `gem.wtf/<gem>` to the gem's source code or homepage
- **Dependencies:** express, axios, hubdown (markdown renderer), github-markdown-css
- **Process types:** Web only (no worker, clock, or release processes)
- **Database:** None
- **Redis:** None
- **File storage:** None (reads README.md at startup only)
- **WebSockets:** None

## Workers-Native Eligibility (Path A)

This app passes all eligibility checks:

| Requirement | Status |
|---|---|
| Node.js app | ✅ `package.json` exists |
| Web process only | ✅ No Procfile, only web via `npm start` |
| Not Next.js | ✅ No Next.js |
| No native addons | ✅ No sharp, bcrypt, etc. |
| No child_process | ✅ Not used |
| No WebSocket server | ✅ Not used |

**Recommendation: Path A (Workers-native)** - This app can run directly on Cloudflare Workers without Docker/Containers. This means faster cold starts, lower cost, and simpler deployment.

---

## What Would Need to Be Done

### Files to Create

1. **`worker-entry.ts`** - Worker entry point using `httpServerHandler`
   - Uses the port-based pattern since `server.js` calls `.listen(port)` with a fallback (`process.env.PORT || 3000`)
   
2. **`wrangler.jsonc`** - Workers configuration with `nodejs_compat` flag

3. **`tsconfig.json`** - TypeScript config for Workers

4. **`.github/workflows/deploy.yml`** - CI/CD pipeline (without Docker)

### Files to Modify

1. **`package.json`** - Add `wrangler` and `@cloudflare/workers-types` to devDependencies

### Code Considerations

1. **HTTPS redirect logic** (`server.js:6-11`) - On Cloudflare, all traffic is HTTPS by default, and the redirect header check for `x-forwarded-proto` won't be needed. Could be left in place (harmless) or removed.

2. **Static file serving** (`express.static(__dirname)`) - This serves `node_modules/github-markdown-css/`. For Workers, static assets would need to be bundled or served differently. Options:
   - Bundle the CSS into the Worker (small file, recommended)
   - Use Cloudflare R2/Assets for static files
   - Inline the CSS in the HTML template

3. **README.md reading** (`home.js:4`) - Uses `fs.readFileSync` at module load time. Wrangler bundles this at build time, so it should work, but we should verify.

---

## Questions for You

1. **Static CSS handling:** The app serves `github-markdown-css` from `node_modules`. Would you prefer to:
   - Bundle/inline the CSS (simplest)
   - Host it on a CDN like unpkg/jsdelivr
   - Use Cloudflare R2 for assets

2. **Custom domain:** Is `gem.wtf` currently pointing to Heroku? Do you want to set up the custom domain on Cloudflare as part of this migration?

3. **Environment variables:** The app doesn't appear to use any secrets or environment variables beyond `PORT`. Is that accurate?

4. **Deployment:** Should I set up GitHub Actions for automatic deploys on push to main, or would you prefer manual `wrangler deploy`?

---

## User

Bundling or inlining the CSS is fine. The domain is currently pointing to Heroku, but I can configure it to point to Cloudflare with your help. I don't know if there are any custom variables. And I would love to have an actions workflow for automatic deployments. 

---

## Assistant (Plan · claude-opus-4-5 · 16.1s)

Let me check what Heroku environment variables are configured and look at the skill's reference templates:

**Tool: bash**

**Input:**
```json
{
  "command": "heroku config --app gem-wtf --json 2>/dev/null || echo '{\"error\": \"Could not fetch Heroku config\"}'",
  "description": "Get Heroku config vars"
}
```

**Output:**
```
{}

```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/assets/templates/*.ts"
}
```

**Output:**
```
No files found
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/assets/templates/*.jsonc"
}
```

**Output:**
```
No files found
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/assets/templates/*.yml"
}
```

**Output:**
```
No files found
```

---

## Assistant (Plan · claude-opus-4-5 · 12.0s)

No environment variables on Heroku - the app is stateless. The skill references template files that don't exist in this repo, so I'll create them based on the skill's guidance. Let me also check how the CSS file is structured to plan the bundling:

**Tool: bash**

**Input:**
```json
{
  "command": "wc -c node_modules/github-markdown-css/github-markdown.css 2>/dev/null || echo \"File not found - need to npm install first\"",
  "description": "Check CSS file size"
}
```

**Output:**
```
File not found - need to npm install first

```

**Tool: bash**

**Input:**
```json
{
  "command": "npm pack github-markdown-css --dry-run 2>&1 | head -5 || echo \"Cannot check package\"",
  "description": "Check CSS package size"
}
```

**Output:**
```
npm notice
npm notice 📦  github-markdown-css@5.9.0
npm notice Tarball Contents
npm notice 22.2kB github-markdown-dark-colorblind.css
npm notice 22.2kB github-markdown-dark-dimmed.css

```

---

## Assistant (Plan · claude-opus-4-5 · 9.5s)

**Tool: bash**

**Input:**
```json
{
  "command": "npm pack github-markdown-css --dry-run 2>&1 | grep -E \"github-markdown\\.css|github-markdown-light\" || echo \"Checking package contents\"",
  "description": "Find the specific CSS file"
}
```

**Output:**
```
npm notice 22.2kB github-markdown-light-colorblind.css
npm notice 22.2kB github-markdown-light.css
npm notice 31.1kB github-markdown.css

```

---

## Assistant (Plan · claude-opus-4-5 · 10.0s)

The CSS file is about 31KB - small enough to inline. Let me also verify how Cloudflare handles the `fs` module for bundling:

**Tool: cloudflare-docs_search_cloudflare_documentation**

**Input:**
```json
{
  "query": "Workers nodejs_compat fs readFileSync bundling static files"
}
```

**Output:**
```
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/changelog/2025-08-15-nodejs-fs/</url>
<title></title>
<text>
#### Using the `node:fs` module

The `node:fs` module provides access to a virtual file system in Workers. You can use it to read and write files, create directories, and perform other file system operations.

The virtual file system is ephemeral with each individual request havig its own isolated temporary file space. Files written to the file system will not persist across requests and will not be shared across requests or across different Workers.

Workers running with the `nodejs_compat` compatibility flag will have access to the `node:fs` module by default when the compatibility date is set to `2025-09-01` or later. Support for the API can also be enabled using the `enable_nodejs_fs_module` compatibility flag together with the `nodejs_compat` flag. The `node:fs` module can be disabled using the `disable_nodejs_fs_module` compatibility flag.

JavaScript

```

import fs from "node:fs";


const config = JSON.parse(fs.readFileSync("/bundle/config.json", "utf-8"));


export default {

  async fetch(request) {

    return new Response(`Config value: ${config.value}`);

  },

};


```

There are a number of initial limitations to the `node:fs` implementation:

* The glob APIs (e.g. `fs.globSync(...)`) are not implemented.
* The file watching APIs (e.g. `fs.watch(...)`) are not implemented.
* The file timestamps (modified time, access time, etc) are only partially supported. For now, these will always return the Unix epoch.

Refer to the [Node.js documentation ↗](https://nodejs. [CONTENT TRIMMED DUE TO SIZE]
---
title: The Node.js and Web File System APIs in Workers
description: The node:fs and Web File System APIs are now available in Workers.
image: https://developers.cloudflare.com/changelog-preview.png
---

[Skip to content](#%5Ftop) 

# Changelog

New updates and improvements at Cloudflare.

[ Subscribe to RSS ](/changelog/rss/index.xml)   
[ View all RSS feeds ](/fundamentals/new-features/available-rss-feeds/) 

![hero image](/_astro/hero.CVYJHPAd_ZEA2nF.svg) 

[ ← Back to all posts ](/changelog/) 

## The Node.js and Web File System APIs in Workers

Aug 15, 2025 

[ Workers ](/workers/) 

Implementations of the [node:fs module ↗](https://nodejs.org/docs/latest/api/fs.html) and the [Web File System API ↗](https://developer.mozilla.org/en-US/docs/Web/API/File%5FSystem%5FAccess%5FAPI) are now available in Workers.

#### Using the `node:fs` module

The `node:fs` module provides access to a virtual file system in Workers. You can use it to read and write files, create directories, and perform other file system operations.

The virtual file system is ephemeral with each individual request havig its own isolated temporary file space. Files written to the file system will not persist across requests and will not be shared across requests or across different Workers.

Workers running with the `nodejs_compat` compatibility flag will have access to the `node:fs` module by default when the compatibility date is set to `2025-09-01` or later. Support for the API can also be enabled usin [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/</url>
<title></title>
<text>
↗](https://linux-kernel-labs.github.io/refs/heads/master/labs/device%5Fdrivers.html) like`/dev/null`, `/dev/random`, `/dev/full`, and `/dev/zero`.

The directory structure initially looks like:

```

/bundle

└── (one file for each module in your Worker bundle)

/tmp

└── (empty, but you can write files, create directories, symlinks, etc)

/dev

├── null

├── random

├── full

└── zero


```

The `/bundle` directory contains the files for all modules included in your Worker bundle, which you can read using APIs like `readFileSync` or`read(...)`, etc. These are always read-only. Reading from the bundle can be useful when you need to read a config file or a template.

JavaScript

```

import { readFileSync } from "node:fs";


// The config.txt file would be included in your Worker bundle.

// Refer to the Wrangler documentation for details on how to

// include additional files.

const config = readFileSync("/bundle/config.txt", "utf8");


export default {

  async fetch(request) {

    return new Response(`Config contents: ${config}`);

  },

};


```

The `/tmp` directory is writable, and you can use it to create temporary files or directories. You can also create symlinks in this directory. However, the contents of `/tmp` are not persistent and are unique to each request. This means that files created in `/tmp` within the context of one request will not be available in other concurrent or subsequent requests.

JavaScript

```

import { writeFileSync, readFileSync } from "nod [CONTENT TRIMMED DUE TO SIZE]
---
title: fs
description: You can use node:fs to access a virtual file
system in Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

  
## Was this helpful?

  
[ Edit](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/runtime-apis/nodejs/fs.mdx) [ Issue](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# fs

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

You can use [node:fs ↗](https://nodejs.org/api/fs.html) to access a virtual file system in Workers.

The `node:fs` module is available in Workers runtimes that support Node.js compatibility using the `nodejs_compat` compatibility flag. Any Worker running with `nodejs_compat` enabled and with a compatibility date of`2025-09-01` or later will have access to `node:fs` by default. It is also possible to enable `node:fs` on Workers with an earlier compatibility date using a combination of the `nodejs_compat` and `enable_nodejs_fs_module`flags. To disable `node:fs` you can set the `disable_nodejs_fs_module` flag.

JavaScript

```

import { readFileSync, writeFileSync } [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/static-assets/direct-upload/</url>
<title></title>
<text>
    throw new Error("Missing required environment variable: ASSETS_DIRECTORY");

  }


  if (!fs.existsSync(assetsDirectory)) {

    throw new Error(`Assets directory does not exist: ${assetsDirectory}`);

  }


  const subdomain = process.env["CLOUDFLARE_SUBDOMAIN"];


  return {

    apiToken,

    accountId,

    assetsDirectory,

    subdomain: subdomain || undefined,

    workerName: WORKER_NAME,

  };

}


const config = loadConfig();

const client = new Cloudflare({

  apiToken: config.apiToken,

});


/**

 * Recursively reads all files from a directory and creates a manifest

 * mapping file paths to their hash and size.

 */

function createManifest(directory) {

  const manifest = {};


  function processDirectory(currentDir, basePath = "") {

    try {

      const entries = fs.readdirSync(currentDir, { withFileTypes: true });


      for (const entry of entries) {

        const fullPath = path.join(currentDir, entry.name);

        const relativePath = path.join(basePath, entry.name);


        if (entry.isDirectory()) {

          processDirectory(fullPath, relativePath);

        } else if (entry.isFile()) {

          try {

            const fileContent = fs.readFileSync(fullPath);

            const extension = extname(relativePath).substring(1);


            // Generate a hash for the file

            const hash = crypto

              .createHash("sha256")

              .update(fileContent.toString("base64") + extension)

              .digest("hex")

 [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/static-assets/</url>
<title></title>
<text>


## Deploying static assets with Wrangler

If you prefer a CLI-based approach and your platform setup allows direct publishing, you can use Wrangler to deploy both your Worker code and static assets. Wrangler bundles and uploads static assets (from a specified directory) along with your Worker script, so you can manage everything in one place.

Create or update your [Wrangler configuration file](/workers/wrangler/configuration/) to specify where Wrangler should look for static files:

* [  wrangler.jsonc ](#tab-panel-5646)
* [  wrangler.toml ](#tab-panel-5647)

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-static-site",

  "main": "./src/index.js",

  "compatibility_date": "2026-02-07",

  "assets": {

    "directory": "./public",

    "binding": "ASSETS",

  },

}


```

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-static-site"

main = "./src/index.js"

compatibility_date = "2026-02-07"


[assets]

directory = "./public"

binding = "ASSETS"


```

* `directory`: The local folder containing your static files (for example, `./public`).
* `binding`: The binding name used to reference these assets within your Worker code.

### 1\. Organize your files

Place your static files (HTML, CSS, images, etc.) in the specified directory (in this example, `./public`). Wrangler will detect and bundle these files when you publish your Worker.

If you need to reference these files in your Worker script to serve them dynamically [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/configuration/sites/start-from-scratch/</url>
<title></title>
<text>
 files and directories:

* `public`: The static assets for your project. By default it contains an `index.html` and a `favicon.ico`.
* `src`: The Worker configured for serving your assets. You do not need to edit this but if you want to see how it works or add more functionality to your Worker, you can edit `src/index.ts`.
* `wrangler.jsonc`: The file containing project configuration. The `bucket` property tells Wrangler where to find the static assets (e.g. `site = { bucket = "./public" }`).
* `package.json`/`package-lock.json`: define the required Node.js dependencies.

## Customize the `wrangler.jsonc` file:

* Change the `name` property to the name of your project:  
   * [  wrangler.jsonc ](#tab-panel-6599)  
   * [  wrangler.toml ](#tab-panel-6600)  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "name": "my-site"  
}  
```  
```  
"$schema" = "./node_modules/wrangler/config-schema.json"  
name = "my-site"  
```
* Consider updating`compatibility_date` to today's date to get access to the most recent Workers features:  
   * [  wrangler.jsonc ](#tab-panel-6601)  
   * [  wrangler.toml ](#tab-panel-6602)  
```  
{  
  "compatibility_date": "yyyy-mm-dd"  
}  
```  
```  
compatibility_date = "yyyy-mm-dd"  
```
* Deploy your site to a [custom domain](/workers/configuration/routing/custom-domains/) that you own and have already attached as a Cloudflare zone:  
   * [  wrangler.jsonc ](#tab-panel-6603)  
   * [  wrangler.toml ](#tab-panel-6604)  
``` [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/configuration/compatibility-flags/</url>
<title></title>
<text>
If your compatibility date is 2024-09-22 or before and you want to enable v2, add the `nodejs_compat_v2` in addition to the `nodejs_compat` flag. If your compatibility date is after 2024-09-23, but you want to disable v2 to avoid increasing your bundle size, add the `no_nodejs_compat_v2` in addition to the `nodejs_compat flag`.

A [growing subset](/workers/runtime-apis/nodejs/) of Node.js APIs are available directly as [Runtime APIs](/workers/runtime-apis/nodejs), with no need to add polyfills to your own code. To enable these APIs in your Worker, add the `nodejs_compat` compatibility flag to your [Wrangler configuration file](/workers/wrangler/configuration/):

To enable both built-in runtime APIs and polyfills for your Worker or Pages project, add the [nodejs\_compat](/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) [compatibility flag](/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) to your [Wrangler configuration file](/workers/wrangler/configuration/), and set your compatibility date to September 23rd, 2024 or later. This will enable [Node.js compatibility](/workers/runtime-apis/nodejs/) for your Workers project.

* [  wrangler.jsonc ](#tab-panel-4022)
* [  wrangler.toml ](#tab-panel-4023)

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "compatibility_date": "2026-02-07"

}


```

```

compatibility_flags = [ "nodejs_compat" ]

compatibility_date = "2026-02-07"


```

* [  wrangler.jsonc ](#tab-panel-4016)
*  [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/configuration/sites/start-from-worker/</url>
<title></title>
<text>
is/handlers/fetch/)  
         * [ Queue Handler ↗ ](/queues/configuration/javascript-apis/#consumer)  
         * [ Scheduled Handler ](/workers/runtime-apis/handlers/scheduled/)  
         * [ Tail Handler ](/workers/runtime-apis/handlers/tail/)  
   * [ Headers ](/workers/runtime-apis/headers/)  
   * [ HTMLRewriter ](/workers/runtime-apis/html-rewriter/)  
   * [ MessageChannel ](/workers/runtime-apis/messagechannel/)  
   * Node.js compatibility  
         * [ Overview ](/workers/runtime-apis/nodejs/)  
         * [ assert ](/workers/runtime-apis/nodejs/assert/)  
         * [ AsyncLocalStorage ](/workers/runtime-apis/nodejs/asynclocalstorage/)  
         * [ Buffer ](/workers/runtime-apis/nodejs/buffer/)  
         * [ crypto ](/workers/runtime-apis/nodejs/crypto/)  
         * [ Diagnostics Channel ](/workers/runtime-apis/nodejs/diagnostics-channel/)  
         * [ dns ](/workers/runtime-apis/nodejs/dns/)  
         * [ EventEmitter ](/workers/runtime-apis/nodejs/eventemitter/)  
         * [ fs ](/workers/runtime-apis/nodejs/fs/)  
         * [ http ](/workers/runtime-apis/nodejs/http/)  
         * [ https ](/workers/runtime-apis/nodejs/https/)  
         * [ net ](/workers/runtime-apis/nodejs/net/)  
         * [ path ](/workers/runtime-apis/nodejs/path/)  
         * [ process ](/workers/runtime-apis/nodejs/process/)  
         * [ Streams ](/workers/runtime-apis/nodejs/streams/)  
         * [ StringDecoder ](/workers/runtime-apis/nodejs/string-decoder/)  
        [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/static-assets/binding/</url>
<title></title>
<text>
](/email-routing/email-workers/runtime-api/)  
         * [ Fetch Handler ](/workers/runtime-apis/handlers/fetch/)  
         * [ Queue Handler ↗ ](/queues/configuration/javascript-apis/#consumer)  
         * [ Scheduled Handler ](/workers/runtime-apis/handlers/scheduled/)  
         * [ Tail Handler ](/workers/runtime-apis/handlers/tail/)  
   * [ Headers ](/workers/runtime-apis/headers/)  
   * [ HTMLRewriter ](/workers/runtime-apis/html-rewriter/)  
   * [ MessageChannel ](/workers/runtime-apis/messagechannel/)  
   * Node.js compatibility  
         * [ Overview ](/workers/runtime-apis/nodejs/)  
         * [ assert ](/workers/runtime-apis/nodejs/assert/)  
         * [ AsyncLocalStorage ](/workers/runtime-apis/nodejs/asynclocalstorage/)  
         * [ Buffer ](/workers/runtime-apis/nodejs/buffer/)  
         * [ crypto ](/workers/runtime-apis/nodejs/crypto/)  
         * [ Diagnostics Channel ](/workers/runtime-apis/nodejs/diagnostics-channel/)  
         * [ dns ](/workers/runtime-apis/nodejs/dns/)  
         * [ EventEmitter ](/workers/runtime-apis/nodejs/eventemitter/)  
         * [ fs ](/workers/runtime-apis/nodejs/fs/)  
         * [ http ](/workers/runtime-apis/nodejs/http/)  
         * [ https ](/workers/runtime-apis/nodejs/https/)  
         * [ net ](/workers/runtime-apis/nodejs/net/)  
         * [ path ](/workers/runtime-apis/nodejs/path/)  
         * [ process ](/workers/runtime-apis/nodejs/process/)  
         * [ Streams ](/workers/runtime-apis/nodejs/s [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
```

---

## Assistant (Plan · claude-opus-4-5 · 8.9s)

This confirms that `fs.readFileSync` will work - files read at bundle time are available in `/bundle`. Let me also check how `httpServerHandler` works for the Worker entry point:

**Tool: cloudflare-docs_search_cloudflare_documentation**

**Input:**
```json
{
  "query": "httpServerHandler nodejs Workers express port-based pattern"
}
```

**Output:**
```
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/runtime-apis/nodejs/https/</url>
<title></title>
<text>
 req.end();

    return promise;

  },

};


```

The following additional options are not supported: `ca`, `cert`, `ciphers`, `clientCertEngine` (deprecated), `crl`, `dhparam`, `ecdhCurve`, `honorCipherOrder`, `key`, `passphrase`, `pfx`, `rejectUnauthorized`, `secureOptions`, `secureProtocol`, `servername`, `sessionIdContext`, `highWaterMark`.

## createServer

An implementation of the Node.js [https.createServer ↗](https://nodejs.org/docs/latest/api/https.html#httpscreateserveroptions-requestlistener) method.

The `createServer` method creates an HTTPS server instance that can handle incoming secure requests. It's a convenience function that creates a new `Server` instance and optionally sets up a request listener callback.

JavaScript

```

import { createServer } from "node:https";

import { httpServerHandler } from "cloudflare:node";


const server = createServer((req, res) => {

  res.writeHead(200, { "Content-Type": "text/plain" });

  res.end("Hello from Node.js HTTPS server!");

});


server.listen(8080);

export default httpServerHandler({ port: 8080 });


```

The `httpServerHandler` function integrates Node.js HTTPS servers with the Cloudflare Workers request model. When a request arrives at your Worker, the handler automatically routes it to your Node.js server running on the specified port. This bridge allows you to use familiar Node.js server patterns while benefiting from the Workers runtime environment, including automatic scaling, edge deployment, and integr [CONTENT TRIMMED DUE TO SIZE]

## Agent

An implementation of the Node.js [https.Agent ↗](https://nodejs.org/docs/latest/api/https.html#class-httpsagent) class.

An [Agent ↗](https://nodejs.org/docs/latest/api/https.html#class-httpsagent) manages HTTPS connection reuse by maintaining request queues per host/port. In the Workers environment, however, such low-level management of the network connection, ports, etc, is not relevant because it is handled by the Cloudflare infrastructure instead. Accordingly, the implementation of `Agent` in Workers is a stub implementation that does not support connection pooling or keep-alive.

## Server

An implementation of the Node.js [https.Server ↗](https://nodejs.org/docs/latest/api/https.html#class-httpsserver) class.

In Node.js, the `https.Server` class represents an HTTPS server and provides methods for handling incoming secure requests. In Workers, handling of secure requests is provided by the Cloudflare infrastructure so there really is not much difference between using `https.Server` or `http.Server`. The workers runtime provides an implementation for completeness but most workers should probably just use [http.Server](/workers/runtime-apis/nodejs/http#server).

JavaScript

```

import { Server } from "node:https";

import { httpServerHandler } from "cloudflare:node";


const server = new Server((req, res) => {

  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(JSON.stringify({ message: "Hello from HTTPS Server!" }));

});

server.listen( [CONTENT TRIMMED DUE TO SIZE]
ers implementation and Node.js:

* Connection management methods such as `closeAllConnections()` and `closeIdleConnections()` are not implemented due to the nature of the Workers environment.
* Only `listen()` variants with a port number or no parameters are supported: `listen()`, `listen(0, callback)`, `listen(callback)`, etc.
* The following server options are not supported: `maxHeaderSize`, `insecureHTTPParser`, `keepAliveTimeout`, `connectionsCheckingInterval`
* TLS/SSL-specific options such as `ca`, `cert`, `key`, `pfx`, `rejectUnauthorized`, `secureProtocol` are not supported in the Workers environment. If you need to use mTLS, use the [mTLS binding](/workers/runtime-apis/bindings/mtls/).

## Other differences between Node.js and Workers implementation of `node:https`

Because the Workers implementation of `node:https` is a wrapper around the global `fetch` API, there are some differences in behavior compared to Node.js:

* `Connection` headers are not used. Workers will manage connections automatically.
* `Content-Length` headers will be handled the same way as in the `fetch` API. If a body is provided, the header will be set automatically and manually set values will be ignored.
* `Expect: 100-continue` headers are not supported.
* Trailing headers are not supported.
* The `'continue'` event is not supported.
* The `'information'` event is not supported.
* The `'socket'` event is not supported.
* The `'upgrade'` event is not supported.
* Gaining direct access to the u [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/runtime-apis/nodejs/http/</url>
<title></title>
<text>


## Agent

A partial implementation of the Node.js [\`http.Agent' ↗](https://nodejs.org/docs/latest/api/http.html#class-httpagent) class.

An `Agent` manages HTTP connection reuse by maintaining request queues per host/port. In the workers environment, however, such low-level management of the network connection, ports, etc, is not relevant because it is handled by the Cloudflare infrastructure instead. Accordingly, the implementation of `Agent` in Workers is a stub implementation that does not support connection pooling or keep-alive.

JavaScript

```

import { Agent } from "node:http";

import { strictEqual } from "node:assert";


const agent = new Agent();

strictEqual(agent.protocol, "http:");


```

## createServer

An implementation of the Node.js [http.createServer ↗](https://nodejs.org/docs/latest/api/http.html#httpcreateserveroptions-requestlistener) method.

The `createServer` method creates an HTTP server instance that can handle incoming requests.

JavaScript

```

import { createServer } from "node:http";

import { httpServerHandler } from "cloudflare:node";


const server = createServer((req, res) => {

  res.writeHead(200, { "Content-Type": "text/plain" });

  res.end("Hello from Node.js HTTP server!");

});


server.listen(8080);

export default httpServerHandler({ port: 8080 });


```

## Node.js integration

### httpServerHandler

The `httpServerHandler` function integrates Node.js HTTP servers with the Cloudflare Workers request model. It supports two API  [CONTENT TRIMMED DUE TO SIZE]
## Server

An implementation of the Node.js [http.Server ↗](https://nodejs.org/docs/latest/api/http.html#class-httpserver) class.

The `Server` class represents an HTTP server and provides methods for handling incoming requests. It extends the Node.js `EventEmitter` class and can be used to create custom server implementations.

When using `httpServerHandler`, the port number specified in `server.listen()` acts as a routing key rather than an actual network port. The handler uses this port to determine which HTTP server instance should handle incoming requests, allowing multiple servers to coexist within the same Worker by using different port numbers for identification. Using a port value of `0` (or `null` or `undefined`) will result in a random port number being assigned.

JavaScript

```

import { Server } from "node:http";

import { httpServerHandler } from "cloudflare:node";


const server = new Server((req, res) => {

  res.writeHead(200, { "Content-Type": "application/json" });

  res.end(JSON.stringify({ message: "Hello from HTTP Server!" }));

});


server.listen(8080);

export default httpServerHandler({ port: 8080 });


```

The following differences exist between the Workers implementation and Node.js:

* Connection management methods such as `closeAllConnections()` and `closeIdleConnections()` are not implemented
* Only `listen()` variants with a port number or no parameters are supported: `listen()`, `listen(0, callback)`, `listen(callback)`, etc. For reference, [CONTENT TRIMMED DUE TO SIZE]

import http from "node:http";

import { httpServerHandler } from "cloudflare:node";


const server = http.createServer((req, res) => {

  res.end("hello world");

});


// Pass server directly (simplified) - automatically calls listen() if needed

export default httpServerHandler(server);


// Or use port-based routing for multiple servers

server.listen(8080);

export default httpServerHandler({ port: 8080 });


```

The handler automatically routes incoming Worker requests to your Node.js server. When using port-based routing, the port number acts as a routing key to determine which server handles requests, allowing multiple servers to coexist in the same Worker.

### handleAsNodeRequest

For more direct control over request routing, you can use the `handleAsNodeRequest` function from `cloudflare:node`. This function directly routes a Worker request to a Node.js server running on a specific port:

JavaScript

```

import { createServer } from "node:http";

import { handleAsNodeRequest } from "cloudflare:node";


const server = createServer((req, res) => {

  res.writeHead(200, { "Content-Type": "text/plain" });

  res.end("Hello from Node.js HTTP server!");

});


server.listen(8080);


export default {

  fetch(request) {

    return handleAsNodeRequest(8080, request);

  },

};


```

This approach gives you full control over the fetch handler while still leveraging Node.js HTTP servers for request processing.

Note

Failing to call `close()` on an HTTP server may result [CONTENT TRIMMED DUE TO SIZE]

import { get, IncomingMessage } from "node:http";

import { ok, strictEqual } from "node:assert";


export default {

  async fetch() {

    // ...

    get("http://example.org", (res) => {

      ok(res instanceof IncomingMessage);

    });

    // ...

  },

};


```

The Workers implementation includes a `cloudflare` property on `IncomingMessage` objects:

JavaScript

```

import { createServer } from "node:http";

import { httpServerHandler } from "cloudflare:node";


const server = createServer((req, res) => {

  console.log(req.cloudflare.cf.country);

  console.log(req.cloudflare.cf.ray);

  res.write("Hello, World!");

  res.end();

});


server.listen(8080);


export default httpServerHandler({ port: 8080 });


```

The `cloudflare.cf` property contains [Cloudflare-specific request properties](/workers/runtime-apis/request/#incomingrequestcfproperties).

The following differences exist between the Workers implementation and Node.js:

* Trailer headers are not supported
* The `socket` attribute **does not extend from `net.Socket`** and only contains the following properties: `encrypted`, `remoteFamily`, `remoteAddress`, `remotePort`, `localAddress`, `localPort`, and `destroy()` method.
* The following `socket` attributes behave differently than their Node.js counterparts:  
   * `remoteAddress` will return `127.0.0.1` when ran locally  
   * `remotePort` will return a random port number between 2^15 and 2^16  
   * `localAddress` will return the value of request's `h [CONTENT TRIMMED DUE TO SIZE]
## Compatibility flags

### Client-side methods

To use the HTTP client-side methods (`http.get`, `http.request`, etc.), you must enable the [enable\_nodejs\_http\_modules](/workers/configuration/compatibility-flags/) compatibility flag in addition to the [nodejs\_compat](/workers/runtime-apis/nodejs/) flag.

This flag is automatically enabled for Workers using a [compatibility date](/workers/configuration/compatibility-dates/) of `2025-08-15` or later when `nodejs_compat` is enabled. For Workers using an earlier compatibility date, you can manually enable it by adding the flag to your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-6874)
* [  wrangler.toml ](#tab-panel-6875)

```

{

  "compatibility_flags": [

    "nodejs_compat",

    "enable_nodejs_http_modules"

  ]

}


```

```

compatibility_flags = [ "nodejs_compat", "enable_nodejs_http_modules" ]


```

### Server-side methods

To use the HTTP server-side methods (`http.createServer`, `http.Server`, `http.ServerResponse`), you must enable the `enable_nodejs_http_server_modules` compatibility flag in addition to the [nodejs\_compat](/workers/runtime-apis/nodejs/) flag.

This flag is automatically enabled for Workers using a [compatibility date](/workers/configuration/compatibility-dates/) of `2025-09-01` or later when `nodejs_compat` is enabled. For Workers using an earlier compatibility date, you can manually enable it by adding the flag to your Wrangler configuration file:

* [  wrangler.jsonc ](#tab [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/configuration/compatibility-flags/</url>
<title></title>
<text>
pported process properties are implemented where possible, with undefined exports for unsupported features. See the [process documentation](/workers/runtime-apis/nodejs/process/) for Workers-specific implementation details.

### Enable Node.js HTTP server modules

| **Default as of**   | 2025-09-01                             |
| ------------------- | -------------------------------------- |
| **Flag to enable**  | enable\_nodejs\_http\_server\_modules  |
| **Flag to disable** | disable\_nodejs\_http\_server\_modules |

The `enable_nodejs_http_server_modules` flag enables the availability of Node.js HTTP server modules such as `node:_http_server` in Workers.

The `disable_nodejs_http_server_modules` flag disables the availability of these server modules.

This enables compatibility with Node.js libraries and existing code that use the standard Node.js HTTP server APIs. The available functionality includes:

* `http.createServer()` for creating HTTP servers
* `http.Server` class for server instances
* `http.ServerResponse` for handling server responses

This flag must be used in combination with the `enable_nodejs_http_modules` flag to enable full features of `node:http`.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-01 or later when `nodejs_compat` is enabled.

See the [Node.js documentation ↗](https://nodejs.org/docs/latest/api/http.html) for more details about the Node.js HTTP APIs.

### Enable availability of `node:http` and `node:ht [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/sandbox/api/ports/</url>
<title></title>
<text>

const response = await sandbox.exposePort(port: number, options: ExposePortOptions): Promise<ExposePortResponse>


```

**Parameters**:

* `port` \- Port number to expose (1024-65535)
* `options`:  
   * `hostname` \- Your Worker's domain name (e.g., `'example.com'`). Required to construct preview URLs with wildcard subdomains like `https://8080-sandbox-abc123token.example.com`. Cannot be a `.workers.dev` domain as it doesn't support wildcard DNS patterns.  
   * `name` \- Friendly name for the port (optional)  
   * `token` \- Custom token for the preview URL (optional). Must be 1-16 characters containing only lowercase letters (a-z), numbers (0-9), hyphens (-), and underscores (\_). If not provided, a random 16-character token is generated automatically.

**Returns**: `Promise<ExposePortResponse>` with `port`, `url` (preview URL), `name`

* [  JavaScript ](#tab-panel-3472)
* [  TypeScript ](#tab-panel-3473)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Basic usage with auto-generated token

await sandbox.startProcess("python -m http.server 8000");

const exposed = await sandbox.exposePort(8000, { hostname });


console.log("Available at:", exposed.url);

// https://8000-sandbox-id-abc123random.yourdomain.com


// With custom token for stable URLs across restarts

const stable = await sandbox.exposePort(8080, {

  hostname,

  token: "my_service_v1", // 1-16 chars: a-z, 0-9, _

});

console.log("Stable URL:", stable.url) [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
```

---

## Assistant (Plan · claude-opus-4-5 · 7.3s)

Now I have all the information needed. Let me also verify how to configure custom domains:

**Tool: cloudflare-docs_search_cloudflare_documentation**

**Input:**
```json
{
  "query": "Workers custom domain DNS configuration routes"
}
```

**Output:**
```
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/configuration/routing/custom-domains/</url>
<title></title>
<text>
---
title: Custom Domains
description: Custom Domains allow you to connect your Worker to a domain or subdomain, without having to make changes to your DNS settings or perform any certificate management. After you set up a Custom Domain for your Worker, Cloudflare will create DNS records and issue necessary certificates on your behalf. The created DNS records will point directly to your Worker. Unlike Routes, Custom Domains point all paths of a domain or subdomain to your Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

  
## Was this helpful?

  
[ Edit](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/configuration/routing/custom-domains.mdx) [ Issue](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Custom Domains

## Background

Custom Domains allow you to connect your Worker to a domain or subdomain, without having to make changes to your DNS settings or perform any certificate management. After you set up a Custom Domain for your Worker, Cloudflare will create DNS records and issue necessary certificates on your behalf. The created DNS records will point directly to your Worker. Unlike [Routes](/workers/configuration/routing/routes/#set-up-a-route), Custom Domains point all paths of a domain or subdomain to your Worker.

Custom Domains are routes to a domain or subdomain (such as `example.com` or `shop.example.com`) within a Cloudflare zone wher [CONTENT TRIMMED DUE TO SIZE]
Worker. Unlike [Routes](/workers/configuration/routing/routes/#set-up-a-route), Custom Domains point all paths of a domain or subdomain to your Worker.

Custom Domains are routes to a domain or subdomain (such as `example.com` or `shop.example.com`) within a Cloudflare zone where the Worker is the origin.

Custom Domains are recommended if you want to connect your Worker to the Internet and do not have an application server that you want to always communicate with. If you do have external dependencies, you can create a `Request` object with the target URI, and use `fetch()` to reach out.

Custom Domains can stack on top of each other. For example, if you have Worker A attached to `app.example.com` and Worker B attached to `api.example.com`, Worker A can call `fetch()` on `api.example.com` and invoke Worker B.

![Custom Domains can stack on top of each other, like any external dependencies](/_astro/custom-domains-subrequest.C6c84jN5_Z1TXNWy.webp) 

Custom Domains can also be invoked within the same zone via `fetch()`, unlike Routes.

## Add a Custom Domain

To add a Custom Domain, you must have:

1. An [active Cloudflare zone](/dns/zone-setups/).
2. A Worker to invoke.

Custom Domains can be attached to your Worker via the Cloudflare dashboard, [Wrangler](/workers/configuration/routing/custom-domains/#set-up-a-custom-domain-in-your-wrangler-configuration-file) or the [API](/api/resources/workers/subresources/domains/methods/list/).

W
Warning

You cannot create a Custom Domain on a hostname with an existing CNAME DNS record or on a zone you do not own.

### Set up a Custom Domain in the dashboard

To set up a Custom Domain in the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker.
3. Go to **Settings** \> **Domains & Routes** \> **Add** \> **Custom Domain**.
4. Enter the domain you want to configure for your Worker.
5. Select **Add Custom Domain**.

After you have added the domain or subdomain, Cloudflare will create a new DNS record for you. You can add multiple Custom Domains.

### Set up a Custom Domain in your Wrangler configuration file

To configure a Custom Domain in your [Wrangler configuration file](/workers/wrangler/configuration/), add the `custom_domain=true` option on each pattern under `routes`. For example, to configure a Custom Domain:

* [  wrangler.jsonc ](#tab-panel-6508)
* [  wrangler.toml ](#tab-panel-6509)

```


![Custom Domains follow standard DNS ordering and matching logic](/_astro/custom-domains-api-gateway.DmeJZDoL_2urk5W.webp) 

## Interaction with Routes

A Worker running on a Custom Domain is treated as an origin. Any Workers running on routes before your Custom Domain can optionally call the Worker registered on your Custom Domain by issuing `fetch(request)` with the incoming `Request` object. That means that you are able to set up Workers to run before a request gets to your Custom Domain Worker. In other words, you can chain together two Workers in the same request.

For example, consider the following workflow:

1. A Custom Domain for `api.example.com` points to your `api-worker` Worker.
2. A route added to `api.example.com/auth` points to your `auth-worker` Worker.
3. A request to `api.example.com/auth` will trigger your `auth-worker` Worker.
4. Using `fetch(request)` within the `auth-worker` Worker will invoke the `api-worker` Worker, as if it was a normal application server.

auth-worker

```

export default {

  fetch(request) {

    const url = new URL(request.url)

    if(url.searchParams.get("auth") !== "SECRET_TOKEN") {

      return new Response(null, { status: 401 })

    } else {

      // This will invoke `api-worker`

      return fetch(request)

    }

  }

}


```

## Certificates

Creating a Custom Domain will also generate an [Advanced Certificate](/ssl/edge-certificates/advanced-certificate-manager/) on your target zone for your target hostname.

T
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/configuration/routing/routes/</url>
<title></title>
<text>
Warning

Route setup will differ depending on if your application's origin is a Worker or not. If your Worker is your application's origin, use [Custom Domains](/workers/configuration/routing/custom-domains/).

If your Worker is not your application's origin, follow the instructions below to set up a route.

Note

Routes can also be created via the API. Refer to the [Workers Routes API documentation](/api/resources/workers/subresources/routes/methods/create/) for more information.

### Set up a route in the dashboard

Before you set up a route, make sure you have a DNS record set up for the [domain](/dns/manage-dns-records/how-to/create-zone-apex/) or [subdomain](/dns/manage-dns-records/how-to/create-subdomain/) you would like to route to.

To set up a route in the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker.
3. Go to **Settings** \> **Domains & Routes** \> **Add** \> **Route**.
4. Select the zone and enter the route pattern.
5. Select **Add route**.

### Set up a route in the Wrangler configuration file

Before you set up a route, make sure you have a DNS record set up for the [domain](/dns/manage-dns-records/how-to/create-zone-apex/) or [subdomain](/dns/manage-dns-records/how-to/create-subdomain/) you would like to route to.

To configure a route using your [Wrangler configuration file](/workers/wrangler/conf [CONTENT TRIMMED DUE TO SIZE]
Routes are a set of rules that evaluate against a request's URL. Routes are recommended for you if you have a designated application server you always need to communicate with. Calling `fetch()` on the incoming `Request` object will trigger a subrequest to your application server, as defined in the **DNS** settings of your Cloudflare zone.

Routes add Workers functionality to your existing proxied hostnames, in front of your application server. These allow your Workers to act as a proxy and perform any necessary work before reaching out to an application server behind Cloudflare.

![Routes work with your applications defined in Cloudflare DNS](/_astro/routes-diagram.CfGSi1RG_32rsQ.webp) 

Routes can `fetch()` Custom Domains and take precedence if configured on the same hostname. If you would like to run a logging Worker in front of your application, for example, you can create a Custom Domain on your application Worker for `app.example.com`, and create a Route for your logging Worker at `app.example.com/*`. Calling `fetch()` will invoke the application Worker on your Custom Domain. Note that Routes cannot be the target of a same-zone `fetch()` call.

## Set up a route

To add a route, you must have:

1. An [active Cloudflare zone](/dns/zone-setups/).
2. A Worker to invoke.
3. A DNS record set up for the [domain](/dns/manage-dns-records/how-to/create-zone-apex/) or [subdomain](/dns/manage-dns-records/how-to/create-subdomain/) proxied by Cloudflare (also known as orange-clouded [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/workers/configuration/routing/</url>
<title></title>
<text>
To allow a Worker to receive inbound HTTP requests, you must connect it to an external endpoint such that it can be accessed by the Internet.

There are three types of routes:

* [Custom Domains](/workers/configuration/routing/custom-domains): Routes to a domain or subdomain (such as `example.com` or `shop.example.com`) within a Cloudflare zone where the Worker is the origin.
* [Routes](/workers/configuration/routing/routes/): Routes that are set within a Cloudflare zone where your origin server, if you have one, is behind a Worker that the Worker can communicate with.
* [workers.dev](/workers/configuration/routing/workers-dev/): A `workers.dev` subdomain route is automatically created for each Worker to help you getting started quickly. You may choose to [disable](/workers/configuration/routing/workers-dev/) your `workers.dev` subdomain.

## What is best for me?

It's recommended to run production Workers on a [Workers route or custom domain](/workers/configuration/routing/), rather than on your `workers.dev` subdomain. Your `workers.dev` subdomain is treated as a [Free website ↗](https://www.cloudflare.com/plans/) and is intended for personal or hobby projects that aren't business-critical.

Custom Domains are recommended for use cases where your Worker is your application's origin server. Custom Domains can also be invoked within the same zone via `fetch()`, unlike Routes.

Routes are recommended for use cases where your application's origin server is external to Cloudflar [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/hostname-routing/</url>
<title></title>
<text>
* **Support both subdomains and vanity domains**: Handle `customer1.myplatform.com` (subdomain) and `shop.customer.com` (custom hostname) with the same routing logic.
* **Avoid route limits**: Instead of creating individual routes for every domain, which can cause you to hit [Routes limits](/workers/platform/limits/#number-of-routes-per-zone), you can handle the routing logic in code and proxy millions of domains to individual Workers.
* **Programmatically control routing logic**: Write custom code to route requests based on hostname, [custom metadata](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/), path, or any other properties.

Note

This will route all traffic inbound to the domain to the dispatch Worker.

If you'd like to exclude certain hostnames from routing to the dispatch Worker, you can either:

* Add routes without a Worker specification to opt certain hostnames or paths from being executed by the dispatcher Worker (for example, for `saas.com`, `api.saas.com`, etc)
* Use a [dedicated domain](/dns/zone-setups/subdomain-setup/) (for example, `customers.saas.com`) for custom hostname and dispatch worker management to keep the rest of the traffic for that domain separate.

### Setup

To set up hostname routing with a wildcard route:

1. **Configure custom hostnames**: Set up your domain and custom hostnames using [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/)
2. 
</text>
</result>
<result>
<url>https://developers.cloudflare.com/https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/get-started/hostname-routing/</url>
<title></title>
<text>
* **Support both subdomains and vanity domains**: Handle `customer1.myplatform.com` (subdomain) and `shop.customer.com` (custom hostname) with the same routing logic.
* **Avoid route limits**: Instead of creating individual routes for every domain, which can cause you to hit [Routes limits](/workers/platform/limits/#number-of-routes-per-zone), you can handle the routing logic in code and proxy millions of domains to individual Workers.
* **Programmatically control routing logic**: Write custom code to route requests based on hostname, [custom metadata](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/), path, or any other properties.

Note

This will route all traffic inbound to the domain to the dispatch Worker.

If you'd like to exclude certain hostnames from routing to the dispatch Worker, you can either:

* Add routes without a Worker specification to opt certain hostnames or paths from being executed by the dispatcher Worker (for example, for `saas.com`, `api.saas.com`, etc)
* Use a [dedicated domain](/dns/zone-setups/subdomain-setup/) (for example, `customers.saas.com`) for custom hostname and dispatch worker management to keep the rest of the traffic for that domain separate.

### Setup

To set up hostname routing with a wildcard route:

1. **Configure custom hostnames**: Set up your domain and custom hostnames using [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/)
2. 


### Orange-to-Orange (o2o) Behavior

When your customers are also using Cloudflare and point their custom domain to your SaaS domain via CNAME (for example, `mystore.com` → `saas.com`), Worker routing behavior depends on whether the customer's DNS record is proxied (orange cloud) or DNS-only (grey cloud). Learn more about [Orange-to-Orange setups](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/#with-o2o)

This can cause inconsistent behavior when using specific hostname routes:

* If you're routing based on the CNAME target (`saas.com`), the custom hostname's DNS record must be orange-clouded for the Worker to be invoked.
* If you're routing based on the custom hostname (`mystore.com`), the customer's record must be grey-clouded for the Worker to be invoked.

Since you may not have control over your customer's DNS proxy settings, we recommend using `*/*` wildcard route to ensure routing logic always works as expected, regardless of how DNS is configured.

#### Worker invocation across route configurations and proxy modes

The table below shows when Workers are invoked based on your route pattern and the customer's DNS proxy settings:

| Route Pattern         | Custom Hostname (Orange Cloud) | Custom Hostname (Grey Cloud) |
| --------------------- | ------------------------------ | ---------------------------- |
| \*/\* (Recommended)   | ✅                              | ✅                            |
| Target hostname route | ✅                      [CONTENT TRIMMED DUE TO SIZE]
</text>
</result>
```

---

## User

Let'

---

## Assistant (Plan · claude-opus-4-5 · 20.7s)

I have all the information needed to create a migration plan. Let me summarize:

---

## Migration Plan: gem.wtf from Heroku to Cloudflare Workers

### What We're Doing

**Path A (Workers-native)** - Running the Express app directly on Cloudflare Workers using `httpServerHandler`. No Docker needed.

### Files to Create

| File | Purpose |
|------|---------|
| `worker-entry.ts` | Worker entry point that wraps the Express app |
| `wrangler.jsonc` | Cloudflare Workers configuration |
| `tsconfig.json` | TypeScript config for the Worker |
| `.github/workflows/deploy.yml` | Auto-deploy on push to main |
| `MIGRATION-CHECKLIST.md` | Step-by-step cutover guide |

### Files to Modify

| File | Changes |
|------|---------|
| `package.json` | Add `wrangler`, `@cloudflare/workers-types`, TypeScript deps |
| `home.js` | Inline the CSS instead of serving from `node_modules` |
| `server.js` | Minor cleanup (HTTPS redirect is unnecessary on Cloudflare) |

### Code Changes Required

1. **Inline CSS in `home.js`** - Instead of `<link rel="stylesheet" href="/node_modules/...">`, we'll inline the ~31KB CSS directly into the HTML template. This eliminates the need for static file serving.

2. **Worker entry point** - Create `worker-entry.ts` that uses the port-based pattern:
   ```typescript
   import { httpServerHandler } from "cloudflare:node";
   import "./server.js";
   export default httpServerHandler({ port: 3000 });
   ```

3. **Remove static file serving** - The `express.static(__dirname)` line can be removed once CSS is inlined.

4. **Optional: Remove HTTPS redirect** - The `x-forwarded-proto` check is unnecessary since Cloudflare handles HTTPS automatically.

### Custom Domain Setup

Once the Worker is deployed, you'll need to:

1. **Add `gem.wtf` to Cloudflare** as a zone (if not already)
2. **Configure the custom domain** in `wrangler.jsonc`:
   ```jsonc
   "routes": [
     { "pattern": "gem.wtf/*", "custom_domain": true }
   ]
   ```
3. **Update nameservers** at your registrar to point to Cloudflare (if not already using Cloudflare DNS)

### GitHub Actions Setup

You'll need to add two secrets to your GitHub repository:
- `CLOUDFLARE_API_TOKEN` - Create at dash.cloudflare.com → API Tokens
- `CLOUDFLARE_ACCOUNT_ID` - Found in your Cloudflare dashboard sidebar

### Deployment Flow

```
Push to main → GitHub Action → npm ci → wrangler deploy → Live on Cloudflare
```

### Cutover Steps

1. Deploy to Cloudflare, verify on `gem-wtf.workers.dev`
2. Add custom domain `gem.wtf` to the Worker
3. Update DNS/nameservers to Cloudflare
4. Verify everything works
5. Decommission Heroku app

---

### Questions Before I Generate the Files

1. **Is `gem.wtf` already on Cloudflare DNS?** If not, you'll need to transfer the domain or add it as a zone. This affects whether we can use `custom_domain: true` in wrangler.jsonc immediately.

2. **Worker name preference?** I'll default to `gem-wtf` (hyphens are conventional for Workers). Sound good?

3. **Ready for me to generate the files?** I can create all the migration files and provide the step-by-step commands to deploy.

---

## User

Let's make the workers url gem-wtf.ziki.workers.dev

gem.wtf is not pointed at cloudflare yet

---

## Assistant (Plan · claude-opus-4-5 · 11.7s)

Got it. Worker name will be `gem-wtf` on your `ziki.workers.dev` subdomain, and we'll handle the custom domain setup separately after deployment.

---

## Final Migration Plan

### Files to Create

| File | Purpose |
|------|---------|
| `worker-entry.ts` | Worker entry point using `httpServerHandler({ port: 3000 })` |
| `wrangler.jsonc` | Config with `name: "gem-wtf"`, `nodejs_compat`, `compatibility_date: "2025-09-01"` |
| `tsconfig.json` | TypeScript config for Workers |
| `.github/workflows/deploy.yml` | Auto-deploy on push to main |
| `MIGRATION-CHECKLIST.md` | Step-by-step cutover guide |

### Files to Modify

| File | Changes |
|------|---------|
| `package.json` | Add devDependencies: `wrangler`, `@cloudflare/workers-types`, `typescript` |
| `home.js` | Inline the GitHub markdown CSS (~31KB) instead of serving from node_modules |
| `server.js` | Remove `express.static(__dirname)` (no longer needed once CSS is inlined) |

### Deployment Steps (after files are created)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

3. **Test locally**
   ```bash
   npx wrangler dev
   ```

4. **Deploy**
   ```bash
   npx wrangler deploy
   ```

5. **Verify at** `https://gem-wtf.ziki.workers.dev`

### GitHub Actions Setup

Add these secrets to your repo (Settings → Secrets → Actions):
- `CLOUDFLARE_API_TOKEN` - Create at [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) with "Edit Workers" permission
- `CLOUDFLARE_ACCOUNT_ID` - Found in your Cloudflare dashboard sidebar

### Custom Domain Setup (later)

Once you're ready to point `gem.wtf` to Cloudflare:

1. Add `gem.wtf` as a zone in Cloudflare dashboard
2. Update nameservers at your registrar to Cloudflare's
3. Add to `wrangler.jsonc`:
   ```jsonc
   "routes": [
     { "pattern": "gem.wtf/*", "custom_domain": true }
   ]
   ```
4. Redeploy with `npx wrangler deploy`
5. Enable Heroku maintenance mode, verify Cloudflare works, then decommission Heroku

---

Ready to generate the files when you give the go-ahead.

---

## User

Tell me what elements of @HEROKU_2_CLOUDFLARE_SKILL.md were helpful to you in planning this migration, versus things you already knew or researched independently.

---

## Assistant (Plan · claude-opus-4-5 · 32.6s)

Great question. Here's an honest breakdown:

## What the Skill Provided That Was Genuinely Helpful

### 1. **The Path A/B decision framework** (Section 3.5)
The eligibility checklist for Workers-native deployment was the most valuable part. I wouldn't have systematically checked for:
- Native addons (`sharp`, `bcrypt`, `better-sqlite3`, etc.)
- `child_process` usage
- WebSocket server patterns (`.on('upgrade'`)
- The explicit note that database drivers (`pg`, `mysql2`) are NOT blockers

Without this, I might have been overly cautious and defaulted to Containers.

### 2. **The port-based pattern for `httpServerHandler`** (Section 3.5a, lines 157-165)
This was critical:
```typescript
// For process.env.PORT || 3000, use the fallback value
export default httpServerHandler({ port: 3000 });
```
The skill clarified that the port is a "routing key, not a real network port" and that for apps with a fallback like `process.env.PORT || 3000`, you use the fallback value. I would have needed to research this.

### 3. **The file generation checklist for Path A** (lines 142-149)
Knowing to generate `worker-entry.ts`, `wrangler.jsonc`, `tsconfig.json`, and `.github/workflows/deploy.yml` — and explicitly NOT to generate Dockerfile, `.dockerignore`, or Container classes — kept the plan focused.

### 4. **Environment variable handling difference** (lines 184-187)
The note that Path A automatically exposes secrets as `process.env.*` without manual forwarding (unlike Path B's `envVars` property) was useful context I didn't know.

### 5. **The Heroku CLI discovery approach** (Section 3, Step 0)
The suggestion to check `git remote -v` for the Heroku app name and run `heroku config --app <name> --json` to check for environment variables was a good structured approach.

### 6. **Compatibility date requirement** (line 438)
The specific requirement for `compatibility_date >= "2025-09-01"` for the HTTP server modules to work automatically.

---

## What I Already Knew or Researched Independently

### 1. **How `httpServerHandler` works**
I searched Cloudflare docs to understand the API. The skill told me to use it, but I verified the exact syntax and behavior (port as routing key, server instance vs port object, etc.) from the docs.

### 2. **How `fs.readFileSync` works on Workers**
The skill didn't address this. I researched whether `fs.readFileSync` at module load time would work (it does — files are available in `/bundle`).

### 3. **Static asset handling options**
The skill didn't cover how to handle `express.static()` or CSS files. I independently identified options: inline the CSS, use a CDN, or use R2/Assets.

### 4. **Custom domain configuration**
The skill mentions custom domains briefly (line 414) but I researched the `custom_domain: true` route syntax and the requirement to have the domain as a Cloudflare zone.

### 5. **General Cloudflare Workers knowledge**
Things like `nodejs_compat`, `wrangler.jsonc` format, GitHub Actions secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`), and `wrangler dev` behavior — I knew these already.

### 6. **The HTTPS redirect being unnecessary**
The skill didn't mention this. I noticed the `x-forwarded-proto` check in `server.js` and knew Cloudflare handles HTTPS automatically.

---

## What the Skill Got Wrong or Was Missing

### 1. **Referenced templates that don't exist**
Lines like "Use `assets/templates/wrangler-workers-native.jsonc`" and "See `assets/examples/node-express-basic/`" point to files that aren't in this repo. I had to construct the files from the inline examples and my own knowledge.

### 2. **No guidance on static file serving**
For apps using `express.static()` to serve CSS/JS from `node_modules`, the skill doesn't address how to handle this on Workers. This was a gap I had to fill.

### 3. **The `observability` config**
The skill mentions this (line 461) but only in the context of Path B Containers. It's equally useful for Path A.

---

## Summary

The skill saved me time on:
- **Decision logic** (Path A vs B eligibility)
- **The specific `httpServerHandler` pattern** for Express apps with port fallbacks
- **Knowing what files to generate** (and what NOT to generate)
- **Heroku CLI commands** for discovery

I still needed independent research for:
- Static asset handling
- `fs` module behavior on Workers  
- Custom domain configuration details
- The HTTPS redirect cleanup

The skill is a good "expert checklist" that prevents mistakes (like accidentally using Containers when Workers-native works), but it assumes template files exist and doesn't cover every edge case (like static file serving).

---

