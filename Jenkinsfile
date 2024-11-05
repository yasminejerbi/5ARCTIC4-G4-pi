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
                                -Dsonar.java.binaries=target/classes
                            """
                        }
                    }
                }
            }
        }

        stage('Backend - Maven Deploy') {
            steps {
                dir('Backend') {
                    echo 'Deploying the Backend artifact to Nexus'
                    sh 'mvn deploy -DskipTests'
                }
            }
        }

        // Frontend build stages
        stage('Frontend - Install Dependencies') {
            steps {
                dir('Frontend') {
                    echo 'Installing Frontend dependencies'
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('Frontend') {
                    echo 'Building the Frontend'
                    sh 'npm run build --prod'
                }
            }
        }
    }
            stage('Build Docker Image') {
                steps {
                    echo 'Building Docker images'
                    sh 'docker build -t back:latest -f Backend/Dockerfile Backend/'
                    sh 'docker build --progress=plain -t front:latest -f Frontend/Dockerfile Frontend/'
                }
            }
            stage('DOCKER HUB') {
                steps {
                    withCredentials([usernamePassword(credentialsId: 'docker_token', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                        sh "docker tag back:latest ${DOCKER_HUB_REPO}/Backend:latest"
                        sh "docker tag front:latest ${DOCKER_HUB_REPO}/Frontend:latest"
                        sh "docker push ${DOCKER_HUB_REPO}/back:latest"
                        sh "docker push ${DOCKER_HUB_REPO}/front:latest"
                    }
                }
            }

            stage('Run Docker-Compose') {
                steps {
                    echo 'Starting Docker Compose'
                    sh 'docker-compose down || true'
                    sh 'docker-compose pull'
                    sh 'docker-compose up -d'
                }
            }

    post {
        always {
            archiveArtifacts artifacts: 'Backend/target/site/jacoco/*', allowEmptyArchive: true
        }
    }
}
