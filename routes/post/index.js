const express = require('express');
const router = express.Router();
const Post = require('../../models/postModel');

// Function to Escape Regular Expressions
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Search & Filter Posts Middleware 
const searchAndFilterPosts = (req, res, next) => {
  // Pull keys from req.query (if there are any) & assign them to queryKeys variable as an array of String Values
  const queryKeys = Object.keys(req.query);

  // Check if queryKeys array has any values in it. 
  if (queryKeys.length) {
    // Initialize an empty array to store our dbQueries (objects) in
    const dbQueries = [];

    // Destructure all potential properties from req.query
    let { search } = req.query;

    if (search) {
      search = new RegExp(escapeRegExp(search), 'gi');
      dbQueries.push({
        $or: [{
          title: search
        },
        {
          caption: search
        },
        ]
      });
    }
  }
  res.locals.query = req.query;
  queryKeys.splice(queryKeys.indexOf('page'), 1);
  const delimiter = queryKeys.length ? '&' : '?';
  res.locals.paginateUrl = req.originalUrl.replace(/(\?|\&)page=\d+/g, '') + `${delimiter}page=`;
  next();
}

// Get All the Posts
router.get('/', searchAndFilterPosts, async (req, res) => {
  const { dbQuery } = res.locals;
  delete res.locals.dbQuery;
  let posts = await Post.paginate(dbQuery, {
    page: req.query.page || 1,
    limit: 10,
    sort: '-creationTime'
  });
  if (!posts.docs.length && res.locals.query) {
    console.log('No results match that query!');
  }
  return posts;
});

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    return post;
  } catch (err) {
    return err;
  }
});