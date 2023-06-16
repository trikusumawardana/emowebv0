# emoweb
Still under development.

## Demo 
https://emowebv0-vsabvp2pdq-et.a.run.app/

## flow of creating the "emoweb" website
1. Creating the Model:
  - Create the desired model and save it in the model.json file.
  - To get more detailed information about the model creation process, you can refer to the following repository: https://github.com/masajeruk/train_fer2013.
2. Web Server Configuration:
  - Create the "nginx" folder
  - Inside the "nginx" folder, create or modify the default.conf file to configure the web server as needed.
3.Building the Docker Image:
  - Create or modify the Dockerfile, which contains instructions for building a Docker image.
  - Use the Dockerfile to build a Docker image that will run the "emoweb" website.
4. CI/CD Configuration:
  - Create or modify the cloudbuild.yaml file, which is a configuration file for a CI/CD tool (such as Google Cloud Build).
  - The cloudbuild.yaml file should include the necessary steps to build, test, and deploy the "emoweb" website.
5. Website Presentation:
  - Create or modify the index.html file to display the main page of the "emoweb" website.
  - Create or modify the script.js file to add application logic or user interactions.
  - Create or modify the style.css file to customize the visual appearance of the "emoweb" website.
6. Once the above steps are completed, the next step is to execute the defined CI/CD steps specified in the cloudbuild.yaml file to build, test, and deploy the "emoweb" website to the desired environment.

## Lisensi
This repository and the code within it are intended for academic use only.
