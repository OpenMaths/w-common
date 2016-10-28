[![CircleCI](https://circleci.com/gh/OpenMaths/w-common/tree/master.svg?style=svg&circle-token=63306f31adb56905ae3662f2db1b85d3a9e0054f)](https://circleci.com/gh/OpenMaths/w-common/tree/master)

This repository contains shared assets for all our Web-based projects. It should serve as a guide and a place wherefrom to acquire business logic, configurations, scripts, etc in order to reuse within other projects.

## To Contribute

Please use yarn to manage dependencies:

    npm install yarn -g

Pull repo, then:

    yarn
    
    # Write tests
    # Cruft around
    # Write tests
    
    npm run compile:src && npm test
    
Finally push your changes upstream and create a Pull Request. Tests will run automatically through CircleCI.

### Notes

Use `"noUnusedParameters": true` in tsconfig only in production?
