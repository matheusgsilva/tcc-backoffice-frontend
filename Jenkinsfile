pipeline {
    agent any

    stages {

        stage('Replace URL with Local IP') {
            steps {
                script {
                    def ip = bat(script: 'for /f "tokens=2 delims=:" %a in (\'ipconfig ^| find "IPv4 Address"\') do echo %a', returnStdout: true).trim()
                    ip = ip.substring(1)
                    def envPath = "C:\\Users\\Desktop\\Desktop\\GIT\\tcc-backoffice-frontend\\src\\environments\\environment.prod.ts"
                    bat "powershell -Command \"(Get-Content -path '${envPath}' -Raw) -replace 'URL_PLACEHOLDER','${ip}' | Set-Content -Path '${envPath}'\""
                }
            }
        }

        stage('Serve') {
            steps {
                bat 'ng serve --host 0.0.0.0'
            }
        }
    }
}
