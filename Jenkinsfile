pipeline {
    agent any

    stages {

        stage('Replace URL with Local IP') {
            steps {
                script {
                    def ip = powershell(script: '''
                    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.*" }).IPAddress[0]
                    return $ip
                    ''', returnStdout: true).trim()
                    echo "IP Address: ${ip}"

                    def envPath = "C:\\Users\\Desktop\\Desktop\\GIT\\tcc-backoffice-frontend\\src\\environments\\environment.prod.ts"

                    bat "powershell -Command \"(Get-Content -path '${envPath}' -Raw) -replace 'URL_PLACEHOLDER','${ip}' | Set-Content -Path '${envPath}'\""
                }
            }
        }

       stage('Install Dependencies') {
            steps {
                script {
                   bat '"D:\\Node JS\\npm" install'
                }
            }
        }

        stage('Serve') {
            steps {
               bat 'C:\\Users\\Desktop\\AppData\\Roaming\\npm\\ng serve --host 0.0.0.0'
            }
        }
    }
}
