'use strict';

// Register `navbar` component, along with its associated controller and template
angular.module('navbar')
    .component('navbar', {
        templateUrl: 'shared/navbar/navbar.template.html',
        controller: function NavbarController($location) {
            this.appName = 'My Manager';

            //function to check current nav based on which active nav formatting done
            this.checkCurrentNav = function (nav) {
                return ($location.path() === nav);
            };
        }
    });