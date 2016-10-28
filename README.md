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