pipeline {
    agent any

    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    stages {
        stage('Clean') {
            steps {
                // Clean the project to ensure a fresh build
                sh 'mvn clean'
            }
        }

        stage('Compile') {
            steps {
                // Compile the project to check for any compilation errors
                sh 'mvn compile'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests to ensure the application works as expected
                sh 'mvn test'
            }
        }

        stage('Build') {
            steps {
                // Build the project (package the application)
                sh 'mvn package'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Use the SonarQube scanner for code quality analysis
                withSonarQubeEnv('sonarQube1') {
                    sh 'mvn sonar:sonar -Dsonar.host.url=http://192.168.224.130:9000'
                }
            }
        }

        stage('Deploy to Nexus') {
            steps {
                // Deploy the packaged application to the Nexus repository
                sh 'mvn deploy -DskipTests'
            }
        }
    }
}
