# Use the official Node.js image
FROM node:20

# Create and set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app 

# Copy package.json and package-lock.json
COPY package.json /usr/src/app/

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . /usr/src/app

# Build the TypeScript code
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "start"]