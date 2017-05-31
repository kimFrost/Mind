'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('noerd.Tingstrom.Web', ['ngCookies'])
  /*.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
  }])*/
  /*
  .config(['$cookiesProvider', function ($cookiesProvider) {
  $cookiesProvider.defaults = { expires: new Date() };
  }])
  */
  .run(function () {
    //console.log('Main Application Run()');
  });
