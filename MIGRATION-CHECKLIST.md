# gem.wtf Migration Checklist: Heroku → Cloudflare Workers

## Completed

- [x] Rewrote app as a native Cloudflare Worker (removed Express dependency)
- [x] Deployed to https://gem-wtf.ziki.workers.dev
- [x] Verified homepage and gem redirects work

## GitHub Actions Setup

Add these secrets to your GitHub repo (Settings → Secrets → Actions):

- `CLOUDFLARE_API_TOKEN` — Create at https://dash.cloudflare.com/profile/api-tokens with "Edit Workers" permission
- `CLOUDFLARE_ACCOUNT_ID` — Found in your Cloudflare dashboard sidebar (Account ID)

Once configured, pushes to `main` will auto-deploy.

## Custom Domain Setup (gem.wtf)

1. **Add gem.wtf to Cloudflare**
   - Go to https://dash.cloudflare.com
   - Add Site → Enter "gem.wtf"
   - Follow the setup to change nameservers at your registrar

2. **Update wrangler.jsonc** to add custom domain:
   ```jsonc
   {
     // ... existing config ...
     "routes": [
       { "pattern": "gem.wtf/*", "custom_domain": true }
     ]
   }
   ```

3. **Redeploy**
   ```bash
   npm run deploy
   ```

4. **Verify** at https://gem.wtf

## Production Cutover

1. Update DNS at registrar to point to Cloudflare nameservers
2. Wait for DNS propagation (up to 48 hours, usually faster)
3. Verify https://gem.wtf works correctly
4. Decommission Heroku app

## Useful Commands

```bash
npm run dev      # Local development
npm run deploy   # Deploy to Cloudflare
npx wrangler tail  # Stream live logs
```

## What Changed

The app was rewritten from Express to a native Cloudflare Worker:

| Before (Heroku) | After (Cloudflare) |
|-----------------|-------------------|
| Express.js | Native Worker fetch handler |
| axios | Native fetch API |
| hubdown (markdown) | Simple inline markdown parser |
| github-markdown-css (npm) | Inlined CSS |
| ~500 dependencies | 3 dev dependencies |
| ~3.7 MB bundle | ~14 KB bundle |
