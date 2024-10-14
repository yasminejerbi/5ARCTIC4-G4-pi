pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning the code'
                checkout scm
            }
        }

        stage('Maven Compile') {
            steps {
                echo 'Compiling the code'
                sh 'mvn clean compile'
            }
        }

        stage('Tests') {
            steps {
                echo 'Running tests'
                sh 'mvn test'
            }
        }

        stage('Code Coverage with Jacoco') {
            steps {
                echo 'Running Jacoco for code coverage'
                sh 'mvn jacoco:report'
            }
        }

        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarScanner'  // SonarScanner tool configured in Jenkins
            }
            steps {
                withSonarQubeEnv('SonarQubeServer') { // SonarQube server configured in Jenkins
                    withCredentials([string(credentialsId: 'sonarqube-credential', variable: 'SONAR_TOKEN')]) {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=5ARCTIC4-G4-pi \
                            -Dsonar.sources=src \
                            -Dsonar.host.url=http://192.168.118.147:9000 \
                            -Dsonar.login=$SONAR_TOKEN \
                            -Dsonar.java.binaries=target/classes
                        """
                    }
                }
            }
        }
    }
       post {
            always {
                // Archive the JaCoCo report and other artifacts for inspection
                archiveArtifacts artifacts: '*/target/site/jacoco/*', allowEmptyArchive: true
            }
            }
}
