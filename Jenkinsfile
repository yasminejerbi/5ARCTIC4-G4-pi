/*
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
        stage('Maven Deploy') {
            steps {
                echo 'Deploying the artifact to Nexus'
                sh 'mvn deploy -DskipTests'
            }
        }

    }
       post {
            always {
                // Archive the JaCoCo report and other artifacts for inspection
                archiveArtifacts artifacts: 'target/site/jacoco */
/*', allowEmptyArchive: true
            }
            }
}
 */
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning the code'
                checkout scm
            }
        }
        stage('Verify Backend Directory') {
            steps {
                dir('backend') {
                    echo 'Checking backend directory contents...'
                    sh 'ls -la'
                }
            }
        }


        // Backend build stages
        stage('Backend - Maven Compile') {
            steps {
                dir('backend') {
                    echo 'Compiling the backend code'
                    sh 'mvn clean compile'
                }
            }
        }

        stage('Backend - Tests') {
            steps {
                dir('backend') {
                    echo 'Running backend tests'
                    sh 'mvn test'
                }
            }
        }

        stage('Backend - Code Coverage with Jacoco') {
            steps {
                dir('backend') {
                    echo 'Running Jacoco for backend code coverage'
                    sh 'mvn jacoco:report'
                }
            }
        }

        stage('Backend - SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarScanner'  // SonarScanner tool configured in Jenkins
            }
            steps {
                dir('backend') {
                    withSonarQubeEnv('SonarQubeServer') { // SonarQube server configured in Jenkins
                        withCredentials([string(credentialsId: 'sonarqube-credential', variable: 'SONAR_TOKEN')]) {
                            sh """
                                ${scannerHome}/bin/sonar-scanner \
                                -Dsonar.projectKey=5ARCTIC4-G4-pi-backend \
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

        stage('Backend - Maven Deploy') {
            steps {
                dir('backend') {
                    echo 'Deploying the backend artifact to Nexus'
                    sh 'mvn deploy -DskipTests'
                }
            }
        }

        // Frontend build stages
        stage('Frontend - Install Dependencies') {
            steps {
                dir('frontend') {
                    echo 'Installing frontend dependencies'
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    echo 'Building the frontend'
                    sh 'npm run build --prod'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'backend/target/site/jacoco/*', allowEmptyArchive: true
        }
    }
}
