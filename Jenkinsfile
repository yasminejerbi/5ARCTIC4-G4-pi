pipeline {
    agent none

    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    environment {
        SONAR_HOST_URL = 'http://192.168.224.130:9000'
        DOCKER_HUB_REPO = 'anashammou37'
    }

    stages {
        // ------------------- Backend Stages -------------------
        /*stage('Backend - Clean') {
            agent { label 'slave_ubuntu_build' }
            steps {
                dir('backend') {
                    sh 'mvn clean'
                }
            }
        }*/

        stage('Backend - Compile') {
            agent { label 'master' }
            steps {
                dir('backend') {
                    sh 'mvn clean compile'
                }
            }
        }

        stage('Backend - Run Tests') {
            agent { label 'master' }
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Backend - Build') {
            agent { label 'master' }
            steps {
                dir('backend') {
                    sh 'mvn package'
                }
            }
        }

        stage('Backend - SonarQube Analysis') {
            agent { label 'master' }
            steps {
                dir('backend') {
                    withSonarQubeEnv('sonarQube1') {
                        sh "mvn sonar:sonar -Dsonar.host.url=${SONAR_HOST_URL}"
                    }
                }
            }
        }

        stage('Backend - Deploy to Nexus') {
            agent { label 'master' }
            steps {
                dir('backend') {
                    sh 'mvn deploy -DskipTests'
                }
            }
        }

        // ------------------- Frontend Stages -------------------
        stage('Frontend - Install Dependencies') {
            agent { label 'master' }
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend - Build') {
            agent { label 'master' }
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            agent { label 'master' }
            steps {
                echo 'Building Docker images'
                sh "docker build -t ${DOCKER_HUB_REPO}/back:latest -f backend/Dockerfile ./backend"
                sh "docker build -t ${DOCKER_HUB_REPO}/front:latest -f frontend/Dockerfile ./frontend"
            }
        }

        stage('Push to Docker Hub') {
            agent { label 'master' }
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_token', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                    sh "docker push ${DOCKER_HUB_REPO}/back:latest"
                    sh "docker push ${DOCKER_HUB_REPO}/front:latest"
                }
            }
        }

        stage('Docker Compose') {
            agent { label 'master' }
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up --build -d'
            }
        }
    }
}
