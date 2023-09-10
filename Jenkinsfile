pipeline {
    agent any

    stages {

        stage('Replace URL with Local IP') {
            steps {
                script {
                    def ip = powershell(script: '''
                    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.*" }).IPAddress
                    return $ip
                    ''', returnStdout: true).trim()
                    echo "IP Address: ${ip}"
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