window.onpageshow = function() { const snackbarContainer = document.querySelector('#demo-toast-example'); const data = { message: 'Nossos os produtos são extraidos de pessoas que, nunca beberam e sempre fizeram dietas restritas, por isso temos os produtos mais puros.', timeout: 6000 }; snackbarContainer.MaterialSnackbar.showSnackbar(data) };