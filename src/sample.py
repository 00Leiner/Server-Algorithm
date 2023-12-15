import httpx

url = 'https://example.com/api/resource'

# Replace this with the data you want to send in the PUT request
data_to_send = {
    'option1': [
        {
            'program': 'BSCS',
            'year': '3',
            'semester': '2',
            'block': 'B',
            'sched': [
                {
                    'courseCode': 'course1',
                    'courseDescription': 'course number 1',
                    'courseUnit': '3',
                    'day': 'monday',
                    'time': '7am-8am',
                    'room': 'room1',
                    'instructor': 'teacher1',
                },
                {
                    'courseCode': 'course2',
                    'courseDescription': 'course number 2',
                    'courseUnit': '2',
                    'day': 'tuesday',
                    'time': '7am-8am',
                    'room': 'room2',
                    'instructor': 'teacher2',
                }
            ]
        }
    ]
}

# Send a PUT request with the specified data
with httpx.Client() as client:
    response = client.put(url, json=data_to_send)

# Check if the request was successful (status code 2xx)
if response.status_code // 100 == 2:
    print(f"PUT request successful. Response: {response.json()}")
else:
    print(f"Failed to send PUT request. Status code: {response.status_code}, Response: {response.text}")
