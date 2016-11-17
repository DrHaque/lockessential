'use strict';

angular.module('myApp.informationManager', ['ngRoute', 'information.data'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/information', {
            templateUrl: 'information-manager/information-manager.html',
            controller: 'InformationManagerCtrl'
        });
    }])

    .controller('InformationManagerCtrl',
    ['InformationDataService', 'InfoDataClass',
        '$scope', '$http',
        function (InformationDataService, InfoDataClass, $scope, $http) {

            // $scope.test = 'Pulok'; // to check the unit testing functionality

            $scope.infoData = InformationDataService.query();

            $scope.getDetails = function (id) {
                $scope.details = InformationDataService.get({ id: id });
            };

            var testData = {
                account: "test",
                username: "test",
                password: "test",
                category: "test",
                email: "test@gmail",
                url: "test",
                description: "test"
            }
            $scope.newData = new InfoDataClass(testData);
            // $scope.newData = new InfoDataClass({});
            $scope.newData.category = 'Website'; // initialize as default category
            var pristineNewData = angular.copy($scope.newData);
            $scope.saveData = function (newData) {
                console.log(JSON.stringify(newData));
                $scope.newData = angular.copy(pristineNewData);
                $('#addInfoModal').modal('hide');

                var req = {
                    method: 'POST',
                    url: '/info',
                    data: newData
                }
                console.log(req);
                $http(req).then(function (res) {
                    console.log(res);
                });
            }
        }
    ]
    );
//TODO: add post method for saving user input form
//TODO: add ajax button to save button
//TODO: add validation formatting and error messages
//TODO: Update the current modal using angular UI Bootstrap modal 
