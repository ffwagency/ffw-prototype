#FFW Prototype Template

##Introduction
At FFW we recognize that digital products are interactive and dynamic. And as such, we believe that designing digital products should not be focused solely around the visual design and static mockups, but also the interaction design of the solution. In order to create optimal user experiences, we believe that neither showing nor telling is sufficient – you should be able to *feel* exactly how the user will experience the product. This is why we always advocate the use of actual working prototypes, designed directly in the browser which will give you the exact look and feel of the future digital product.

Creating prototypes allows us to test our every design assumption with actual people. It lets us test and iterate early and fix any imperfections in our experience as they become obvious. Furthermore, a great byproduct of designing dynamic prototypes is that, when we show them to internal stakeholders or developers, they make so much more sense than static wireframes or images. People can instantly see how the product is supposed to work and behave.

This repo holds our base template for all new prototypes by FFW designers. Use it to get off to a good start with your prototype. We're still working on the documentation, but below you'll find a quick start guide.

##Getting started

###Prerequisites:
The FFW prototype template has a few dependencies that you will need to install to use it. Don't worry, we're got all the link you need right here:   

* [Node.js](https://nodejs.org/en/) – The backbone of the framework. Node Package Manager takes care of installing all the dev dependencies,
* [Bower](http://bower.io/) – Bower manages all the front end packages and fetches them for, when we start a new project.
* [Gulp](http://gulpjs.com/) – Task manager and automation. Gulp is responsible for running all the small tasks like compiling SCSS and Twig templates, starting a web server and automatically reloading browsers.

###Starting a new project
So you got the prerequisites installed, and you're ready to get started? Great! Just follow the simple steps below: 


1. Download a copy of the framework

2. Open up the project folder in Terminal.

3. Navigate to the .npm folder:  
    
    ```
    cd .npm
    ``` 

3. Install all the required packages with Node Package Manager  
    
    ```
    npm install
    ``` 
4. Install all the Bower packages:  
    
    ```
    bower install
    ``` 

5. Initialize the project with Gulp:
    
    ```
    gulp - performs localhost, sass compile, template generation WITHOUT scss/js linters.
    ```
    ```
    gulp dev - performs localhost, sass compile, template generation, scss and javascript lint.
    ```
    ```
    gulp sass-prod - performs sass compile only WITHOUT sourcemaps.
    ```