pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "abhibhat123/bloodbank"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/AbhishaBhat/BloodBank.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {

                    withCredentials([string(
                        credentialsId: 'sonar-token',
                        variable: 'SONAR_TOKEN'
                    )]) {

                        sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=AbhishaBhat_BloodBank \
                        -Dsonar.organization=AbhishaBhat \
                        -Dsonar.host.url=https://sonarcloud.io \
                        -Dsonar.token=$SONAR_TOKEN
                        '''
                    }
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan .',
                odcInstallation: 'OWASP-DC'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push Docker Image') {
            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                    sh 'docker push $DOCKER_IMAGE'
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
