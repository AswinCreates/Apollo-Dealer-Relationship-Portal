try {
    $body = '{"email":"aswinrout94281@gmail.com","role":"ADMIN","password":"aswin@8511"}'
    $resp = Invoke-WebRequest -Uri 'http://localhost:8080/api/auth/login' -Method POST -ContentType 'application/json' -Body $body -ErrorAction Stop
    Write-Host "STATUS: $($resp.StatusCode)"
    Write-Host "BODY: $($resp.Content)"
} catch {
    Write-Host "STATUS: $($_.Exception.Response.StatusCode.value__)"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "BODY: $($reader.ReadToEnd())"
}