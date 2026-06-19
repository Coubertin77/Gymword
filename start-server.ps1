$path = $PSScriptRoot
$port = 8080
$url = "http://127.0.0.1:$port/"

Write-Host "GymWord server: $url"
Write-Host "Press Ctrl+C to stop."

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()
Start-Process $url

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $localPath = $context.Request.Url.LocalPath
  if ($localPath -eq "/") { $localPath = "/index.html" }
  $rel = $localPath.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar)
  $filePath = Join-Path $path $rel

  if (Test-Path -LiteralPath $filePath -PathType Leaf) {
    $bytes = [IO.File]::ReadAllBytes($filePath)
    $context.Response.StatusCode = 200
    switch ([IO.Path]::GetExtension($filePath)) {
      '.html' { $context.Response.ContentType = 'text/html; charset=utf-8' }
      '.js'   { $context.Response.ContentType = 'application/javascript; charset=utf-8' }
      '.css'  { $context.Response.ContentType = 'text/css; charset=utf-8' }
      default { $context.Response.ContentType = 'application/octet-stream' }
    }
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $context.Response.StatusCode = 404
    $msg = [Text.Encoding]::UTF8.GetBytes('Not Found')
    $context.Response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $context.Response.Close()
}
