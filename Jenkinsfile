pipeline {
  agent any

  environment {
    APP_NAME = "my-app"
    DOCKER_IMAGE = "rockys009/myapp:latest"
  }

  tools {
    nodejs "nodejs"
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test || true'
      }
    }

    stage('Build Docker Image & Push to DockerHub') {
      steps {
        withCredentials([
          usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
        ]) {
          sh '''
            docker build -t $DOCKER_IMAGE .
            echo $DOCKER_PASS | $DOCKER_USER --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }

    stage('Deploy via Docker SSH') {
      when{
        branch 'main'
      }
      steps {
        sshagent(['deploy-ssh-key']) {
          withCredentials([string(credentialsId: 'deploy-host-ip', variable: 'DEPLOY_HOST')]) {
            sh """
                ssh rocky@$DEPLOY_HOST \"
                    docker pull $DOCKER_IMAGE &&
                    docker stop $APP_NAME || true &&
                    docker rm $APP_NAME || true &&
                    docker run -d --name $APP_NAME -p 3000:3000 $DOCKER_IMAGE
                \"
            """
          }
        }
      }
    }
  }
}
