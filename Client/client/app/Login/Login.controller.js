'use strict';

import loginService from './login.service';

export default class loginCtrl {
    constructor($state, $q, loginService) {
        this.state = $state;
        this.$q = $q;
        this.loginService = loginService;
        this.isUser = true;
        this.signIn = {
            email: '',
            password: '',
            isUser: true
        };

        this.isSignIn = true;

        this.signUp = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            isUser: false
        };
    }

    $onInit() {
        console.log('Login is initialized');
    }

    submit() {
        if (this.isSignIn) {
            this.signIn.isUser = this.isUser;
            this.loginService.doLogin(this.signIn).then((response) => {
                return this.loginService.getDetails(this.signIn);
            }).then((response) => {
                if (this.signIn.isUser === true) {
                    this.state.go('user', {id: this.signIn.username, uDetails: response.data});
                } else {
                    this.state.go('enterprise', {id: this.signIn.username, eDetails: response.data});
                }
            }).catch((response) => {
                if (response.status === 404) {
                    this.errorMessage = 'Please check the username you have entered';
                } else if (response.status === 400) {
                    this.errorMessage = 'Please verify your password';
                }
                this.showError = true;
            });
        } else {
            this.signUp.isUser = this.isUser;
            this.loginService.doSignUp(this.signUp).then((response) => {
                return this.loginService.getDetails(this.signUp);
            }).then((response) => {
                if (this.signUp.isUser === true) {
                    console.log(response);
                    console.log('response');
                    this.state.go('user', {id: this.signUp.username, uDetails: response.data});
                } else {
                    this.state.go('enterprise', {id: this.signUp.username, eDetails: response.data});
                }
            }).catch((response) => {
                if (response.status === 404) {
                    this.errorMessage = 'Please check the username you have entered';
                } else if (response.status === 400) {
                    this.errorMessage = 'Please verify your password';
                }
                this.showError = true;
            });
        }
    }
}

loginCtrl.$inject = ['$state', '$q', 'loginService'];