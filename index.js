const Core = require('@actions/core')
const { context } = require('@actions/github')

const Api = require('./src/api')

/**
 * Add the changelog to the release from current tag
 * This actions is for MercadoLibre
 *
 * @param {Api} api - Api instance
 * @param {string} tag - Current tag
 */
const boostrap = async (api, tag) => {

  try {
    const { releaseId, releaseBody = ''} = await api.getReleaseByTag(tag)
    const { body, name } = await api.getNotes(tag)

    const newBody = releaseBody ? releaseBody.concat('\n\n', body) : body

    const response = await api.updateRelease(releaseId, name, newBody)

    console.error(response.status, response.data)

    if (response.status >= 400) {
      Core.setFailed(response.data)
    } else {
      Core.setOutput('status', response.status)
      Core.setOutput('data', response.data)
    }

  } catch (e) {
    Core.setFailed(e.message)
    console.error(e)
  }
}


try {
  const token = Core.getInput('token')
  const repository = Core.getInput('repository')
  const org = Core.getInput('org')

  const api = new Api(token, repository, !!org)

  //  Core.getInput('version') || context.ref.replace('refs/tags/', '')
  const tag = context.ref.replace('refs/tags/', '')

  boostrap(api, tag)

} catch (error) {
  Core.setFailed(error.message)
}
