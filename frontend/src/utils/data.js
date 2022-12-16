// fetching Sanity data
export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id== '${userId}']`; // Sanity query, try to get all document (*) type = user and id ==user id
  return query;
}




// searchbar
export const searchQuery = (searchTerm) => {
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image{
      asset ->{
        url
      }
    },
    _id,
    destination,
    posted ->{
      _id, userName, image
    },
    save[]{
      _key,
      postedBy ->{
        _id, userName, image
      }
    },
  }`; //GROQ, with * to start to search before finish the term
  // in the {} is the data that we want to see, return as object
  return query
}


export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
  image{
    asset ->{
      url
    }
  },
  _id,
  destination,
  posted ->{
    _id, userName, image
  },
  save[]{
    _key,
    postedBy ->{
      _id, userName, image
    }
  },
}`;