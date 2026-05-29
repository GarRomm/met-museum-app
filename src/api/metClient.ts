import type {
  ArtObject,
  DepartmentsResponse,
  ObjectsParams,
  ObjectsResponse,
  SearchParams,
  SearchResponse,
} from '../types'

const BASE = '/api/met'

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erreur réseau : ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(path, window.location.origin)
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  }
  return url.toString()
}

export function fetchObjects(params?: ObjectsParams): Promise<ObjectsResponse> {
  const p: Record<string, string> = {}
  if (params?.metadataDate) p.metadataDate = params.metadataDate
  if (params?.departmentIds?.length) p.departmentIds = params.departmentIds.join('|')
  return get<ObjectsResponse>(buildUrl(`${BASE}/objects`, p))
}

export function fetchArtObject(objectID: number): Promise<ArtObject> {
  return get<ArtObject>(`${BASE}/objects/${objectID}`)
}

export function fetchDepartments(): Promise<DepartmentsResponse> {
  return get<DepartmentsResponse>(`${BASE}/departments`)
}


export function searchArtworks(params: SearchParams): Promise<SearchResponse> {
  const p: Record<string, string> = { q: params.q }
  if (params.isHighlight)                                         p.isHighlight = 'true'
  if (params.title)                                               p.title = 'true'
  if (params.tags)                                                p.tags = 'true'
  if (params.departmentId !== undefined)                          p.departmentId = String(params.departmentId)
  if (params.isOnView)                                            p.isOnView = 'true'
  if (params.artistOrCulture)                                     p.artistOrCulture = 'true'
  if (params.medium?.length)                                      p.medium = params.medium.join('|')
  if (params.hasImages)                                           p.hasImages = 'true'
  if (params.geoLocation?.length)                                 p.geoLocation = params.geoLocation.join('|')
  if (params.dateBegin !== undefined && params.dateEnd !== undefined) {
    p.dateBegin = String(params.dateBegin)
    p.dateEnd   = String(params.dateEnd)
  }
  return get<SearchResponse>(buildUrl(`${BASE}/search`, p))
}
