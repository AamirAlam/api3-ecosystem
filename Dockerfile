# official Node runtime as a parent image
FROM node:18.16.0 AS BUILD_IMAGE

# base image
ARG APP_PATH=/ecosystem-app
WORKDIR ${APP_PATH}
USER root
COPY package.json ./
RUN yarn

# # final image 
FROM node:18.16.0 AS APP_IMAGE
ARG APP_PATH=/ecosystem-app
WORKDIR ${APP_PATH}
RUN mkdir -p $APP_PATH/node_modules
ENV ENV_FILE_PATH=/.env
COPY --from=BUILD_IMAGE $APP_PATH/node_modules ./node_modules
COPY . .

## Install Git
RUN apt-get -y update
RUN apt-get -y install git


## Set up global Git user
RUN git config --global user.email "aamiralam1991@gmail.com" && \
    git config --global user.name "Aamir Alam"

RUN yarn build

EXPOSE  3000 80



##development
CMD ["yarn", "dev"]

##production
## CMD ["node", ".output/server/index.mjs"]