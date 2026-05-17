const DEFAULT_ALLOWED_HOSTS = ['amazonaws.com', 'cloudfront.net', 'freepik.com', 'unsplash.com']

const configuredAllowedHosts = (process.env.SANITY_URL_ALLOWED_TYPE ?? '')
  .split(',')
  .map((value: string) => value.trim().toLowerCase())
  .filter(Boolean)

const allowedImageHostSuffixes =
  configuredAllowedHosts.length > 0 ? configuredAllowedHosts : DEFAULT_ALLOWED_HOSTS

const matchAllowedUrlType = (host: string): boolean => {
  return allowedImageHostSuffixes.some((suffix) => {
    return host === suffix || host.endsWith(`.${suffix}`)
  })
}

export const imageValidator = (value: unknown): true | string => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return 'Image URL is required'
  }

  let parsed: URL

  try {
    parsed = new URL(value)
  } catch {
    return 'Image URL must be valid'
  }

  if (parsed.protocol !== 'https:') {
    return 'Image URL must use https'
  }

  if (!matchAllowedUrlType(parsed.hostname.toLowerCase())) {
    return `Image host must match one of: ${allowedImageHostSuffixes.join(', ')}`
  }

  return true
}
