pipeline {
    agent any

    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    stages {
        /*
        stage('Clean') {
            steps {
                // Clean the project
                // Not needed if we're only testing Nexus connectivity
                sh 'mvn clean'
            }
        }

        stage('Compile') {
            steps {
                // Compile the project
                // Not needed if we're only testing Nexus connectivity
                sh 'mvn compile'
            }
        }

        // stage('Build') {
        //     steps {
        //         // Build the project (e.g., package or install)
        //         // Not needed if we're only testing Nexus connectivity
        //         sh 'mvn package'  // or 'mvn install'
        //     }
        // }

        stage('Run Tests') {
            steps {
                // Run tests with Maven
                // Not needed if we're only testing Nexus connectivity
                sh 'mvn test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Use the SonarQube scanner directly
                // Not needed if we're only testing Nexus connectivity
                withSonarQubeEnv('sonarQube1') {
                    sh 'mvn sonar:sonar -Dsonar.host.url=http://192.168.224.130:9000'
                }
            }
        }
        */

        stage('Deploy to Nexus') {
            steps {
                // This is the only stage needed to test Nexus connectivity
                sh 'mvn deploy -DskipTests'
            }
        }
    }
}
