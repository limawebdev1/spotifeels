# service-users

Currently will be keeping things very lean.

## Needs of the service

* Authorize a spotify user
* Store user
* Fetch user

## Implementation

### Functions
* authorizeUser
* getUser

### Persistence Layer
* user item
hk, sk - userId, userId, auth info

### Testing

* Unit test persistence layer
* Unit test biz logic

## In progress

* Test persistence layers locally

## Next up

* Wire up a lambda f(x)

## Completed Things

* Spinning up dynamo on serverless and deploy
* Wrote persistence layer methods

## Stuff I think would be nice to do

* Figure out how to properly customize the lerna create template

## Learnings to extract into a blog or just save for keeps

* Wow it is a bigger pain in the ass than I thought to have a monorepo and have control over your serverless deployments
* Lol learned that serverless-webpack did not do what i thought it did - lol it bundles your functions and creates one JS file per Lambda function instead, with all the code needed by each Lambda, including npm dependencies, bundled up together and then zipped
* Re: unit testing dynamo - I think what ended up being the best solution is like - 
  * Can I use it with TypeScript
  * Can it read the schema from the serverless yml file
## Stuff I read/referenced

* https://www.gorillastack.com/blog/real-time-events/optimizing-your-lambda-cold-starts-with-serverless-webpack/#:~:text=By%20default%2C%20serverless%20generates%20one,up%20together%20and%20then%20zipped.
* https://dev.to/brachiwernick/lerna-webpack-serverless-4eef
* https://michael-timbs.medium.com/testing-dynamodb-offline-with-serverless-framework-4ed027bf9b5f