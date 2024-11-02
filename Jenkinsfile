/*
pipeline {
    agent any
    tools {
            jdk 'JAVA_HOME'
            maven 'M2_HOME'
        }
    stages {
        stage('Clone Repository') {
            steps {
                // Clone your GitHub repository
                git branch: 'MayssaBenTaghaline-5Arctic4-G4', url: 'https://github.com/yasminejerbi/5ARCTIC4-G4-pi.git', credentialsId: 'github-jenkins'
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
                sh 'ls -l target */
/*.jar'
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
} */
pipeline {
    agent any

    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    stages {
        stage('Clean') {
            steps {
                // Clean the project
                sh 'mvn clean'
            }
        }

        stage('Compile') {
            steps {
                // Compile the project
                sh 'mvn compile'
            }
        }

        stage('Build') {
            steps {
                // Build the project (e.g., package or install)
                sh 'mvn package'  // or 'mvn install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests with Maven
                sh 'mvn test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Use the SonarQube scanner directly
                withSonarQubeEnv('sonarQube1') {
                    sh 'mvn sonar:sonar -Dsonar.host.url=http://192.168.33.10:9000/'
                }
            }
        }
    }
}