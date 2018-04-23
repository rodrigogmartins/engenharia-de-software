window.onpageshow = function() {
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {
        message: 'Nossos os produtos são extraidos de pessoas que, nunca beberam e sempre fizeram dietas restritas, por isso temos os produtos mais puros.',
        timeout: 6000
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}