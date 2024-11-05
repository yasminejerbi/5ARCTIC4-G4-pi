pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning the code'
                checkout scm
            }
        }

        // Backend build stages
        stage('Backend - Maven Compile') {
            steps {
                dir('Backend') {
                    echo 'Compiling the Backend code'
                    sh 'mvn clean compile'
                }
            }
        }

        stage('Backend - Tests') {
            steps {
                dir('Backend') {
                    echo 'Running Backend tests'
                    sh 'mvn test'
                }
            }
        }

        stage('Backend - Code Coverage with Jacoco') {
            steps {
                dir('Backend') {
                    echo 'Running Jacoco for Backend code coverage'
                    sh 'mvn jacoco:report'
                }
            }
        }

        stage('Backend - SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarScanner'  // SonarScanner tool configured in Jenkins
            }
            steps {
                dir('Backend') {
                    withSonarQubeEnv('SonarQubeServer') { // SonarQube server configured in Jenkins
                        withCredentials([string(credentialsId: 'sonarqube-credential', variable: 'SONAR_TOKEN')]) {
                            sh """
                                ${scannerHome}/bin/sonar-scanner \
                                -Dsonar.projectKey=5ARCTIC4-G4-pi-Backend \
                                -Dsonar.sources=src \
                                -Dsonar.host.url=http://192.168.118.147:9000 \
                                -Dsonar.login=$SONAR_TOKEN \
                                -Dsonar.java.binaries=ta
