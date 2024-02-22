import subprocess

programPath = 'travelRequest.py'
countryCode = 'EG'
endPath = '/Users/joseph/Downloads/testing.txt'
subprocess.run(['python3', programPath, countryCode, endPath])