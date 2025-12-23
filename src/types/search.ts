export const DATASET_KEYS = [
  'dataset-01',
  'dataset-02',
  'dataset-03',
  'dataset-04',
  'dataset-05',
  'dataset-06',
  'dataset-07',
  'dataset-08',
  'dataset-09',
  'dataset-10',
  'dataset-11',
  'dataset-12',
] as const

export type DatasetKey = (typeof DATASET_KEYS)[number]

export type ViewMode = 'grid' | 'list'

export type SortKey = 'date_desc' | 'date_asc' | 'relevance'

export type ResultTabKey = 'all' | DatasetKey

export type SearchQueryState = {
  dataset?: DatasetKey
  q?: string
  tab?: ResultTabKey
  page?: number
  pageSize?: number
  sort?: SortKey
  view?: ViewMode
}

export function parseDatasetKey(value: unknown): DatasetKey | null {
  if (typeof value !== 'string') return null
  return (DATASET_KEYS as readonly string[]).includes(value) ? (value as DatasetKey) : null
}

export function isDatasetKey(v: unknown): v is DatasetKey {
  return (
    typeof v === 'string' &&
    [
      'dataset-01',
      'dataset-02',
      'dataset-03',
      'dataset-04',
      'dataset-05',
      'dataset-06',
      'dataset-07',
      'dataset-08',
      'dataset-09',
      'dataset-10',
      'dataset-11',
      'dataset-12',
    ].includes(v)
  )
}

export function parseString(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() ? v : undefined
}

export function parseNumber(v: unknown): number | undefined {
  if (typeof v !== 'string') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}
