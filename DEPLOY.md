# Deployment

## Current state

- **Preview:** https://ravi-kothari.github.io/gotchaii-site/
- **Production (`gotchaii.com`): NOT cut over.** The domain still serves the old
  WordPress site at `148.72.2.227`.

Every push to `main` builds and deploys automatically via
`.github/workflows/deploy.yml`.

## Why there is no CNAME file yet

A `public/CNAME` file makes GitHub Pages redirect the `*.github.io` URL to the custom
domain. Until DNS actually points at GitHub, that would break the preview URL we rely on
while building. The CNAME is therefore added **as part of cutover, not before**.

## Cutover checklist (do not run piecemeal)

Cutover takes `gotchaii.com` away from WordPress. The old site becomes unreachable at that
domain the moment DNS propagates, so do this only when the Astro site is ready to be the
real site.

1. Confirm the Astro site is complete and signed off on the preview URL.
2. Confirm **`/menu` renders the real drinks menu** — a QR code pointing at
   `gotchaii.com/menu` may be in physical circulation on market signage. If it 404s after
   cutover, a printed artifact breaks and cannot be recalled.
3. Add `public/CNAME` containing `gotchaii.com`, commit, let the deploy finish.
4. Set the custom domain on the repo:
   `gh api -X PUT repos/ravi-kothari/gotchaii-site/pages -f cname=gotchaii.com`
5. At the DNS provider, replace the A records for the apex with GitHub Pages' addresses:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   and point `www` at `ravi-kothari.github.io`.
6. Wait for propagation, then enable **Enforce HTTPS** in repo Settings → Pages.
   The certificate cannot be issued until DNS resolves to GitHub, so this step always
   comes last.
7. Verify `gotchaii.com`, `gotchaii.com/menu`, and `www.gotchaii.com` all resolve over
   HTTPS before retiring the WordPress hosting.

Keep the WordPress host paid up until step 7 passes — it is the only rollback.
