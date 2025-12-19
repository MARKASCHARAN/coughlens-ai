from fpdf import FPDF
import uuid

class PDFService:

    @staticmethod
    def generate_report_pdf(report: dict):
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)

        pdf.cell(200, 10, "CoughLens AI Medical Report", ln=True)
        pdf.ln(5)

        pdf.cell(200, 10, f"Patient ID: {report['patient_id']}", ln=True)
        pdf.cell(200, 10, f"Prediction: {report['prediction']}", ln=True)
        pdf.cell(200, 10, f"Confidence: {report['confidence'] * 100:.2f}%", ln=True)

        path = f"/tmp/{uuid.uuid4()}.pdf"
        pdf.output(path)

        return path
