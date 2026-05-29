export interface Constituent {
  constituentID: number
  role: string
  name: string
  constituentULAN_URL: string
  constituentWikidata_URL: string
  gender: string
}

export interface ArtTag {
  term: string
  AAT_URL: string
  Wikidata_URL: string
}

export interface Measurement {
  elementName: string
  elementDescription: string | null
  elementMeasurements: Record<string, number>
}

export interface DimensionParsed {
  element: string
  dimensionType: string
  dimension: number
}

export interface ArtObject {
  objectID: number
  isHighlight: boolean
  accessionNumber: string
  accessionYear: string
  isPublicDomain: boolean
  primaryImage: string
  primaryImageSmall: string
  additionalImages: string[]
  constituents: Constituent[] | null
  department: string
  objectName: string
  title: string
  culture: string
  period: string
  dynasty: string
  reign: string
  portfolio: string
  artistRole: string
  artistPrefix: string
  artistDisplayName: string
  artistDisplayBio: string
  artistSuffix: string
  artistAlphaSort: string
  artistNationality: string
  artistBeginDate: string
  artistEndDate: string
  artistGender: string
  artistWikidata_URL: string
  artistULAN_URL: string
  objectDate: string
  objectBeginDate: number
  objectEndDate: number
  medium: string
  dimensions: string
  dimensionsParsed: DimensionParsed[]
  measurements: Measurement[]
  creditLine: string
  geographyType: string
  city: string
  state: string
  county: string
  country: string
  region: string
  subregion: string
  locale: string
  locus: string
  excavation: string
  river: string
  classification: string
  rightsAndReproduction: string
  linkResource: string
  metadataDate: string
  repository: string
  objectURL: string
  tags: ArtTag[] | null
  objectWikidata_URL: string
  isTimelineWork: boolean
  GalleryNumber: string
  isOnView: boolean
}

export interface SearchResponse {
  total: number
  objectIDs: number[] | null
}

export interface DepartmentsResponse {
  departments: Department[]
}

export interface Department {
  departmentId: number
  displayName: string
}

export interface SearchParams {
  q: string
  isHighlight?: boolean
  title?: boolean
  departmentId?: number
  isOnView?: boolean
  artistOrCulture?: boolean
  medium?: string[]
  hasImages?: boolean
  geoLocation?: string[]
  dateBegin?: number
  dateEnd?: number
}

export interface ObjectsParams {
  departmentIds?: number[]
}

export interface ObjectsResponse {
  total: number
  objectIDs: number[] | null
}
