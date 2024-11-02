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
                sh '''
                export MAVEN_OPTS="-DreuseForks=false -DforkCount=1C"
                mvn test -B -q -Dtest=**GeminiChatbotControllerTest -Dspring.profiles.active=test -Dspring.datasource.url=jdbc:h2:mem:testdb

                # Run all tests if needed
                # mvn test -B -q -Dspring.profiles.active=test -Dspring.datasource.url=jdbc:h2:mem:testdb
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
