const routes = {
  private: {
    Admin: '/admin',
    Product: '/admin/products',
    Categories: '/admin/categories',
    Payment: '/payment',
    Logout: '/logout',
  },
  protected: {
    Login: '/login',
    Register: '/register',
  },
  public: {
    Home: '/',
    Products: '/products',
    SingleProduct: '/products/:id',
    Category: '/products/:category',
    Cart: '/cart',
    About: '/about',
    Contact: '/contact',
  },
};
