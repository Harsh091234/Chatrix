export const getSender = (users, loggedUser) => {
  if (
    !users ||
    users.length < 2 ||
    !loggedUser ||
    !users[0] ||
    !users[1] ||
    !users[0]._id ||
    !users[1]._id
  )
    return "";
  return users[0]._id === loggedUser._id ? users[0].name : users[1].name;
};
