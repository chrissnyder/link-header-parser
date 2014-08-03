module.exports = (rawLinkHeader) ->
  return false unless rawLinkHeader
  links = {}

  rawLinks = rawLinkHeader.split ','
  for rawLink in rawLinks
    [rawUrlString, rawAttributes...] = (piece.trim() for piece in rawLink.split(';'))
    urlString = rawUrlString.match(/^<(\S+)>/)[1]
    attributes = {}

    for rawAttribute in rawAttributes
      [match, attributeKey, attributeValue, index, input] = rawAttribute.match(/^(\w+)\*?=\"(.*)\"$/)

      if attributeKey is 'rel'
        rel = attributeValue
        links[rel] = url: urlString
      else
        attributes[attributeKey] = attributeValue

    links[rel][key] = value for key, value of attributes

  links
