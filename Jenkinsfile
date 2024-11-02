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

        stage('Run Tests') {
            steps {
                // Run tests with Maven
                sh 'mvn test'
            }
        }
    }
}
