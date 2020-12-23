// Function to Escape Regular Expressions
function escapeRegExp(string) {
return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Search & Filter Posts Middleware 
module.exports = (req, res, next) => {
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
