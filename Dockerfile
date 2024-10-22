FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/Pi-0.0.1-SNAPSHOT.jar /app

CMD ["java", "-jar", "Pi-0.0.1-SNAPSHOT.jar"]