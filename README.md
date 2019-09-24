# Express-MongoDB Starter Kit
This is a  boilerplate application for building RESTful APIs Microservice in Node.js using express and mongo DB mongoose in ES6 with code coverage and other developer tools

## Development Dependencies

### ES6 Support

**ESM** - Most of the commonly used ES6 [features](https://node.green/) are supported by Node version 10.15.3, ES6 module loading specifications are not yet a standard in the node version. ESM is a module loader that transforms es modules at run time instead of transpiling them.(Typically we use babel for command line transpiling ES6 code to ES5)

**Other option is to use Babel**

Babel-cli: Compile files from the command line using babel  
Babel-preset-es2015: Babel preset for all es2015 plugins.

Alert: Seeing some issue with Mocha when it is used without babel, this needs to be investigated

### Code Quality

**Code Formatting** - Code formatting is done using [Prettier](https://prettier.io/)  
**Pre-commit hooks** - [Husky](https://github.com/typicode/husky#readme) Ensures the code is formatted as per the development standard for every commit

### Code Instrumentation

[Istanbul](https://github.com/istanbuljs/nyc#readme) instruments your ES5 and ES2015+ JavaScript code with line counters, so that we can track how well your unit-tests exercise your codebase.The nyc command-line-client for Istanbul works well with most of the javascript frameworks.

### Documentation

jsdoc has been used for API documentation
To set this locally install jsdoc globally or as a dev dependency as part of the setup

`npm install -g jsdoc`

Run the following command to generate documentation for the code base
`yarn build-docs`
Run the following command to generate documentation for a single file (yourJavaScriptFile)

`jsdoc yourJavaScriptFile.js`

### Unit Testing

Chai and Mocha are used for writing unit test cases  
Assertion with Chai provides natural language assertions, expressive and readable style.

### Auto Server Restart

Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made.

### Debugging Via [Debug](https://www.npmjs.com/package/debug)

Instead of inserting and deleting console.log you can replace it with the debug function and just leave it there. You can then selectively debug portions of your code by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console

## Other Runtime Features

| Feature                                                           | Summary                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| API Parameter validation                                          | Schema based parameter validation is done using [@hapi/joi ](https://www.npmjs.com/package/@hapi/joi)                                                                                                                                                                                            |
| Security Via [Helmet](https://helmetjs.github.io/)                | Helmet helps secure Express apps by setting various HTTP headers.                                                                                                                                                                                                                                |
| CORs support Via [cors](https://github.com/expressjs/cors#readme) | middleware that can be used to enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options.                                                                                                                                                                   |
| HTTP Status Codes                                                 | Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code. It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code.                                                                                     |
| Env variables                                                     | Uses [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). Storing configuration in the environment separate from code                                      |
| Logging                                                           | Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports. A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels |
| Compression                                                       | Uses the [compression](https://github.com/expressjs/compression#readme) middleware to compress responses. deflate & gzip are supported                                                                                                                                                           |
| Http Errors                                                       | Uses [http-errors](https://github.com/jshttp/http-errors#readme) to create HTTP Errors                                                                                                                                                                                                           |
| Mongoose                                                          | Uses [Mongoose](https://mongoosejs.com/) for ODM ,Schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.                                                                            |

## Code Organization
<img width="663" alt="Screen Shot 2019-09-24 at 3 50 07 PM" src="https://user-images.githubusercontent.com/7260229/65556455-8d893500-dee4-11e9-926c-e32d2e2890b2.png">



## Getting Started

Pre requisites

1.  yarn
2.  mongo

#### 1. Clone Repo

#### 2. Install dependencies

`yarn`

#### 3. Setting up Environment variables

`NODE_ENV=development PORT=5000 JWT_SECRET=0a6b944d-d2fb-46fc-a85e-0295c986cd9f MONGO_HOST=mongodb://localhost/express-mongo-api MONGO_PORT=270171`

`cp config/env/.env.production .env`

#### 4. Start server

`yarn start`

#### 5. Running Tests

Run the test from command line using
`yarn test`

If uou are using vs code you can use either '_Test - Mocha All_ or _Test - Mocha Current File_' to run and debug the test cases.

#### 6. Code Coverage

`yarn coverage`

## Logging

#### API Logging

#### Error Logging

## Deployment

#### 1. Deployment configurations

cp .env.production .env

#### 2. Build(Required If using babel)

#### 3. Upload the Build folder(Required If using babel)

#### 4. Install Production dependencies

Use the following command to install the only the production dependencies

`yarn --production`

#### 5. Process manager to Run the services

In production we need to make sure your server is always up so you should ideally use any of the process manager recommended [here](http://expressjs.com/en/advanced/pm.html). [pm2](http://pm2.keymetrics.io/) is recommended as it has several useful features like it can be configured to auto-start your services if system is rebooted.

`pm2 start bin/www`

#### 6.Containerization
