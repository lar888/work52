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
  image: 'https://picsum.photos/640/480?random=1',
  selected: false
}

export const SORT_BY_LIST: SelectOptionInterface[] = [
  { value: '', text: 'Default sorting' },
  { value: 'name', text: 'Name' },
  { value: 'category', text: 'Category' },
  { value: 'year', text: 'Year' },
  { value: 'tags', text: 'Tags' }
]

export const ORDER_LIST: SelectOptionInterface[] = [
  { value: 'asc', text: 'Ascending' },
  { value: 'desc', text: 'Descending' }
]

export const CATEGORY = [
  'Biophysics',
  'Biochemistry',
  'Electron Transfer',
  'Biology',
  'Bioenergetics'
]

export const YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015
]

export const TAGS = [
  'protein folding',
  'molecular dynamics',
  'simulation',
  'biophysics',
  'enzymes',
  'metabolism',
  'catalysis',
  'electron transport',
  'photosynthesis',
  'redox reactions',
  'genetics',
  'developmental biology',
  'gene regulation',
  'ATP',
  'proton gradient',
  'energy metabolism',
  'ion channels',
  'cryo-EM',
  'membrane proteins',
  'metabolomics',
  'disease biomarkers',
  'protein misfolding',
  'neurodegeneration',
  'lipids',
  'cancer',
  'respiration',
  'cytochrome',
  'quantum biology',
  'bioelectronics',
  'chloroplasts',
  'photophosphorylation',
  'protein interactions',
  'ligands',
  'binding affinity',
  'biomechanics',
  'cell motility',
  'biodiversity',
  'aging',
  'epigenetics',
  'stem cells',
  'biosensors',
  'structural biology',
  'energy conversion',
  'protein folding',
  'molecular dynamics',
  'simulation',
  'biophysics',
  'enzymes',
  'metabolism',
  'catalysis',
  'electron transport',
  'photosynthesis',
  'redox reactions',
  'genetics',
  'developmental biology',
  'gene regulation',
  'ATP',
  'proton gradient',
  'energy metabolism',
  'ion channels',
  'cryo-EM',
  'membrane proteins',
  'metabolomics',
  'disease biomarkers',
  'protein misfolding',
  'neurodegeneration',
  'lipids',
  'cancer',
  'respiration',
  'cytochrome',
  'quantum biology',
  'bioelectronics',
  'chloroplasts',
  'photophosphorylation',
  'protein interactions',
  'ligands',
  'binding affinity',
  'biomechanics',
  'cell motility',
  'biodiversity',
  'aging',
  'epigenetics',
  'stem cells',
  'biosensors',
  'structural biology',
  'energy conversion',
  'drug discovery',
  'nanomechanics',
  'quantum effects',
  'synthetic biology',
  'drug discovery',
  'nanomechanics',
  'quantum effects',
  'synthetic biology'
]
