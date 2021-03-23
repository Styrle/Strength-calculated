//https://sweetalert2.github.io/
import Swal from 'sweetalert2';
//Here we are using sweetalert2 examples in development to make sure that our data is loading correctly, the link above provides the source for this.
export const swalCreateForm = ({ title, placeholder, callback }) => {
  Swal.fire({
    title: title,
    input: 'text',
    inputAttributes: {
      placeholder: placeholder
    },
    showCancelButton: true,
    confirmButtonText: 'Create',
    showLoaderOnConfirm: true,
    preConfirm: result => {
      if (!result) {
        return Swal.showValidationMessage(`${placeholder} cannot be left empty.`);
      }
    },
  }).then(result => {
      if (result.value) {
        callback(result.value);
      }
  });
}

export const swalEditForm = ({ title, placeholder, value, callback }) => {
  Swal.fire({
    title: title,
    input: 'text',
    inputAttributes: {
      placeholder: placeholder
    },
    inputValue: value,
    showCancelButton: true,
    confirmButtonText: 'Update',
    showLoaderOnConfirm: true,
    preConfirm: result => {
      if (!result) {
        return Swal.showValidationMessage(`${placeholder} cannot be left empty.`);
      }
    },
  }).then(result => {
      if (result.value) {
        callback(result.value);
      }
  });
}

export const swalDeleteForm = ({ callback }) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
      if (result.value) {
        callback();
      }
  });
}
//This is what we use when data is not loaded
export const swalError = message => {
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: message,
    showConfirmButton: true
  });
}
//When data is correctly loaded we call this
export const swalSuccess = message => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 800
  });
}

export const swalInfo = message => {
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: message,
    showConfirmButton: true
  });
}
