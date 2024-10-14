pipeline{
    agent any
    stages{
        stage('checkout'){
         steps{
           echo 'cloning the code'
                checkout scm
        }
       }
       stage('Maven Compile'){
        steps{
        echo 'compiling'
        sh 'mvn clean compile'
        }
       }
    }
}