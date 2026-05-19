[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
$headers = @{
    'Host' = 'api.github.com'
    'Accept' = 'application/vnd.github+json'
    'User-Agent' = 'curl'
}
try {
    $response = Invoke-RestMethod -Uri 'https://140.82.114.4/user' -Headers $headers -TimeoutSec 15
    Write-Output "SUCCESS: $($response.login)"
    # Now try to create the repo
    Write-Output "API connection works!"
} catch {
    Write-Output "Error: $_"
}
