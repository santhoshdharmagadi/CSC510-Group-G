export default class enterpriseService {
    constructor($http) {
        this.http = $http;
    }

    addCoins(coins, username) {
        return this.http.post('http://localhost:3000/enterprise/addCoins', {coins: coins, username: username});
    }

    updateCoinsPerHour(coinsPerHour, username) {
        return this.http.post('http://localhost:3000/enterprise/updateCoinsPerHour',
            {coinsPerHour: coinsPerHour, username: username});
    }
}


enterpriseService.$inject = ['$http'];