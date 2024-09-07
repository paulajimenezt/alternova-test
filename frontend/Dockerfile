# Use an image with Expo pre-installed
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/front

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port that Expo runs on (default: 19000)
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Start Expo server
CMD ["npm", "start"]