const Main = {
  target: process.env.NODE_ENV !== 'production' ? '' : '', //目标网站
  constant: {
    cookie: 'VUE_ELEMENT'
  },
  route: {
    login: '/'
  }
};

export default Main;
