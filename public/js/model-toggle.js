const modals = document.querySelectorAll('.modal');
const modal_open_buttons = document.querySelectorAll("button.modal-button");
const modal_close_buttons = document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');
const rootEl = document.documentElement;

if (modal_open_buttons.length > 0) {
  modal_open_buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target_id = button.dataset.target;
      const target_element = document.getElementById(target_id);

      //  add is-clipped to root element
      rootEl.classList.add("is-clipped");
      target_element.classList.add("is-active");
    });
  });
}

function closeModals() {
  rootEl.classList.remove('is-clipped');
  modals.forEach((modal) => modal.classList.remove('is-active'));
}

if (modal_close_buttons.length > 0) {
  modal_close_buttons.forEach((button) => {
    button.addEventListener('click', () => closeModals());
  });
}


document.addEventListener('keydown', function (event) {
  // TODO: do not use `keyCode` as it is deprecated
  if (event.keyCode === 27) {
    closeModals();
  }
});
