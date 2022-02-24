const { Octokit } = require('@octokit/core')

/**
 * @class Api
 */
module.exports = class Api {
  /**
   * Generate API to get Data
   *
   * @param {any} auth - Auth method
   * @param {string} repo - Repository in format username/repo-name
   * @returns {Promise<{data: object}>} - Fetch response
   */
  constructor(auth, repo) {
    this.octokit = new Octokit({ auth })
    this._repo = repo
    this._base = 'repos'
  }

  /**
   * Get release by tag
   *
   * @param {string} tag - tag
   * @returns {Promise<{data: { releaseId }}>} - Fetch response
   */
  async getReleaseByTag(tag) {
    const {
      data: { id: releaseId, body: releaseBody }
    } = await this.octokit.request('GET /:base/:repo/releases/tags/:tag', {
      base: this._base,
      repo: this._repo,
      tag: tag
    })

    return { releaseId, releaseBody }
  }

  /**
   * Update release by ID
   *
   * @param {string} release_id - id of release
   * @param {string} name - new release name
   * @param {string} body - new release body
   * @returns {Promise<{data: object}>} - Fetch response
   */
  async updateRelease(release_id, name, body) {
    return await this.octokit.request('PATCH /:base/:repo/releases/:release_id', {
      base: this._base,
      repo: this._repo,
      release_id: release_id,
      name: name,
      body: body
    })
  }

  /**
   * Generate content from a release
   *
   * @param {string} tag_name - current tag name
   * @returns {Promise<{data: { name, body }}>} - Fetch response
   */
  async getNotes(tag_name) {
    const {
      data: { name, body }
    } = await this.octokit.request(
      'POST /:base/:repo/releases/generate-notes',
      {
        base: this._base,
        repo: this._repo,
        tag_name: tag_name
      }
    )

    return { name, body }
  }

}
