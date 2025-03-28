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
        sh '''
            echo "🚀 Deploying app to ~/ci-deploy"
            pm2 delete my-app || true
            rm -rf ~/ci-deploy/*
            cp -r * ~/ci-deploy/
            cd ~/ci-deploy/
            npm install
            pm2 start index.js --name my-app
            '''
        }
    }
  }
}
