# Encryption Buddy
# 🔐 Encryption Algorithm Identifier using Machine Learning

> A scalable AI/ML-powered system to automatically identify encryption algorithms from ciphertext, using character frequency, entropy, and statistical patterns.

## 🚀 Overview

**Encryption Algorithm Identifier** is a machine learning-based framework designed to classify cryptographic algorithms solely based on ciphertext analysis. Traditional approaches rely on manual inspection or rule-based techniques, which are often non-scalable and limited. This system brings automation, precision, and scalability to the process of cryptographic algorithm detection using **character frequency and statistical features**.

### 🔎 Why This Project?

- Most encryption algorithm detection methods require key/context or rely on fixed rules.
- Real-world encrypted data can be intercepted without any metadata — requiring intelligent classification.
- This system leverages **AI/ML** to classify encrypted data based only on ciphertext patterns.

---

## 🧠 Core Hypothesis

> Character frequency patterns in ciphertext carry unique statistical signatures that can be learned by machine learning models to classify the encryption algorithm used.

---

## 🧩 Features

- ⚙️ **Automatic Detection**: Identify encryption algorithms from ciphertext without requiring decryption.
- 📊 **Character Frequency-Based Feature Extraction**: Frequency patterns, entropy metrics, and text length used as core features.
- 🧪 **Model Comparison**: Evaluated multiple ML models: SVM, Naive Bayes, Decision Tree, Random Forest.
- 🎯 **High Accuracy**: Achieved up to **85% accuracy** with Random Forest classifier.
- 📈 **Cross-Validated**: Evaluated using 10-fold cross-validation for robustness.

---

## 🔐 Encryption Algorithms Supported

The model was trained and tested on ciphertexts generated using:

- **AES (Advanced Encryption Standard)**
- **ChaCha20**
- **Blowfish**
- **RSA**
- **DES**

Each ciphertext was generated using diverse real-world texts (Wikipedia, blogs, news articles) with lengths ranging from 1 to 50 words.

---

## 🛠️ ML Models Used

We experimented with the following supervised learning models:

| Model            | Performance Summary                            |
|------------------|------------------------------------------------|
| ✅ **Random Forest** | Best performance (85% accuracy), robust to noise and overlapping patterns |
| SVM              | Good, but struggled with overlapping feature spaces |
| Decision Tree    | Decent, interpretable but slightly overfitted |
| Naive Bayes      | Underperformed due to independence assumption |

---

## 📁 Dataset Overview

- 📦 **10,000 encrypted samples**
- 🔠 Varied text lengths (1–50 words)
- 📌 Features:
  - Character frequency vectors (a–z, A–Z, digits, special symbols)
  - Entropy scores
  - Ciphertext length

All samples are labeled with the encryption algorithm used, creating a rich, realistic supervised dataset.

---

## 🧪 Workflow Pipeline

```text
Text Input → Encryption (AES / RSA / etc.) → Feature Extraction → ML Model → Prediction
