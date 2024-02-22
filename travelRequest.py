import requests
import json
import sys

def travelCodeRequest(countryCode: str, path: str = 'request_response.txt') -> int:
    """
    This function takes a two-letter country code and returns the status code. Along with that, it 
    writes the response to a .txt file in JSON format. The default path writes a file to whatever directory
    this program file is in with the file name request_response.txt. Path can be changed to 
    whatever suits the user best.
    
    Params
    countryCode: two-letter string
    path: default 'request_response.txt', can be changed

    Returns
    Status code of the request.
    """

    #request the travel advisory API 
    url = f'https://www.travel-advisory.info/api?countrycode={countryCode}'
    response = requests.get(url)

    #check response and return text file if it worked
    if response.status_code == 200:
        data = json.loads(response.text)["data"][countryCode]["advisory"]
        return_json = {"status_code": response.status_code, 
                       "advisory_score": data["score"],
                        "message": data["message"],
                         "last_updated": data['updated'] }
        with open(path, 'w') as file:
            file.write(json.dumps(return_json))
        return response.status_code
    
    #if the response failed. Write error code to .txt file
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        with open(path, 'w') as file:
            error = { "status_code" : response.status_code}
            file.write(json.dumps(error))
        return response.status_code

#Driver code
if __name__ == "__main__":
    try:
        travelCodeRequest(sys.argv[1], sys.argv[2])
    except:
        travelCodeRequest(sys.argv[1])
