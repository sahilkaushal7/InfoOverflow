export const appUrls = {
  root: () => '/',
  blogs: () => '/blogs',
  user: () => '/user',
  login: () => '/login',
  signup: () => '/signup',
  questions: () => '/questions',
}

export const mainUrlsRoot = appUrls.root();

export const blogsUrlsRoot = appUrls.blogs();

export const blogsUrls = {
  createNewBlog: () => `${blogsUrlsRoot}/create`,
  myblogs: (blogId = ':id') => `${blogsUrlsRoot}/myblogs/${blogId}`,
  landing: () => blogsUrlsRoot
}

export const userUrlsRoot = appUrls.user();
export const userUrls = {
  profile: (userId = ':id') => `${userUrlsRoot}/${userId}`
}

export const loginUrlsRoot = appUrls.login();

export const signupUrlsRoot = appUrls.signup();

export const questionsUrlsRoot = appUrls.questions();

export const questionUrls = {
  questionDetails: (questionId = ':id') => `${questionsUrlsRoot}/details/${questionId}`,
  landing: () => questionsUrlsRoot
}

