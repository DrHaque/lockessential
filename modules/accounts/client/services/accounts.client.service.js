// Accounts service used to communicate Accounts REST endpoints
(function () {
  'use strict';

  angular
    .module('accounts')
    .factory('AccountsService', AccountsService);

  AccountsService.$inject = ['$rootScope', '$resource', '$http', 'CryptoService', '$timeout', 'Notification'];

  function AccountsService($rootScope, $resource, $http, CryptoService, $timeout, Notification) {
    var resource = $resource('/api/accounts/:accountId', {
      accountId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    // store user's all account info in this service so that they are available whenever needed without repeated server call
    var accountsTempStorage = {
      data : [],
      isUpdated: false
    };

    var getCurrentUsersAccounts = function(){
      var url = '/api/users/current/accounts';
      return $http.get(url);
    };

    var updateAccountsTempStorage = function(){
      accountsTempStorage.isUpdated = false;
      getCurrentUsersAccounts()
        .then(function (res) {
          accountsTempStorage.data = res.data;
          accountsTempStorage.isUpdated = true;
          // broadcast to all listeners that new data available
          $rootScope.$broadcast('event:newDataAvailable', accountsTempStorage);
        });
    };

    var getAccountsTempStorage = function(){
      return accountsTempStorage;
    };

    // resource queries
    var getAllAccounts = function () {
      return resource.query();
    };

    var getSelectedAccount = function (selectedAccount) {
      return resource.get({ accountId: selectedAccount }, successCallBack, errorCallBack);
    };

    var updateSelectedAccount = function (selectedAccount) {
      accountsTempStorage.isUpdated = false;
      return resource.put({ accountId: selectedAccount }, successCallBack, errorCallBack);
    };

    var deleteSelectedAccount = function (selectedAccount) {
      accountsTempStorage.isUpdated = false;
      return resource.delete({ accountId: selectedAccount }, successCallBack, errorCallBack);
    };

    function successCallBack (data){
      return data;
    }
    
    function errorCallBack (error){
      return error;
    }

    var emailUserKey = function(key){
      return $http.post('/api/users/userkey/email', {key: key});
    };

    return {
      resource : resource,
      getAllAccounts: getAllAccounts,
      getSelectedAccount: getSelectedAccount,
      updateSelectedAccount: updateSelectedAccount,
      deleteSelectedAccount: deleteSelectedAccount,
      getCurrentUsersAccounts : getCurrentUsersAccounts,
      updateAccountsTempStorage : updateAccountsTempStorage,
      getAccountsTempStorage : getAccountsTempStorage,
      emailUserKey : emailUserKey
    };
  }
} ());
