import md5 from 'crypto-js/md5';
import Swal from 'sweetalert2';

export const getGravatar = async (email) => {
  try {
    const hash = md5(email).toString();
    const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    return response.url;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
};
