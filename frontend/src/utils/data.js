// fetching Sanity data
export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id== '${userId}']`; // Sanity query, try to get all document (*) type = user and id ==user id
  return query;
}