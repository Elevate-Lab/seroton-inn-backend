const postModel = require('../models/postModel');

exports.createPost = async (req, res) => {
  try {
    const post = new postModel({
      content: req.body.content,
      creationTime: req.body.creationTime,
      creatorEmail: req.body.creatorEmail,
      contentLink: req.body.contentLink,
      fileDetails: req.file,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    return res.status(400).send(`Error: ${err}`);
  }
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  await postModel.findByIdAndUpdate(id, req.body);
  res.redirect("/");
};

exports.getAllPost = async (req, res) => {
  const { dbQuery } = res.locals;
  delete res.locals.dbQuery;
  let posts = await postModel.paginate(dbQuery, {
    page: req.query.page || 1,
    limit: 10,
    sort: '-creationTime'
  });
  if (!posts.docs.length && res.locals.query) {
    console.log('No results match that query!');
  }
  res.json(posts);
}

exports.getSinglePost = async (req, res) => {
  try {
    let post = await postModel.findById(req.params.id);
    res.send({post});
  } catch (err) {
    return err;
  }
}