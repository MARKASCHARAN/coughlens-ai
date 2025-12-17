# 🌬️ CoughLens AI — Voice-First Respiratory Screening Platform
### *Multilingual • AI-Powered • Cough-Based Diagnosis • Built for Rural India*

![React](https://img.shields.io/badge/Frontend-React.js-blue?logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-teal?logo=fastapi)
![Python](https://img.shields.io/badge/ML%20Engine-Python-yellow?logo=python)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![IPFS](https://img.shields.io/badge/Storage-IPFS-purple?logo=ipfs)
![OpenAI](https://img.shields.io/badge/Voice_AI-OpenAI_Realtime-black?logo=openai)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

**CoughLens AI** is a multilingual, voice-driven diagnostic assistant that analyzes **cough audio** to detect:

- Asthma  
- Pneumonia  
- Healthy  

Designed for **rural healthcare**, **ASHA workers**, and **clinics**, enabling:

- Full voice navigation  
- ML-powered cough detection  
- PDF report generation  
- IPFS storage  
- WhatsApp & Email sharing  

Users simply say:

> **“Start a cough test.”**

---

## ✨ Key Features

### 🎤 1. Voice Command Center  
Hands-free interface supporting **Telugu, Hindi, English**.

You can:
- Start diagnostic tests  
- Add patient information  
- Access previous reports  
- Ask for analytics  
- Navigate dashboards  
- Send reports via WhatsApp              
  
---

### 🤖 2. AI-Powered Cough Analysis  
Audio ML pipeline includes:

- Noise reduction  
- Segmentation  
- MFCC extraction  
- Mel Spectrogram generation  
- CNN / YAMNet inference  

Outputs:
- Disease prediction  
- Confidence score  
- Acoustic biomarkers  
- Voice explanation  

---

### 🗂 3. IPFS-Based Medical Reports  
All medical PDFs are:

- Tamper-proof  
- Permanent  
- Shareable  
- Stored using IPFS CIDs  

---

### 🏥 4. Role-Based Dashboards

| User | Features |
|------|----------|
| **Individual User** | Run tests, view history |
| **ASHA Worker** | Add patients, run tests via voice |
| **Clinician / Hospital** | Case trends, analytics, patient reports |

---

## 🧠 Tech Stack

### **Frontend**
- React.js  
- Vite  
- Tailwind CSS  
- Web Audio API  

### **Backend**
- FastAPI  
- MongoDB Atlas  
- JWT Authentication  

### **AI / Machine Learning**
- Python  
- librosa  
- MFCC + Mel Spectrogram  
- CNN / YAMNet  

### **Voice AI**
- OpenAI Realtime Voice API  
- Whisper STT  
- Multilingual TTS  

### **Storage**
- IPFS (Web3.Storage / Pinata)  

---

## 👨‍💻 Team

| Name | Role |
|------|------|
| **Marka Sai Charan** | Full Stack Developer / AI Integration |
| **Maitry Patel** | Machine Learning and Cloud |
| **Tanmaya Bhanja** | Frontend and Project Management, App Dev |
| **Nidhi Thakore** | DevOps and Cloud |


---

##  🔮 Future Enhancements

Phone-call based diagnosis (IVR)

Offline-first mobile app

Multi-disease respiratory classifier

---

## 🛡️ License

MIT License © 2025 CoughLens AI Team

---

## 🏗️ Architecture (Mermaid Diagram)

```mermaid
flowchart TD
    A["User<br/>(Voice / Web)"] --> B["Frontend UI<br/>React + Vite<br/>Voice Recorder"]
    B --> C["OpenAI Realtime API<br/>STT • TTS • Intent Engine"]
    C --> D["Backend<br/>FastAPI<br/>Auth • ML Orchestration • Reports"]
    D --> E["MongoDB Atlas<br/>Users • Patients • Reports"]
    D --> F["ML Engine<br/>MFCC • MelSpectrogram • CNN / YAMNet"]
    F --> G["IPFS Storage<br/>Decentralized PDF Reports"]


