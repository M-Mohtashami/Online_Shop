import { CustomIcons } from '@/interfaces/inretfaces';
import { FaUser, FaLock, FaShoppingCart } from 'react-icons/fa';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

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
};
