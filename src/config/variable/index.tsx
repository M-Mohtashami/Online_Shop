import { CustomIcons } from '@/interfaces/inretfaces';
import { FaUser, FaLock, FaShoppingCart, FaCartPlus } from 'react-icons/fa';
import { BsArrowLeft, BsArrowRight, BsSearch } from 'react-icons/bs';
import { MdDelete, MdLogout } from 'react-icons/md';

export const icons: CustomIcons = {
  username: function (value) {
    return <FaUser className={value} />;
  },
  password: function (value) {
    return <FaLock className={value} />;
  },
  forward: function (value) {
    return <BsArrowLeft className={value} />;
  },
  backward: function (value) {
    return <BsArrowRight className={value} />;
  },
  cart: function (value) {
    return <FaShoppingCart className={value} />;
  },
  search: function (value) {
    return <BsSearch className={value} />;
  },
  addtocart: function (value) {
    return <FaCartPlus size={17} className={value} />;
  },
  deletefromcart: function (value) {
    return <MdDelete size={17} className={value} />;
  },
  logout: function (value) {
    return <MdLogout size={17} className={value} />;
  },
};

export const baseURL = 'http://localhost:8000/api';

export const thumbnails = 'http://localhost:8000/images/products/thumbnails/';
export const IMAGES = 'http://localhost:8000/images/products/images/';
export const CATEGORY_ICON = 'http://localhost:8000/images/categories/icons/';
