# Utilisez une image de base contenant Java pour exécuter votre application Spring Boot
FROM openjdk:11-jre-slim

# Mettez à jour le répertoire de travail
WORKDIR /app

# Copiez le jar de votre application Spring Boot dans le conteneur
COPY target/Pi-0.0.1-SNAPSHOT.jar /app

# Exposez le port sur lequel votre application Spring Boot s'exécute
EXPOSE 9000

# Commande pour exécuter votre application Spring Boot lorsque le conteneur démarre
CMD ["java", "-jar", "Pi-0.0.1-SNAPSHOT.jar"]
