# Ticketbox customer interface client

[![Build Status](https://travis-ci.org/ssigg/ticketbox-client-angularjs.svg?branch=master)](https://travis-ci.org/ssigg/ticketbox-client-angularjs) [![Code Climate](https://codeclimate.com/github/ssigg/ticketbox-customer-client-angularjs/badges/gpa.svg)](https://codeclimate.com/github/ssigg/ticketbox-customer-client-angularjs) [![Test Coverage](https://codeclimate.com/github/ssigg/ticketbox-customer-client-angularjs/badges/coverage.svg)](https://codeclimate.com/github/ssigg/ticketbox-customer-client-angularjs/coverage)

## Server
Use this web client together with the server available at https://github.com/ssigg/ticketbox-server-php

## Available interfaces
* `/customer`: Customer interface available to all visitors.
* `/boxoffice`: Box office or ticket agency interface.
* `/admin`: Administration interface.


## Installation
* Copy `customer/customer.config/config_sample.js` to `customer/customer.config/config.js` and adjust the values
* Copy `boxoffice/boxoffice.config/config_sample.js` to `boxoffice/boxoffice.config/config.js` and adjust the values
* Copy `admin/admin.config/config_sample.js` to `app/admin.config/config.js` and adjust the values
