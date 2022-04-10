const router = useRouter()
const {
  query = 'all',
  categories = 'all',
  author = 'all',
  saves = 'all',
  sort = 'featured'
} = router.query
const filterSearch = ({
  page,
  categories,
  author,
  sort,
  min,
  max,
  searchQuery,
  saves
}) => {
  const path = router.pathname
  const { query } = router
  if (page) query.page = page
  if (searchQuery) query.searchQuery = searchQuery
  if (sort) query.sort = sort
  if (categories) query.categories = categories
  if (author) query.author = author
  if (saves) query.saves = saves
  if (min) query.min ? query.min : query.min === 0 ? 0 : min
  if (max) query.max ? query.max : query.max === 0 ? 0 : max
  router.push({
    pathname: path,
    query: query
  })
}
const categoryHandler = (e) => {
  filterSearch({ categories: e.target.value })
}
const pageHandler = (e, page) => {
  filterSearch({ page })
}
const authorHandler = (e) => {
  filterSearch({ author: e.target.value })
}
const sortHandler = (e) => {
  filterSearch({ sort: e.target.value })
}
const savesHandler = (e) => {
  filterSearch({ saves: e.target.value })
}

<div>
  <Search item>
    {posts.length === 0 ? 'No' : countPosts} Results
    {query !== 'all' && query !== '' && ' : ' + query}
    {categories !== 'all' && ' : ' + categories}
    {author !== 'all' && ' : ' + author}
    {saves !== 'all' && ' : saves ' + saves + ' & up'}
    {(query !== 'all' && query !== '') ||
      categories !== 'all' ||
      author !== 'all' ||
      saves !== 'all'
      ? (
        <Button onClick={() => router.push('/search')}>
          <CancelIcon />
        </Button>
      )
      : null}
  </Search>
  <Sort item>
    <Typography component="span" className={''}>
      Sort by
    </Typography>
    <Select value={sort} onChange={sortHandler}>
      <MenuItem value="featured">Featured</MenuItem>
      <MenuItem value="popular">Most Saved</MenuItem>
      <MenuItem value="newest">Newest Articles</MenuItem>
    </Select>
  </Sort>
  <Categories>
    <Box className={''}>
      <Typography>Categories</Typography>
      <Select fullWidth value={categories} onChange={categoryHandler}>
        <MenuItem value="all">All</MenuItem>
        {categories &&
          categories.map((categories) => (
            <MenuItem key={categories} value={categories}>
              {categories}
            </MenuItem>
          ))}
      </Select>
    </Box>
  </Categories>
  <Authors>
    <Box className={''}>
      <Typography>Authors</Typography>
      <Select value={author} onChange={authorHandler} fullWidth>
        <MenuItem value="all">All</MenuItem>
        {authors &&
          authors.map((author) => (
            <MenuItem key={author} value={author}>
              {author}
            </MenuItem>
          ))}
      </Select>
    </Box>
  </Authors>
</div>
