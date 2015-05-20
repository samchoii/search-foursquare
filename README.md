# — Angular JS App to search Foursquare for Venues

This project is a quick Angular starter project to query Foursquare for a venue given parameters
(keyword, client id, client secret, and locale).

Due to this being a JS project, OAUTH authentication was avoided (generally done server side).
Instead, an endpoint that requires your Foursquare client id and client secret will be used.
In order to avoid storing private data publicly, the search query will require users to enter
their client id and client secret as part of the request.

This project relies upon Bootstrap for styling and AngularJS for scripting.

keyword = the search query (i.e sushi)<br/>
client id = your app's foursquare client id<br/>
client secret = your app's foursquare client secret<br/>
locale = the geographic locale in which you want to limit the search (i.e 'LA,CA', 'SF,CA', 'NY,NY', 'Boston,MA')<br/>

Bootstrapping of the app was done with the help of https://github.com/angular/angular-seed.git

## Getting Started

To get you started you can simply clone the search-foursquare repository and install the dependencies:

### Prerequisites

You need git to clone the search-foursquare repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize the application. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).


### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
search-foursquare changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

