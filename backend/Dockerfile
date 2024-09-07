# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Expose the port your server is running on (default: 3000)
EXPOSE 3000

# Set the user to use when running this image
RUN touch /usr/src/app/sqlite.db && chown -R node /usr/src/app
USER node

# Command to start the application
CMD ["npm", "run", "dev"]