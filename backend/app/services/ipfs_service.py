from dotenv import load_dotenv
load_dotenv()

import os
import requests

PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"


class IPFSService:

    @staticmethod
    def upload_file(file_path: str) -> str | None:
        """
        Best-effort IPFS upload.
        Returns CID if successful, otherwise None.
        NEVER raises exception.
        """

        api_key = os.getenv("PINATA_API_KEY")
        secret_key = os.getenv("PINATA_SECRET_API_KEY")

        # 🔒 IPFS OFF MODE (CURRENT)
        if not api_key or not secret_key:
            print("⚠️ IPFS skipped: Pinata keys missing")
            return None

        try:
            headers = {
                "pinata_api_key": api_key,
                "pinata_secret_api_key": secret_key
            }

            with open(file_path, "rb") as f:
                response = requests.post(
                    PINATA_URL,
                    headers=headers,
                    files={"file": f},
                    timeout=30
                )

            if response.status_code != 200:
                print("⚠️ IPFS upload failed:", response.text)
                return None

            return response.json().get("IpfsHash")

        except Exception as e:
            print("⚠️ IPFS exception:", str(e))
            return None
