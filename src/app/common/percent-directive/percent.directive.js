export const PercentDirective = () => {
  return {
    template: '<span class="{{percentCtr.elementClass}}">{{percentCtr.percentValue}}</span>',
    restrict: 'EA',
    controller: 'percentController',
    controllerAs: 'percentCtr',
    scope: {
      floatValue: '<'
    }
  }
};

export const PercentController = () => {
  return ['$scope', function ($scope) {

    this.$onInit = () => {
      $scope.floatValue = null;
    };

    $scope.$watch('floatValue', () => {
      this.percentValue = makePercent($scope.floatValue);
    });

    const makePercent = (floatValue) => {
      if (dataInEmpty(floatValue)) {
        this.elementClass = 'empty';
        return 'Try me.';
      } else if (dataIsValid(floatValue)) {
        this.elementClass = 'valid';
        return parseFloat(floatValue) * 100 + '%'
      } else {
        this.elementClass = 'invalid';
        return 'Number is not valid.';
      }
    };

    const dataIsValid = (floatValue) => {
      return typeof floatValue !== 'undefined' && parseFloat(floatValue) <= 1 && parseFloat(floatValue) >= 0;
    }

    const dataInEmpty = (floatValue) => {
      return floatValue === null;
    }

  }]
};

export const PercentModule = angular
  .module('app.common.percent', [])
  .directive('percent', PercentDirective)
  .controller('percentController', PercentController())
  .name;
