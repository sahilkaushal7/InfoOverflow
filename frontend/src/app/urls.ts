export const appUrls = {
  root: () => '/',
  blogs: () => '/blogs',
  user: () => '/user',
  login: () => '/login',
  signup: () => '/signup',
}

export const mainUrlsRoot = appUrls.root();

export const blogsUrlsRoot = appUrls.blogs();

export const blogsUrls = {
  myblogs: (blogId = ':id') => `${blogsUrlsRoot}/myblogs/${blogId}`,
  landing: () => blogsUrlsRoot
}

export const userUrlsRoot = appUrls.user();
export const userUrls = {
  profile: (userId = ':id') => `${userUrlsRoot}/${userId}`
}

export const loginUrlsRoot = appUrls.login();

export const signupUrlsRoot = appUrls.signup();


