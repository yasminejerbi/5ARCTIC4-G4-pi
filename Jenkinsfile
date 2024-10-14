pipeline{
    agent any
    stages{
        stage('checkout'){
         steps{
           echo 'cloning the code'
                checkout scm
        }
       }
       stage('Maven Compile'){
        steps{
        echo 'compiling'
        sh 'mvn clean compile'
        }

        stage('Tests'){
            steps{
            echo 'testing'
            sh 'mvn test'
            }
        }

        stage('Code Coverage with Jacoco') {
            steps {
                echo 'Running Jacoco for code coverage..'
                sh 'mvn jacoco:report'
            }
        }
        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarScanner'  // Name given during Jenkins configuration
            }
            steps {
                withSonarQubeEnv('SonarQubeServer') { // Name of the SonarQube server
                    withCredentials([string(credentialsId: 'sonarqube-credential', variable: 'SONAR_TOKEN')]) {
                        sh '''
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=5ARCTIC4-G4-pi \
                            -Dsonar.sources=src \
                            -Dsonar.host.url=http://192.168.118.147:9000 \
                            -Dsonar.login=$SONAR_TOKEN \
                            -Dsonar.java.binaries=target/classes
                        '''
                    }
                }
            }
        }
    }
}