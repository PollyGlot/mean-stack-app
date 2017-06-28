var translationsEN = {
    ABOUT: 'About',
    HELLO: 'Hello',
    HEADLINE: 'Book online and never stand in the queue!',
    ORDER_BTN_HOME: 'Order Now',
};

var translationsRU = {
    ABOUT: 'О проекте',
    HELLO: 'Привет',
    HEADLINE: 'Бронируйте онлайн и больше никаких очередей!',
    ORDER_BTN_HOME: 'Закажите сейчас!',
};

var translationsFR = {
    ABOUT: 'A propos',
    HELLO: 'Salut',
    HEADLINE: "Réservez en ligne et pas plus de files d'attente",
    ORDER_BTN_HOME: 'Commande',
};

angular
    .module('translateCtrl', ['pascalprecht.translate'])
    .config(['$translateProvider', function ($translateProvider) {
        // add translation tables
        $translateProvider.translations('en', translationsEN);
        $translateProvider.translations('ru', translationsRU);
        $translateProvider.translations('fr', translationsFR);
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
    }])

    .controller('translateController', ['$translate', '$scope', function ($translate, $scope) {
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
    }]);
