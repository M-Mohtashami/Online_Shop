export const routes = {
  private: {
    Admin: '/admin',
    Product: '/admin/products',
    Categories: '/admin/categories',
    Payment: '/admin/orders',
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
    SingleProduct: '/products/[name]',
    Category: '/products/category/[category]',
    Cart: '/cart',
    About: '/about',
    Contact: '/contact',
    Checkout: '/checkout',
    Payment: '/payment',
  },
};
