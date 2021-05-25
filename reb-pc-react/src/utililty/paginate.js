export function paginate(items, currentPage, paginate){
    let lastPost = currentPage * paginate;
    let firstPost = lastPost - paginate;
    return items.slice(firstPost,lastPost);
}