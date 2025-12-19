import requests
import os

PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"

class IPFSService:

    @staticmethod
    def upload_file(file_path: str):
        headers = {
            "pinata_api_key": os.getenv("PINATA_API_KEY"),
            "pinata_secret_api_key": os.getenv("PINATA_SECRET_API_KEY")
        }

        with open(file_path, "rb") as f:
            response = requests.post(
                PINATA_URL,
                files={"file": f},
                headers=headers
            )

        response.raise_for_status()
        return response.json()["IpfsHash"]
