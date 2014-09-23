'use strict';

require('../../app');
var angular = require('angular');

angular.module('deckApp')
  .controller('ServerGroupLoadBalancersCtrl', function($scope, _) {

    var populateRegionalLoadBalancers = function() {
      $scope.regionalLoadBalancers  = _($scope.loadBalancers)
        .pluck('accounts')
        .flatten(true)
        .filter({'name': $scope.command.credentials})
        .pluck('regions')
        .flatten(true)
        .filter({'name': $scope.command.region})
        .pluck('loadBalancers')
        .flatten(true)
        .pluck('elb')
        .remove(undefined)
        .filter({'vpcid': $scope.command.vpcId})
        .pluck('loadBalancerName')
        .unique()
        .valueOf();
    };
    populateRegionalLoadBalancers();

    this.removeLoadBalancer = function(index) {
      $scope.command.loadBalancers.splice(index, 1);
    };

    this.addLoadBalancer = function() {
      if (!$scope.command.loadBalancers || !$scope.command.loadBalancers.length) {
        $scope.command.loadBalancers = [];
      }
      $scope.command.loadBalancers.push('');
    };

  });
