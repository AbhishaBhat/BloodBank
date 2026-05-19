pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "abhibhat23/bloodbank"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {

                withSonarQubeEnv('SonarCloud') {

                    withCredentials([string(
                        credentialsId: 'sonar-token',
                        variable: 'SONAR_TOKEN'
                    )]) {

                        bat '''
                        sonar-scanner ^
                        -Dsonar.projectKey=AbhishaBhat_BloodBank ^
                        -Dsonar.organization=abhishabhat ^
                        -Dsonar.host.url=https://sonarcloud.io ^
                        -Dsonar.token=%SONAR_TOKEN%
                        '''
                    }
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP-DC'

                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

       stage('Push Docker Image') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {

            bat '''
            docker login -u %DOCKER_USER% --password-stdin <<< %DOCKER_PASS%
            docker push %DOCKER_IMAGE%
            '''
        }
    }
}


        stage('Deploy') {
            steps {
                echo 'Deployment handled using Render/Vercel'
            }
        }
    }
}