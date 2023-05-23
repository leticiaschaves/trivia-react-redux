import MD5 from 'crypto-js/md5';
import Swal from 'sweetalert2';

export const getGravatar = (email) => {
  try {
    return `https://www.gravatar.com/avatar/${MD5(email)}`;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
};
