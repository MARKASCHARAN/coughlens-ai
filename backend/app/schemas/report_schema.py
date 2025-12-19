from pydantic import BaseModel

class ReportSchema(BaseModel):
    report_id: str
    ipfs_url: str
