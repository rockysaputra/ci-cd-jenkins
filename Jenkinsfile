pipeline {
  agent any

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
        sh 'npm test'
      }
    }

    stage('Build') {
      steps {
        sh 'echo "Build step done."'
      }
    }

    stage('Deploy') {
        steps {
            sshagent(['deploy-ssh-key']) {
                withCredentials([string(credentialsId: 'deploy-host-ip', variable: 'DEPLOY_HOST')]) {
                    sh '''
                    ssh rocky@$DEPLOY_HOST 'pm2 delete my-app || true && rm -rf ~/ci-deploy/*'
                    scp -r * rocky@$DEPLOY_HOST:~/ci-deploy/
                    ssh rocky@$DEPLOY_HOST 'cd ~/ci-deploy && npm install && pm2 start index.js --name my-app'
                    '''
                }
            }
        }
    }
  }
}
