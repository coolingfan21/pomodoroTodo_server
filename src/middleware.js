export const isAuthenticated = request => {
  console.log("request.header in middleware : ", request.header);
  if (!request.user) {
    throw Error("You need to log....");
  }
  return;
};
