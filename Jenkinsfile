pipeline {
    agent any

    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    stages {
        stage('Build') {
            steps {
                // Build the project
                sh 'mvn clean install'
            }
        }

        stage('Start Application') {
            steps {
                // Start the Spring application and keep it running
                sh 'mvn spring-boot:run'
            }
        }
    }
}
