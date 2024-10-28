pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Clone your GitHub repository
                git branch: 'MayssaBenTaghaline-5Arctic4-G4', url: 'https://github.com/yasminejerbi/5ARCTIC4-G4-pi.git'
            }
        }

        stage('Build Application') {
            steps {
                // Run Maven to compile and package the application
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Verify Build') {
            steps {
                // Verify that the JAR file is created
                sh 'ls -l target/*.jar'
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Check the logs for errors.'
        }
    }
}