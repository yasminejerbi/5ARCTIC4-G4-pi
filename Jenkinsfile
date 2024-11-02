pipeline {
    agent any

     tools {
                jdk 'JAVA_HOME'
                maven 'M2_HOME'
            }

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'

                junit '**/target/surefire-reports/TEST-*.xml'
            }
        }
    }
}
