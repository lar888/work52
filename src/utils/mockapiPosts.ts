export const API_URL = 'https://68a8811fb00e02cbca668a1e.mockapi.io/posts'
export const API_URL_USERS = 'https://68a8811fb00e02cbca668a1e.mockapi.io/users'
export const API_ITEMS_PER_PAGE_LIMIT = 12
export const API_ITEMS_PER_PAGE_LIMIT_USERS = 6

export function createUrl(
  page: number | string,
  name: string,
  sort: string,
  order: string,
  limit: number | string = API_ITEMS_PER_PAGE_LIMIT
): string {
  const urlObject = new URL(API_URL)
  urlObject.searchParams.set('page', `${page}`)
  urlObject.searchParams.set('limit', `${limit}`)
  urlObject.searchParams.set('name', `${name}`)
  urlObject.searchParams.set('sortBy', `${sort}`)
  urlObject.searchParams.set('order', `${order}`)

  return urlObject.toString()
}
