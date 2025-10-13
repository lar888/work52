import { MdRefresh } from 'react-icons/md'
import SelectField from '../form/SelectField'
import { ORDER_LIST, SORT_BY_LIST } from '../../data/mockDataPosts'
import type { RefObject } from 'react'

interface PostsFilterProps {
  inputRef: RefObject<HTMLInputElement | null>
  sort: string
  order: string
  debouncedSetName: (value: string) => void
  setSort: (value: string) => void
  setOrder: (value: string) => void
  resetFilters: () => void
}

const PostsFilter = ({
  inputRef,
  sort,
  order,
  debouncedSetName,
  setSort,
  setOrder,
  resetFilters
}: PostsFilterProps) => {
  return (
    <div className="posts-filter">
      <div className="form-group">
        <label className="form-label" htmlFor="filter">
          Filter by name
        </label>
        <input
          className="form-control"
          ref={inputRef}
          id="filter"
          type="text"
          placeholder="Filter posts by name..."
          onChange={(e) => debouncedSetName(e.target.value)}
        />
      </div>
      <SelectField
        id="sort"
        value={sort}
        label="Sort by"
        options={SORT_BY_LIST}
        onChangeSelect={(e) => setSort(e.target.value)}
      />
      <SelectField
        id="order"
        value={order}
        label="Order"
        options={ORDER_LIST}
        onChangeSelect={(e) => setOrder(e.target.value)}
      />
      <button onClick={resetFilters}>
        <MdRefresh />
      </button>
    </div>
  )
}

export default PostsFilter
