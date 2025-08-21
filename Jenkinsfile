// Jenkinsfile
pipeline {
    // 1. Define the Build Environment
    // 'agent any' means Jenkins can use any available machine to run this pipeline.
    agent any

    // Use the NodeJS tool that we configured in the Jenkins settings.
    // The name 'NodeJS-20' must match what you configured in Manage Jenkins > Tools.
    tools {
        nodejs 'NodeJS-20'
    }

    // 2. Define the Stages of the Pipeline
    // This is where we define the steps, similar to your GitHub Actions jobs.
    stages {
        // Stage 1: Checkout Code from GitHub
        stage('Checkout') {
            steps {
                echo 'Checking out the code...'
                // 'scm' is a special variable that contains the Git repository info
                // configured in the Jenkins job.
                checkout scm
            }
        }

        // Stage 2: Install Project Dependencies
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                // 'sh' executes a shell command.
                // This uses the Node.js version we defined in the 'tools' section.
                sh 'npm install'
            }
        }

        // Stage 3: Run Tests
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
    }

    // 3. Post-Build Actions (Optional)
    // Define actions that run at the end of the pipeline, regardless of outcome.
    post {
        // This block runs after all stages are complete
        always {
            // This runs regardless of the build's outcome
            slackSend channel: '#build-notifications', 
                      message: "Build finished for `${env.JOB_NAME}` #${env.BUILD_NUMBER}. Status: ${currentBuild.currentResult}. Details: ${env.BUILD_URL}"
        }
        success {
            // This only runs if the build is successful
            slackSend channel: '#build-notifications', 
                      color: 'good', // 'good' is green
                      message: "SUCCESS: `${env.JOB_NAME}` build #${env.BUILD_NUMBER} completed successfully. Details: ${env.BUILD_URL}"
        }
        failure {
            // This only runs if the build fails
            slackSend channel: '#build-notifications', 
                      color: 'danger', // 'danger' is red
                      message: "FAILURE: `${env.JOB_NAME}` build #${env.BUILD_NUMBER} failed. Please check the logs: ${env.BUILD_URL}"
        }
        unstable {
            // This only runs if the build is unstable (e.g., tests failed but build didn't)
             slackSend channel: '#build-notifications', 
                      color: 'warning', // 'warning' is yellow
                      message: "UNSTABLE: `${env.JOB_NAME}` build #${env.BUILD_NUMBER} is unstable. Details: ${env.BUILD_URL}"
        }
    }
}
