export const routes = {
  private: {
    Admin: '/admin',
    Product: '/admin/products',
    Categories: '/admin/categories',
    Payment: '/admin/payment',
    Logout: '/logout',
  },
  protected: {
    Login: '/auth/login',
    Register: '/auth/register',
    Logout: '/auth/logout',
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
