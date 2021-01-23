const axios = require('axios')

async function wtf (gemname) {
  const dataUrl = `https://rubygems.org/api/v1/gems/${gemname}.json`
  let dataRes

  try {
    dataRes = await axios.get(dataUrl)
  } catch (error) {
    console.log('error fetching gem metdata', dataUrl, error)
  }

  const data = dataRes && dataRes.data ? dataRes.data : {}

  const destinationUrl = data.source_code_uri || // hope it's a repo
    data.homepage_uri || // or a
    `https://rubygems.org/gems/${gemname}` // last resort

  return destinationUrl
}

module.exports = wtf
