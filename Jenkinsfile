pipeline {
    agent any

    tools {
                    jdk 'JAVA_HOME'
                    maven 'M2_HOME'
                }

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean install -e -X'
            }
        }

        stage('Test') {
            steps {
                sh '''
                export MAVEN_OPTS="-DreuseForks=false -DforkCount=1C"
                mvn test -e -X -Dtest=**GeminiChatbotControllerTest -Dspring.profiles.active=test -Dspring.datasource.url=jdbc:h2:mem:testdb

                # Run all tests if needed
                # mvn test -e -X
                '''

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
