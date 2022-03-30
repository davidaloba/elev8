const router = useRouter()
const {
  query = 'all',
  category = 'all',
  author = 'all',
  likes = 'all',
  sort = 'featured'
} = router.query
const filterSearch = ({
  page,
  category,
  author,
  sort,
  min,
  max,
  searchQuery,
  likes
}) => {
  const path = router.pathname
  const { query } = router
  if (page) query.page = page
  if (searchQuery) query.searchQuery = searchQuery
  if (sort) query.sort = sort
  if (category) query.category = category
  if (author) query.author = author
  if (likes) query.likes = likes
  if (min) query.min ? query.min : query.min === 0 ? 0 : min
  if (max) query.max ? query.max : query.max === 0 ? 0 : max
  router.push({
    pathname: path,
    query: query
  })
}
const categoryHandler = (e) => {
  filterSearch({ category: e.target.value })
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
const likesHandler = (e) => {
  filterSearch({ likes: e.target.value })
}

          <div>
                <Search item>
                  {posts.length === 0 ? 'No' : countPosts} Results
                  {query !== 'all' && query !== '' && ' : ' + query}
                  {category !== 'all' && ' : ' + category}
                  {author !== 'all' && ' : ' + author}
                  {likes !== 'all' && ' : likes ' + likes + ' & up'}
                  {(query !== 'all' && query !== '') ||
                    category !== 'all' ||
                    author !== 'all' ||
                    likes !== 'all'
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
                      <MenuItem value="popular">Most Liked</MenuItem>
                      <MenuItem value="newest">Newest Articles</MenuItem>
                    </Select>
                </Sort>
                <Categories>
                  <Box className={''}>
                    <Typography>Categories</Typography>
                    <Select fullWidth value={category} onChange={categoryHandler}>
                      <MenuItem value="all">All</MenuItem>
                      {categories &&
                        categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
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
