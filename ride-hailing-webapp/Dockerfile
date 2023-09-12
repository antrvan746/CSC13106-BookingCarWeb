FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json to working dir
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of application
COPY . .

# Copy the entrypoint script and make it executable
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# Expose the port of Nextjs
EXPOSE 8000

# Set the entrypoint to run the script
# ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]

