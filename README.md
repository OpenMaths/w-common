[![CircleCI](https://circleci.com/gh/OpenMaths/w-common/tree/master.svg?style=svg&circle-token=63306f31adb56905ae3662f2db1b85d3a9e0054f)](https://circleci.com/gh/OpenMaths/w-common/tree/master)

This repository contains shared assets for all our Web-based projects. It should serve as a guide and a place wherefrom to acquire business logic, configurations, scripts, etc in order to reuse within other projects.

## To Contribute

Checkout a new branch, then:

    npm install
    
    # Write tests
    # Cruft around
    # Write tests
    
    ./bin/compile-src
    ./bin/test-src
    
Finally push your brunch upstream and create a Pull Request.

### Notes

Use `"noUnusedParameters": true` in tsconfig only in production?
