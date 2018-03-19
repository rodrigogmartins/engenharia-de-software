window.onpageshow = function() {
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {
        message: 'Todos os produtos extraidos são de pessoas criadas em cativeiro exclusivamente para isso, ou seja, nunca beberam e sempre fizeram dietas restritas, com o objetivo de manter nossos produtos os mais saudáveis.',
        timeout: 6000
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}