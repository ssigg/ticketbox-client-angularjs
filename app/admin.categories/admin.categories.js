'use strict';

angular.module('ticketbox.admin.categories', [
    'ticketbox.components.api',
    'ticketbox.components.itemlist',
    'ticketbox.config'])

    .directive('categories', function() {
        return {
            restrict: 'E',
            scope: { },
            controller: 'CategoriesCtrl',
            templateUrl: 'admin.categories/admin.categories.html'
        }
    })

    .controller('CategoriesCtrl', function($scope, Category, currency, itemListFactory) {
        $scope.currency = currency;

        var list = null;
        $scope.categories = Category.query(function() {
            list = itemListFactory(Category, $scope.categories);
        });

        $scope.save = function(category) {
            var categoryData = {
                'name': category.name,
                'price': category.price,
                'price_reduced': category.price_reduced
            };
            list.save(categoryData, category);
        }

        $scope.cancel = function() {
            list.cancel();
        }

        $scope.create = function() {
            var newCategory = {
                'name': '',
                'price': '',
                'price_reduced': ''
            };
            list.create(newCategory);
        }

        $scope.delete = function(category) {
            if (confirm("Delete category " + category.name + "?")) {
                list.delete(category);
            }
        }
    })
    
    .filter('isAnyCategoryTransient', function() {
        return function(categories) {
            if (categories === undefined) {
                return false;
            } else {
                return !_.some(categories, function(c) { return c.isTransient === true; })
            }
        }
    });