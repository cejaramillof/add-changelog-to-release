# Add Changelog to Release

Add the changelog to the release from current tag

## Usage

### Inputs

### token

**Required** `String` Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### selected_repository_ids

### Outputs

### status

Response status code

### data

Response json payload

## Examples

### For personal repo

```YAML
name: Add Changelog to Release
on:
  push:
    tags:
      - '*'
jobs:
  add-changelog-to-release:
    runs-on: ubuntu-latest
    steps:
      - uses: cejaramillof/add-changelog-to-release@latest
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          keywords:
            - rc
            - test
```

## References

### References for repository

- [Get a repository public key](https://developer.github.com/v3/actions/secrets/#get-a-repository-public-key)
- [Get release by tagname](https://docs.github.com/es/rest/reference/releases#get-a-release-by-tag-name)
- [Generate a changelog](https://docs.github.com/es/rest/reference/releases#generate-release-notes-content-for-a-release)
- [Update a release](https://docs.github.com/es/rest/reference/releases#update-a-release)
