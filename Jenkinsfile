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
        sh 'echo "Deploy step (simulasi)"'
      }
    }
  }
}
