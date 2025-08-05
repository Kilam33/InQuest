# PowerShell script to remove lines containing "Fingerprint"
# from lucide-react files to avoid ad blocker issues

$files = @(
  "node_modules/lucide-react/dist/esm/lucide-react.js",
  "node_modules/lucide-react/dist/esm/icons/index.js"
)

foreach ($file in $files) {
  if (Test-Path $file) {
    $tempFile = "$file.tmp"
    Get-Content $file | Where-Object { $_ -notmatch "Fingerprint" } | Set-Content $tempFile
    Move-Item -Force $tempFile $file
    Write-Host "Removed Fingerprint lines from $file"
  } else {
    Write-Host "File $file not found"
  }
}
