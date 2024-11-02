pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Run npm install to install project dependencies
                    sh 'npm install'
                }
            }
        }

         /* stage('Start Application') {
            steps {
                script {
                    // Start the Angular application in the background
                    sh 'npm start'
                }
            }
        } */

          stage('Build') {
            steps {
                script {
                    // Build the Angular application
                    sh 'npm run build'  // Adjust as needed for your build configuration
                }
            }
        }
    }
}