pipeline {
    agent any

    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    environment {
        // Set SonarQube environment and Nexus URL if needed
        SONAR_HOST_URL = 'http://192.168.33.10:9000'
        DOCKER_HUB_REPO = 'mayssa858' 
    }

    stages {
        // ------------------- Backend Stages -------------------
        stage('Backend - Clean') {
            steps {
                dir('back') {
                    // Clean the backend project
                    sh 'mvn clean'
                }
            }
        }

        stage('Backend - Compile') {
            steps {
                dir('back') {
                    // Compile the backend project
                    sh 'mvn compile'
                }
            }
        }

        stage('Backend - Run Tests') {
            steps {
                dir('back') {
                    // Run tests for the backend
                    sh 'mvn test'
                }
            }
        }

        stage('Backend - Build') {
            steps {
                dir('back') {
                    // Package the backend application
                    sh 'mvn package'
                }
            }
        }

        stage('Backend - SonarQube Analysis') {
            steps {
                dir('backend') {
                    // Run SonarQube analysis for code quality
                    withSonarQubeEnv('sq1') {
                        sh "mvn sonar:sonar -Dsonar.host.url=${SONAR_HOST_URL}"
                    }
                }
            }
        }

        stage('Backend - Deploy to Nexus') {
            steps {
                dir('back') {
                    // Deploy the backend application to Nexus
                    sh 'mvn deploy -DskipTests'
                }
            }
        }

        // ------------------- Frontend Stages -------------------
        stage('Frontend - Install Dependencies') {
            steps {
                dir('front') {
                    // Install frontend dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('front') {
                    // Build the frontend application
                    sh 'npm run build'  // Adjust if your frontend build script is named differently
                }
            }
        }

        stage('Build Docker Image') {
    steps {
        echo 'Building Docker images'
        sh "docker build -t ${DOCKER_HUB_REPO}/back:latest -f back/Dockerfile ./back"
        sh "docker build -t ${DOCKER_HUB_REPO}/front:latest -f front/Dockerfile ./front"
    }
}

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-jenkins', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh 'docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}'
                    sh "docker push ${DOCKER_HUB_REPO}/back:latest"
                    sh "docker push ${DOCKER_HUB_REPO}/front:latest"
                }
            }
        }

        stage('docker_compose') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker compose up --build -d'
            }
        }
    }

    post {
        always {
            // Clean up workspace after pipeline execution
            cleanWs()
        }
    }
}
