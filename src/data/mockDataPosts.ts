import type { SelectOptionInterface } from '../types/Common'
import type { PostInterface } from '../types/Post.interface'

export const POST_CATEGORIES: SelectOptionInterface[] = [
  {
    value: 'Biophysics',
    text: 'Biophysics'
  },
  {
    value: 'Biochemistry',
    text: 'Biochemistry'
  },
  {
    value: 'Electron Transfer',
    text: 'Electron Transfer'
  },
  {
    value: 'Biology',
    text: 'Biology'
  },
  {
    value: 'Bioenergetics',
    text: 'Bioenergetics'
  }
]

export const INITIAL_POST: Partial<PostInterface> = {
  name: 'Molecular Dynamics of Protein Folding',
  description:
    'Computational simulations reveal new insights into folding pathways of small proteins.',
  category: 'Biophysics',
  tags: ['protein folding', 'molecular dynamics', 'simulation', 'biophysics'],
  year: 2023,
  image: 'https://picsum.photos/640/480?random=1'
}

export const SORT_BY_LIST: SelectOptionInterface[] = [
  { value: '', text: 'Default order' },
  { value: 'name', text: 'Name' },
  { value: 'category', text: 'Category' },
  { value: 'year', text: 'Year' }
]

export const ORDER_LIST: SelectOptionInterface[] = [
  { value: 'asc', text: 'Ascending' },
  { value: 'desc', text: 'Descending' }
]
