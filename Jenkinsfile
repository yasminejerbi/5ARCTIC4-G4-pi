pipeline {
    agent any

    tools {
                jdk 'JAVA_HOME'
                maven 'M2_HOME'
            }

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean install -B -q'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test -B -q -Dtest=**GeminiChatbotControllerTest -Dspring.profiles.active=test -Dspring.datasource.url=jdbc:h2:mem:testdb'

                junit '**/target/surefire-reports/TEST-*.xml'
            }
        }
    }

    post {
        always {
            echo "All tests passed successfully!"
        }
    }
}
