pipeline {
    agent any

    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    stages {
        stage('Clean') {
            steps {
                // Clean the project
                sh 'mvn clean'
            }
        }

        stage('Compile') {
            steps {
                // Compile the project
                sh 'mvn compile'
            }
        }

        stage('Build') {
            steps {
                // Build the project (e.g., package or install)
                sh 'mvn package'  // or 'mvn install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests with Maven
                sh 'mvn test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Use the SonarQube scanner directly
                withSonarQubeEnv('sonarQube1') {
                    sh 'mvn sonar:sonar -Dsonar.host.url=http://192.168.224.130:9000'
                }
            }
        }

        stage('Deploy to Nexus') {
            steps {
                    sh 'mvn deploy -DskipTests'
            }
        }
    }
}
