# contributors

This project iterates through your entire github organisation and builds a contributions page. Much like, https://contributors.chatwoot.com


### Usage

1. Fork this repo.
2. Add repository secrets `ORG` with your organisation name and `REPO_NAMES` with the list of your repositories you want to fetch contributions.
3. Set repository secret `CUSTOM_DOMAIN` to `true` if you are using a CNAME with gh-pages. If you are using default github url, set this to `false`.

For example, `ORG=chatwoot`, `REPO_NAMES=chatwoot,chatwoot-mobile-app,charts,docs` and `CUSTOM_DOMAIN=false`.
