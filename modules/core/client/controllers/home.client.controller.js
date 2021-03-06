(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['Authentication', '$uibModal', '$document'];
  function HomeController(Authentication, $uibModal, $document) {
    var vm = this;
    vm.authentication = Authentication;
    vm.isLoggedIn = function () {
      if (Authentication.user)
        return true;
      else
        return false;
    };

    // code to control video modal
    // pluker ref: https://plnkr.co/edit/refQWzOOsyLYwaoDwP5b?p=preview
    vm.animationsEnabled = true;
    vm.open = function (size, parentSelector, selectedModalTemplate) {
      selectedModalTemplate = selectedModalTemplate+ 'ModalContent.html';
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: selectedModalTemplate,
        controller: 'ModalInstanceCtrl',
        controllerAs: 'vm',
        size: size,
        appendTo: parentElem,
        resolve: {
        }
      });
    };
  }

} ());
