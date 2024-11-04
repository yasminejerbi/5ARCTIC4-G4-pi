FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the host to the container
COPY target/Pi-0.0.1-SNAPSHOT.jar ./Pi-0.0.1-SNAPSHOT.jar

# Expose the port your Spring Boot app listens on (change if needed)
EXPOSE 9009

# Run the JAR file when the container starts
CMD ["java", "-jar", "Pi-0.0.1-SNAPSHOT.jar"]